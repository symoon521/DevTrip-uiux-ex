// 프로필 관련 API 함수들
// 실제 서버 구현 시 이 함수들을 사용하여 DB와 통신

export interface ProfileData {
  name: string
  email: string
  avatar: string
}

/**
 * 프로필 이미지를 서버에 업로드
 * @param file 업로드할 이미지 파일
 * @returns 업로드된 이미지의 URL
 */
export async function uploadProfileImage(file: File): Promise<string> {
  // TODO: 실제 서버 구현
  // const formData = new FormData()
  // formData.append('avatar', file)
  
  // const response = await fetch('/api/profile/upload-avatar', {
  //   method: 'POST',
  //   body: formData,
  //   headers: {
  //     'Authorization': `Bearer ${getAuthToken()}`
  //   }
  // })
  
  // if (!response.ok) {
  //   throw new Error('이미지 업로드에 실패했습니다.')
  // }
  
  // const data = await response.json()
  // return data.avatarUrl

  // 현재는 시뮬레이션
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 실제로는 서버에서 반환받은 URL
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result as string)
      reader.onerror = () => reject(new Error('파일 읽기 실패'))
      reader.readAsDataURL(file)
    }, 1000)
  })
}

/**
 * 프로필 정보를 서버에 업데이트
 * @param profileData 업데이트할 프로필 데이터
 */
export async function updateProfile(profileData: Partial<ProfileData>): Promise<void> {
  // TODO: 실제 서버 구현
  // const response = await fetch('/api/profile', {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${getAuthToken()}`
  //   },
  //   body: JSON.stringify(profileData)
  // })
  
  // if (!response.ok) {
  //   throw new Error('프로필 업데이트에 실패했습니다.')
  // }

  // 현재는 시뮬레이션
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('프로필 업데이트:', profileData)
      resolve()
    }, 500)
  })
}

/**
 * 현재 사용자의 프로필 정보를 가져옴
 * @returns 프로필 데이터
 */
export async function getProfile(): Promise<ProfileData> {
  // TODO: 실제 서버 구현
  // const response = await fetch('/api/profile', {
  //   headers: {
  //     'Authorization': `Bearer ${getAuthToken()}`
  //   }
  // })
  
  // if (!response.ok) {
  //   throw new Error('프로필 정보를 가져올 수 없습니다.')
  // }
  
  // return response.json()

  // 현재는 더미 데이터
  return {
    name: "사용자 이름",
    email: "user@email.com",
    avatar: "https://placehold.co/100x100.png"
  }
}

/**
 * 인증 토큰 가져오기 (실제 구현 시 필요)
 */
function getAuthToken(): string {
  // TODO: 실제 토큰 관리 로직
  // return localStorage.getItem('authToken') || ''
  return ''
}