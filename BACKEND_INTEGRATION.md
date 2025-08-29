# 백엔드 서버 연동 가이드

이 문서는 프론트엔드에서 구현된 기능들을 실제 백엔드 서버 및 데이터베이스와 연동하기 위한 가이드입니다.

## 프로필 이미지 업로드 API

### 엔드포인트: `POST /api/profile/upload-avatar`

**요청:**
```typescript
// FormData로 전송
const formData = new FormData()
formData.append('avatar', file) // File 객체
```

**응답:**
```typescript
{
  "success": true,
  "avatarUrl": "https://your-cdn.com/avatars/user123.jpg"
}
```

**구현 예시 (Node.js + Express):**
```javascript
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

app.post('/api/profile/upload-avatar', auth, upload.single('avatar'), async (req, res) => {
  try {
    // 파일 검증
    if (!req.file) {
      return res.status(400).json({ error: '파일이 없습니다.' })
    }

    // 파일 크기/타입 검증
    if (req.file.size > 2 * 1024 * 1024) {
      return res.status(400).json({ error: '파일 크기는 2MB 이하여야 합니다.' })
    }

    // S3/CloudStorage에 업로드 또는 로컬 저장
    const avatarUrl = await uploadToStorage(req.file)
    
    // 데이터베이스 업데이트
    await User.findByIdAndUpdate(req.user.id, { avatar: avatarUrl })

    res.json({ success: true, avatarUrl })
  } catch (error) {
    res.status(500).json({ error: '업로드 실패' })
  }
})
```

## 프로필 정보 업데이트 API

### 엔드포인트: `PUT /api/profile`

**요청:**
```typescript
{
  "name": "사용자 이름",
  "email": "user@email.com",
  "avatar": "https://your-cdn.com/avatars/user123.jpg"
}
```

**응답:**
```typescript
{
  "success": true,
  "message": "프로필이 업데이트되었습니다."
}
```

## 프로필 정보 조회 API

### 엔드포인트: `GET /api/profile`

**응답:**
```typescript
{
  "name": "사용자 이름",
  "email": "user@email.com",
  "avatar": "https://your-cdn.com/avatars/user123.jpg"
}
```

## 데이터베이스 스키마

### Users 테이블

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  avatar VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### MongoDB 스키마 예시

```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String, default: null },
}, { timestamps: true })
```

## 환경 변수 설정

```.env
# 파일 업로드
UPLOAD_DIR=uploads/avatars
MAX_FILE_SIZE=2097152  # 2MB in bytes

# AWS S3 (선택사항)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=your-bucket-name
AWS_S3_REGION=us-east-1

# CloudFront CDN URL (선택사항)
CDN_BASE_URL=https://your-cloudfront-domain.com
```

## 프론트엔드 수정 사항

1. **API 기본 URL 설정:**
```typescript
// src/lib/config.ts
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
```

2. **인증 토큰 관리:**
```typescript
// src/lib/auth.ts
export function getAuthToken(): string {
  return localStorage.getItem('authToken') || ''
}
```

3. **에러 처리 개선:**
```typescript
// src/lib/api/profile.ts에서 실제 API 호출로 변경
export async function uploadProfileImage(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('avatar', file)
  
  const response = await fetch(`${API_BASE_URL}/api/profile/upload-avatar`, {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`
    }
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || '이미지 업로드에 실패했습니다.')
  }
  
  const data = await response.json()
  return data.avatarUrl
}
```

## 보안 고려사항

1. **파일 업로드 보안:**
   - 파일 타입 검증 (MIME type 확인)
   - 파일 크기 제한
   - 악성 파일 스캔
   - 파일명 sanitization

2. **인증/권한:**
   - JWT 토큰 검증
   - 사용자별 파일 접근 권한 체크

3. **이미지 처리:**
   - 이미지 리사이징 (예: 200x200px)
   - 이미지 압축
   - WebP 포맷 변환

## 배포 시 고려사항

1. **CDN 설정:**
   - 이미지 파일은 CDN을 통해 서빙
   - 캐시 정책 설정

2. **백업:**
   - 업로드된 파일들의 정기적인 백업
   - 데이터베이스 백업

3. **모니터링:**
   - 파일 업로드 성공/실패 로그
   - 디스크 사용량 모니터링