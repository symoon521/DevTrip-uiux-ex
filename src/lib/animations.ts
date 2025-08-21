import { ANIMATION_DURATIONS } from './constants'

export interface AnimationState {
  isFlying: boolean
  planePosition: { x: number; y: number }
  targetPosition: { x: number; y: number }
  isTransitioning: boolean
  cloudTransition: 'none' | 'closing' | 'opening'
}

export const createInitialAnimationState = (): AnimationState => ({
  isFlying: false,
  planePosition: { x: 50, y: 20 },
  targetPosition: { x: 50, y: 20 },
  isTransitioning: false,
  cloudTransition: 'none'
})

export const easeInOutQuart = (t: number): number => {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
}

export const animatePlane = (
  startPosition: { x: number; y: number },
  targetPosition: { x: number; y: number },
  onUpdate: (position: { x: number; y: number }) => void,
  onComplete?: () => void
) => {
  const duration = ANIMATION_DURATIONS.PLANE_FLIGHT
  const startTime = Date.now()
  
  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easeInOutQuart(progress)
    
    const newX = startPosition.x + (targetPosition.x - startPosition.x) * easedProgress
    const newY = startPosition.y + (targetPosition.y - startPosition.y) * easedProgress
    
    onUpdate({ x: newX, y: newY })
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    } else if (onComplete) {
      onComplete()
    }
  }
  
  requestAnimationFrame(animate)
}

export const createCloudTransition = (
  onPhaseChange: (phase: 'closing' | 'opening' | 'none') => void,
  onComplete: () => void
) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      onPhaseChange('closing')
      
      setTimeout(() => {
        onPhaseChange('opening')
        
        setTimeout(() => {
          onPhaseChange('none')
          onComplete()
          resolve()
        }, ANIMATION_DURATIONS.CLOUD_TRANSITION)
      }, 300)
    }, ANIMATION_DURATIONS.CLOUD_TRANSITION)
  })
}

export const getPlaneRotation = (
  current: { x: number; y: number },
  target: { x: number; y: number }
): number => {
  return Math.atan2(target.y - current.y, target.x - current.x) * 180 / Math.PI + 90
}