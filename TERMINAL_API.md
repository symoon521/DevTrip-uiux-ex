# 터미널 백엔드 서버 연동 가이드

이 문서는 프론트엔드 터미널 컴포넌트를 실제 백엔드 서버와 연동하기 위한 가이드입니다.

## 백엔드 API 엔드포인트

### 명령어 실행 API

**엔드포인트**: `POST /api/terminal/execute`

**요청:**
```typescript
{
  "command": "docker ps",
  "sessionId": "user-session-123", // 사용자 세션 식별
  "missionId": "docker-basics-001"  // 현재 미션 ID (선택사항)
}
```

**응답:**
```typescript
{
  "success": true,
  "output": "CONTAINER ID   IMAGE          COMMAND...\na1b2c3d4e5f6   nginx:latest   \"nginx\"...",
  "exitCode": 0,
  "executionTime": 1250, // ms
  "timestamp": "2024-01-15T10:30:45.123Z"
}
```

**에러 응답:**
```typescript
{
  "success": false,
  "error": "Command not allowed",
  "errorCode": "FORBIDDEN_COMMAND",
  "message": "The command 'rm -rf /' is not allowed in this environment"
}
```

## 백엔드 구현 예시 (Node.js + Express)

### 1. 기본 서버 설정

```javascript
const express = require('express')
const { spawn } = require('child_process')
const app = express()

app.use(express.json())

// 허용된 명령어 목록 (보안)
const ALLOWED_COMMANDS = [
  'docker', 'kubectl', 'terraform', 'helm',
  'ls', 'pwd', 'cat', 'grep', 'find',
  'ps', 'top', 'df', 'free'
]

const FORBIDDEN_PATTERNS = [
  /rm\s+-rf/,
  /sudo/,
  /passwd/,
  /shutdown/,
  /reboot/
]

app.post('/api/terminal/execute', async (req, res) => {
  try {
    const { command, sessionId, missionId } = req.body
    
    // 보안 검증
    if (!isCommandAllowed(command)) {
      return res.status(403).json({
        success: false,
        error: "Command not allowed",
        errorCode: "FORBIDDEN_COMMAND"
      })
    }
    
    // 명령어 실행
    const result = await executeCommand(command, sessionId)
    
    res.json({
      success: true,
      output: result.output,
      exitCode: result.exitCode,
      executionTime: result.executionTime,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      errorCode: "EXECUTION_ERROR"
    })
  }
})

function isCommandAllowed(command) {
  const baseCommand = command.split(' ')[0]
  
  // 금지된 패턴 확인
  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(command)) {
      return false
    }
  }
  
  // 허용된 명령어인지 확인
  return ALLOWED_COMMANDS.includes(baseCommand)
}

function executeCommand(command, sessionId) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()
    const child = spawn('bash', ['-c', command], {
      cwd: `/tmp/sessions/${sessionId}`, // 사용자별 격리된 작업 디렉토리
      timeout: 30000, // 30초 타임아웃
      env: {
        ...process.env,
        PATH: '/usr/local/bin:/usr/bin:/bin' // 제한된 PATH
      }
    })
    
    let output = ''
    let error = ''
    
    child.stdout.on('data', (data) => {
      output += data.toString()
    })
    
    child.stderr.on('data', (data) => {
      error += data.toString()
    })
    
    child.on('close', (exitCode) => {
      const executionTime = Date.now() - startTime
      
      resolve({
        output: output + (error ? `\nSTDERR: ${error}` : ''),
        exitCode,
        executionTime
      })
    })
    
    child.on('error', (err) => {
      reject(new Error(`Command execution failed: ${err.message}`))
    })
  })
}

app.listen(3001, () => {
  console.log('Terminal server running on port 3001')
})
```

### 2. Docker 컨테이너 환경 설정

```dockerfile
# Dockerfile
FROM node:18-alpine

# 필요한 도구들 설치
RUN apk add --no-cache \
    bash \
    docker-cli \
    kubectl \
    terraform \
    helm \
    curl \
    git

# 사용자별 세션 디렉토리
RUN mkdir -p /tmp/sessions

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001
CMD ["node", "server.js"]
```

### 3. 보안 고려사항

```javascript
// 추가 보안 미들웨어
const rateLimit = require('express-rate-limit')

// 사용자별 요청 제한
const terminalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1분
  max: 30, // 분당 30개 명령어
  keyGenerator: (req) => req.body.sessionId || req.ip,
  message: {
    success: false,
    error: "Too many commands executed",
    errorCode: "RATE_LIMIT_EXCEEDED"
  }
})

app.use('/api/terminal/execute', terminalLimiter)

// 명령어 로깅
const fs = require('fs')

function logCommand(sessionId, command, result) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    sessionId,
    command,
    exitCode: result.exitCode,
    executionTime: result.executionTime
  }
  
  fs.appendFileSync(
    `/var/log/terminal/${sessionId}.log`,
    JSON.stringify(logEntry) + '\n'
  )
}
```

## 프론트엔드 연동 수정

터미널 컴포넌트에서 다음과 같이 실제 API를 호출하도록 수정:

```typescript
// src/components/terminal.tsx 수정
const executeCommand = async (command: string) => {
  if (!command.trim()) {
    terminal.current?.write('$ ')
    return
  }

  try {
    terminal.current?.writeln('Executing command on server...')
    
    const response = await fetch('/api/terminal/execute', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}` // 인증 토큰
      },
      body: JSON.stringify({ 
        command,
        sessionId: getUserSessionId(),
        missionId: getCurrentMissionId()
      })
    })
    
    const result = await response.json()
    
    if (result.success) {
      // 출력을 줄 단위로 분리해서 표시
      result.output.split('\n').forEach(line => {
        terminal.current?.writeln(line)
      })
    } else {
      terminal.current?.writeln(`Error: ${result.error}`)
    }
    
  } catch (error) {
    terminal.current?.writeln(`Connection error: ${error.message}`)
  }
  
  terminal.current?.write('$ ')
}
```

## 배포 고려사항

1. **컨테이너 보안**: 사용자별 격리된 Docker 컨테이너 환경
2. **리소스 제한**: CPU, 메모리, 디스크 사용량 제한
3. **세션 관리**: 사용자별 작업 디렉토리 및 세션 타임아웃
4. **로깅 및 모니터링**: 모든 명령어 실행 로그 및 성능 모니터링
5. **백업**: 사용자 작업 내용 정기 백업

이 가이드를 따라 구현하면 실제 서버 환경에서 안전하게 터미널 명령어를 실행할 수 있는 시스템을 구축할 수 있습니다.