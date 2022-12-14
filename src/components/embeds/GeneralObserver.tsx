import { useRef, useState, PropsWithChildren, useCallback, FC } from 'react'
import { NativeProps, withNativeProps } from '@/utils/native-props'
import { useUnmount } from 'react-use'

interface GeneralObserverProps extends NativeProps {
  onEnter?: (id?: string) => void
}

export const GeneralObserver: FC<
  PropsWithChildren<GeneralObserverProps>
> = props => {
  const { children, onEnter } = props
  const [isChildVisible, setIsChildVisible] = useState(false)
  const observer = useRef<IntersectionObserver>()

  const ref = useCallback((node: HTMLDivElement) => {
    if (!node) return
    observer.current?.disconnect()
    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio > 0) {
          setIsChildVisible(true)
          onEnter && onEnter()
        }
      },
      { rootMargin: '200px', threshold: 0 }
    )
    observer.current.observe(node)
  }, [])

  useUnmount(() => {
    return () => observer.current?.disconnect()
  })

  return withNativeProps(
    props,
    <div ref={ref} className="relative" style={{ width: '100%' }}>
      {isChildVisible && children}
    </div>
  )
}
