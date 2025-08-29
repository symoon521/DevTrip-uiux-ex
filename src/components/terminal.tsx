"use client"

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import dynamic from 'next/dynamic'

interface TerminalComponentProps {
  className?: string
  onCommandSend?: (command: string) => void
}

export interface TerminalRef {
  sendCommand: (command: string) => void
}

const TerminalComponentInner = forwardRef<TerminalRef, TerminalComponentProps>(
  function TerminalComponent({ className = '', onCommandSend }, ref) {
    const terminalRef = useRef<HTMLDivElement>(null)
    const terminal = useRef<any>(null)
    const fitAddon = useRef<any>(null)
    const [isClient, setIsClient] = useState(false)
    const sendCommandRef = useRef<(command: string) => void>(() => {})

    useEffect(() => {
      setIsClient(true)
    }, [])

    // useImperativeHandle을 useEffect 밖으로 이동
    useImperativeHandle(ref, () => ({
      sendCommand: (command: string) => sendCommandRef.current(command)
    }), [])

    useEffect(() => {
      if (!isClient || !terminalRef.current) return

      // 동적으로 xterm 라이브러리 로드
      const loadTerminal = async () => {
        const [{ Terminal }, { FitAddon }, { WebLinksAddon }] = await Promise.all([
          import('@xterm/xterm'),
          import('@xterm/addon-fit'),
          import('@xterm/addon-web-links')
        ])
        
        // CSS도 동적으로 로드
        await import('@xterm/xterm/css/xterm.css')

        // Terminal 인스턴스 생성
        terminal.current = new Terminal({
          cursorBlink: true,
          fontSize: 14,
          fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", monospace',
          theme: {
            background: '#0f172a',
            foreground: '#e2e8f0',
            cursor: '#3b82f6',
            cursorAccent: '#1e40af',
            selection: '#3b82f6',
            black: '#1e293b',
            red: '#ef4444',
            green: '#10b981',
            yellow: '#f59e0b',
            blue: '#3b82f6',
            magenta: '#a855f7',
            cyan: '#06b6d4',
            white: '#f1f5f9',
            brightBlack: '#475569',
            brightRed: '#f87171',
            brightGreen: '#34d399',
            brightYellow: '#fbbf24',
            brightBlue: '#60a5fa',
            brightMagenta: '#c084fc',
            brightCyan: '#22d3ee',
            brightWhite: '#ffffff'
          },
          allowTransparency: true,
          convertEol: true,
          scrollback: 1000,
          cols: 80,
          rows: 24
        })

        // Addons 추가
        fitAddon.current = new FitAddon()
        const webLinksAddon = new WebLinksAddon()
        
        terminal.current.loadAddon(fitAddon.current)
        terminal.current.loadAddon(webLinksAddon)

        // Terminal을 DOM에 연결
        terminal.current.open(terminalRef.current)
        
        // 초기 크기 맞춤
        fitAddon.current.fit()

        // 환영 메시지 표시
        terminal.current.writeln('\x1b[32m🚀 Welcome to DevTrip Practice Environment!\x1b[0m')
        terminal.current.writeln('\x1b[37mType "\x1b[36mhelp\x1b[37m" to see available commands.\x1b[0m')
        terminal.current.writeln('')
        terminal.current.write('\x1b[32m>>>\x1b[0m ')

        // 백엔드 서버와 통신하는 터미널
        let currentLine = ''
        let commandHistory: string[] = []
        let historyIndex = -1
        
        const handleData = (data: string) => {
          const code = data.charCodeAt(0)
          
          // Ctrl+C 처리
          if (code === 3) {
            terminal.current?.writeln('')
            terminal.current?.writeln('\x1b[31m^C\x1b[0m')
            currentLine = ''
            terminal.current?.write('\x1b[32m>>>\x1b[0m ')
            return
          }
          
          // Enter 처리
          if (code === 13) {
            if (currentLine.trim()) {
              commandHistory.push(currentLine.trim())
              historyIndex = commandHistory.length
            }
            executeCommand(currentLine.trim())
            currentLine = ''
            return
          }
          
          // Backspace 처리
          if (code === 127) {
            if (currentLine.length > 0) {
              currentLine = currentLine.slice(0, -1)
              terminal.current?.write('\b \b')
            }
            return
          }
          
          // ESC 시퀀스 (방향키 등)
          if (code === 27) {
            let sequence = data
            
            // 방향키 처리를 위한 추가 문자 수집
            terminal.current?.onData((nextData: string) => {
              sequence += nextData
              
              // 위 방향키 (이전 명령어)
              if (sequence === '\x1b[A') {
                if (commandHistory.length > 0 && historyIndex > 0) {
                  // 현재 줄 지우기
                  for (let i = 0; i < currentLine.length; i++) {
                    terminal.current?.write('\b \b')
                  }
                  historyIndex--
                  currentLine = commandHistory[historyIndex]
                  terminal.current?.write(currentLine)
                }
                return
              }
              
              // 아래 방향키 (다음 명령어)
              if (sequence === '\x1b[B') {
                // 현재 줄 지우기
                for (let i = 0; i < currentLine.length; i++) {
                  terminal.current?.write('\b \b')
                }
                
                if (historyIndex < commandHistory.length - 1) {
                  historyIndex++
                  currentLine = commandHistory[historyIndex]
                  terminal.current?.write(currentLine)
                } else {
                  historyIndex = commandHistory.length
                  currentLine = ''
                }
                return
              }
              
              // 좌/우 방향키는 무시 (단순화를 위해)
              if (sequence === '\x1b[C' || sequence === '\x1b[D') {
                return
              }
            })
            return
          }
          
          // 일반 문자 처리
          if (code >= 32) {
            currentLine += data
            terminal.current?.write(data)
          }
        }

        const executeCommand = async (command: string) => {
          if (!command.trim()) {
            terminal.current?.writeln('')
            terminal.current?.write('\x1b[32m>>>\x1b[0m ')
            return
          }

          try {
            // 새 줄로 이동
            terminal.current?.writeln('')
            
            // 부모 컴포넌트에 명령어 전달
            onCommandSend?.(command)
            
            // 시뮬레이션된 서버 응답 - 로딩 메시지는 simulateServerCommand 내부에서 처리
            await simulateServerCommand(command)
            
          } catch (error) {
            terminal.current?.writeln(`\x1b[31mError: ${error}\x1b[0m`)
          }
          
          terminal.current?.write('\x1b[32m>>>\x1b[0m ')
        }

        // 외부에서 명령어를 전송할 수 있는 함수 노출
        const sendCommand = (command: string) => {
          if (!terminal.current) return
          
          // 터미널에 명령어 표시
          terminal.current.write(command)
          // 엔터키 시뮬레이션 (새 줄 포함)
          executeCommand(command)
        }

        // ref에 함수 할당
        sendCommandRef.current = sendCommand

        terminal.current.onData(handleData)

        // 리사이즈 이벤트 처리
        const handleResize = () => {
          if (fitAddon.current) {
            fitAddon.current.fit()
          }
        }

        window.addEventListener('resize', handleResize)


        // Cleanup
        return () => {
          window.removeEventListener('resize', handleResize)
          terminal.current?.dispose()
        }
      }

      loadTerminal()
    }, [isClient])

    const simulateServerCommand = (command: string): Promise<void> => {
      return new Promise((resolve) => {
        // 로딩 메시지 표시
        terminal.current?.writeln('\x1b[90m⏳ Executing command on server...\x1b[0m')
        
        setTimeout(() => {
          // 로딩 메시지 지우기
          terminal.current?.write('\x1b[1A') // 한 줄 위로 이동
          terminal.current?.write('\x1b[2K') // 현재 줄 지우기
          
          const cmd = command.toLowerCase().trim()
          
          if (cmd.startsWith('docker')) {
            handleDockerCommand(cmd)
          } else if (cmd.startsWith('kubectl')) {
            handleKubernetesCommand(cmd)
          } else if (cmd.startsWith('terraform')) {
            handleTerraformCommand(cmd)
          } else if (cmd === 'help') {
            terminal.current?.writeln('\x1b[32mAvailable commands:\x1b[0m')
            terminal.current?.writeln('  \x1b[36mdocker <subcommand>\x1b[0m    - Docker operations')
            terminal.current?.writeln('  \x1b[36mkubectl <subcommand>\x1b[0m   - Kubernetes operations')  
            terminal.current?.writeln('  \x1b[36mterraform <subcommand>\x1b[0m - Terraform operations')
            terminal.current?.writeln('  \x1b[36mclear\x1b[0m                  - Clear terminal')
            terminal.current?.writeln('  \x1b[36mls\x1b[0m                     - List files')
            terminal.current?.writeln('  \x1b[36mpwd\x1b[0m                    - Print working directory')
          } else if (cmd === 'clear') {
            terminal.current?.clear()
          } else if (cmd === 'ls' || cmd === 'ls -la') {
            terminal.current?.writeln('\x1b[34mdocker-compose.yml\x1b[0m  \x1b[34mkubernetes/\x1b[0m  \x1b[34mterraform/\x1b[0m  \x1b[37mREADME.md\x1b[0m')
          } else if (cmd === 'pwd') {
            terminal.current?.writeln('\x1b[32m/workspace/devtrip-mission\x1b[0m')
          } else if (cmd === 'cat') {
            terminal.current?.writeln('\x1b[33mcat: missing file operand\x1b[0m')
            terminal.current?.writeln('Try \x1b[36mcat <filename>\x1b[0m')
          } else {
            terminal.current?.writeln(`\x1b[31mbash: ${command}: command not found\x1b[0m`)
          }
          resolve()
        }, Math.random() * 1000 + 500) // 500-1500ms 지연
      })
    }

    const handleDockerCommand = (cmd: string) => {
      if (cmd === 'docker ps') {
        terminal.current?.writeln('\x1b[37mCONTAINER ID   IMAGE          COMMAND       CREATED        STATUS        PORTS     NAMES\x1b[0m')
        terminal.current?.writeln('\x1b[32ma1b2c3d4e5f6\x1b[0m   \x1b[36mnginx:latest\x1b[0m   \x1b[33m"nginx"\x1b[0m       \x1b[37m2 minutes ago\x1b[0m  \x1b[32mUp 2 minutes\x1b[0m  \x1b[35m80/tcp\x1b[0m    \x1b[37mweb-server\x1b[0m')
        terminal.current?.writeln('\x1b[32mf6e5d4c3b2a1\x1b[0m   \x1b[36mredis:alpine\x1b[0m   \x1b[33m"redis"\x1b[0m       \x1b[37m5 minutes ago\x1b[0m  \x1b[32mUp 5 minutes\x1b[0m  \x1b[35m6379/tcp\x1b[0m  \x1b[37mcache\x1b[0m')
      } else if (cmd === 'docker images') {
        terminal.current?.writeln('\x1b[37mREPOSITORY    TAG       IMAGE ID       CREATED        SIZE\x1b[0m')
        terminal.current?.writeln('\x1b[36mnginx\x1b[0m         \x1b[33mlatest\x1b[0m    \x1b[32m1b2c3d4e5f67\x1b[0m   \x1b[37m2 weeks ago\x1b[0m    \x1b[35m142MB\x1b[0m')
        terminal.current?.writeln('\x1b[36mredis\x1b[0m         \x1b[33malpine\x1b[0m    \x1b[32mf6e5d4c3b2a1\x1b[0m   \x1b[37m1 month ago\x1b[0m    \x1b[35m32.3MB\x1b[0m')
      } else if (cmd.includes('docker build')) {
        terminal.current?.writeln('\x1b[37mSending build context to Docker daemon...\x1b[0m')
        terminal.current?.writeln('\x1b[32mStep 1/5 : FROM node:18-alpine\x1b[0m')
        terminal.current?.writeln('\x1b[32mSuccessfully built a1b2c3d4e5f6\x1b[0m')
        terminal.current?.writeln('\x1b[32mSuccessfully tagged devtrip-app:latest\x1b[0m')
      } else {
        terminal.current?.writeln('\x1b[37mUsage: docker [OPTIONS] COMMAND\x1b[0m')
        terminal.current?.writeln('Try: \x1b[36mdocker ps\x1b[0m, \x1b[36mdocker images\x1b[0m, \x1b[36mdocker build\x1b[0m')
      }
    }

    const handleKubernetesCommand = (cmd: string) => {
      if (cmd === 'kubectl get pods') {
        terminal.current?.writeln('\x1b[37mNAME                    READY   STATUS    RESTARTS   AGE\x1b[0m')
        terminal.current?.writeln('\x1b[36mweb-app-7d4b8c5f9-x2h8k\x1b[0m   \x1b[32m1/1\x1b[0m     \x1b[32mRunning\x1b[0m   \x1b[33m0\x1b[0m          \x1b[37m2m\x1b[0m')
        terminal.current?.writeln('\x1b[36mdb-6c8b7f5d9-k4n7m\x1b[0m       \x1b[32m1/1\x1b[0m     \x1b[32mRunning\x1b[0m   \x1b[33m0\x1b[0m          \x1b[37m5m\x1b[0m')
      } else if (cmd === 'kubectl get deployments') {
        terminal.current?.writeln('\x1b[37mNAME      READY   UP-TO-DATE   AVAILABLE   AGE\x1b[0m')
        terminal.current?.writeln('\x1b[36mweb-app\x1b[0m   \x1b[32m1/1\x1b[0m     \x1b[32m1\x1b[0m            \x1b[32m1\x1b[0m           \x1b[37m2m\x1b[0m')
        terminal.current?.writeln('\x1b[36mdb\x1b[0m        \x1b[32m1/1\x1b[0m     \x1b[32m1\x1b[0m            \x1b[32m1\x1b[0m           \x1b[37m5m\x1b[0m')
      } else if (cmd === 'kubectl get services') {
        terminal.current?.writeln('\x1b[37mNAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE\x1b[0m')
        terminal.current?.writeln('\x1b[36mweb-service\x1b[0m  \x1b[33mClusterIP\x1b[0m   \x1b[35m10.96.45.123\x1b[0m    \x1b[90m<none>\x1b[0m        \x1b[32m80/TCP\x1b[0m    \x1b[37m2m\x1b[0m')
        terminal.current?.writeln('\x1b[36mdb-service\x1b[0m   \x1b[33mClusterIP\x1b[0m   \x1b[35m10.96.12.456\x1b[0m    \x1b[90m<none>\x1b[0m        \x1b[32m3306/TCP\x1b[0m  \x1b[37m5m\x1b[0m')
      } else if (cmd.startsWith('kubectl apply')) {
        terminal.current?.writeln('\x1b[32mconfiguration applied successfully\x1b[0m')
      } else {
        terminal.current?.writeln('\x1b[37mkubectl controls the Kubernetes cluster manager.\x1b[0m')
        terminal.current?.writeln('Try: \x1b[36mkubectl get pods\x1b[0m, \x1b[36mkubectl get deployments\x1b[0m, \x1b[36mkubectl get services\x1b[0m')
      }
    }

    const handleTerraformCommand = (cmd: string) => {
      if (cmd === 'terraform plan') {
        terminal.current?.writeln('\x1b[37mTerraform will perform the following actions:\x1b[0m')
        terminal.current?.writeln('  \x1b[32m+\x1b[0m \x1b[36maws_instance.web\x1b[0m')
        terminal.current?.writeln('  \x1b[32m+\x1b[0m \x1b[36maws_security_group.web_sg\x1b[0m')
        terminal.current?.writeln('\x1b[32mPlan: 2 to add, 0 to change, 0 to destroy.\x1b[0m')
      } else if (cmd === 'terraform apply') {
        terminal.current?.writeln('\x1b[32mApply complete! Resources: 2 added, 0 changed, 0 destroyed.\x1b[0m')
        terminal.current?.writeln('\x1b[37mOutputs:\x1b[0m')
        terminal.current?.writeln('\x1b[33minstance_ip\x1b[0m = \x1b[32m"54.123.45.67"\x1b[0m')
      } else if (cmd === 'terraform init') {
        terminal.current?.writeln('\x1b[36mInitializing the backend...\x1b[0m')
        terminal.current?.writeln('\x1b[36mInitializing provider plugins...\x1b[0m')
        terminal.current?.writeln('\x1b[32mTerraform has been successfully initialized!\x1b[0m')
      } else {
        terminal.current?.writeln('\x1b[37mUsage: terraform [global options] <subcommand> [args]\x1b[0m')
        terminal.current?.writeln('Try: \x1b[36mterraform init\x1b[0m, \x1b[36mterraform plan\x1b[0m, \x1b[36mterraform apply\x1b[0m')
      }
    }


  if (!isClient) {
    return (
      <div className={`bg-slate-900 rounded-lg p-4 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-slate-700 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-slate-700 rounded w-2/3"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-slate-900 rounded-lg overflow-hidden ${className}`}>
      {/* Terminal Header */}
      <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-slate-400 text-sm ml-4">DevTrip Terminal</div>
      </div>
      
      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="p-4 h-96 overflow-hidden"
        style={{ height: '400px' }}
      />
    </div>
  )
  }
)

// Dynamic import로 SSR 에러 방지
export const TerminalComponent = dynamic(() => Promise.resolve(TerminalComponentInner), {
  ssr: false,
  loading: () => (
    <div className="bg-slate-900 rounded-lg overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-slate-400 text-sm ml-4">DevTrip Terminal</div>
      </div>
      
      {/* Loading Content */}
      <div className="p-4 h-96" style={{ height: '400px' }}>
        <div className="animate-pulse">
          <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-slate-700 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-slate-700 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  )
})