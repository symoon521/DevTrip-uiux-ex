// Legacy Profile API - Updated to use new User Service
import { userApi, type UserProfile, type UpdateProfileRequest } from './user'

// Legacy interface for backward compatibility
export interface ProfileData {
  name: string
  email: string
  avatar: string
}

// Convert new UserProfile to legacy ProfileData format
function convertToLegacyProfile(userProfile: UserProfile): ProfileData {
  return {
    name: userProfile.name,
    email: userProfile.email,
    avatar: userProfile.avatarUrl || 'https://placehold.co/100x100.png'
  }
}

/**
 * 프로필 이미지를 서버에 업로드
 * @param file 업로드할 이미지 파일
 * @returns 업로드된 이미지의 URL
 */
export async function uploadProfileImage(file: File): Promise<string> {
  try {
    const response = await userApi.uploadAvatar(file)
    return response.url
  } catch (error) {
    console.error('프로필 이미지 업로드 실패:', error)
    throw new Error('이미지 업로드에 실패했습니다.')
  }
}

/**
 * 프로필 정보를 서버에 업데이트
 * @param profileData 업데이트할 프로필 데이터
 */
export async function updateProfile(profileData: Partial<ProfileData>): Promise<void> {
  try {
    const updateData: UpdateProfileRequest = {
      name: profileData.name,
    }
    
    await userApi.updateProfile(updateData)
  } catch (error) {
    console.error('프로필 업데이트 실패:', error)
    throw new Error('프로필 업데이트에 실패했습니다.')
  }
}

/**
 * 현재 사용자의 프로필 정보를 가져옴
 * @returns 프로필 데이터
 */
export async function getProfile(): Promise<ProfileData> {
  try {
    const userProfile = await userApi.getProfile()
    return convertToLegacyProfile(userProfile)
  } catch (error) {
    console.error('프로필 정보 가져오기 실패:', error)
    throw new Error('프로필 정보를 가져올 수 없습니다.')
  }
}