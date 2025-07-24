import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useDirectionalTransition() {
  const pathname = usePathname()
  const [previousPath, setPreviousPath] = useState(pathname)
  const [direction, setDirection] = useState<'left' | 'right'>('right')

  useEffect(() => {
    // Define your route hierarchy
    const routeOrder = ['/login', '/register', '/dashboard']

    const currentIndex = routeOrder.indexOf(pathname)
    const previousIndex = routeOrder.indexOf(previousPath)

    if (currentIndex > previousIndex) {
      setDirection('right')
    } else {
      setDirection('left')
    }

    setPreviousPath(pathname)
  }, [pathname, previousPath])

  return direction === 'left' ? 'slideInLeft' : 'slideInRight'
}
