import { ref, readonly } from 'vue'

export interface DragPosition {
  x: number
  y: number
}

export interface DragOptions {
  storageKey?: string
  snapToEdges?: boolean
  constrainToViewport?: boolean
}

export const useDrag = (options: DragOptions = {}) => {
  const {
    storageKey = 'drag-position',
    snapToEdges = true,
    constrainToViewport = true
  } = options

  const isDragging = ref(false)
  const position = ref<DragPosition>({ x: 0, y: 0 })
  const dragStart = ref<DragPosition>({ x: 0, y: 0 })

  const loadPosition = (defaultPosition: DragPosition) => {
    if (typeof window === 'undefined') return defaultPosition

    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        return {
          x: Math.max(0, Math.min(parsed.x, window.innerWidth - 100)),
          y: Math.max(0, Math.min(parsed.y, window.innerHeight - 100))
        }
      }
    } catch (error) {
      console.warn(`Failed to load position from ${storageKey}:`, error)
    }
    
    return defaultPosition
  }

  const savePosition = () => {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(storageKey, JSON.stringify(position.value))
    } catch (error) {
      console.warn(`Failed to save position to ${storageKey}:`, error)
    }
  }

  const constrainPosition = (newX: number, newY: number, widgetWidth: number, widgetHeight: number) => {
    if (!constrainToViewport || typeof window === 'undefined') {
      return { x: newX, y: newY }
    }

    const padding = 20
    const maxX = window.innerWidth - widgetWidth - padding
    const maxY = window.innerHeight - widgetHeight - padding

    return {
      x: Math.max(padding, Math.min(newX, maxX)),
      y: Math.max(padding, Math.min(newY, maxY))
    }
  }

  const snapToEdge = (widgetWidth: number, widgetHeight: number) => {
    if (!snapToEdges || typeof window === 'undefined') return

    const padding = 20
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    const centerX = position.value.x + widgetWidth / 2
    const centerY = position.value.y + widgetHeight / 2

    const distLeft = centerX
    const distRight = windowWidth - centerX
    const distTop = centerY
    const distBottom = windowHeight - centerY

    const minHorizontal = Math.min(distLeft, distRight)
    const minVertical = Math.min(distTop, distBottom)

    if (minHorizontal < minVertical) {
      // Snap to horizontal edges
      if (distLeft < distRight) {
        position.value.x = padding
      } else {
        position.value.x = windowWidth - widgetWidth - padding
      }
      position.value.y = Math.max(
        padding,
        Math.min(position.value.y, windowHeight - widgetHeight - padding)
      )
    } else {
      // Snap to vertical edges
      if (distTop < distBottom) {
        position.value.y = padding
      } else {
        position.value.y = windowHeight - widgetHeight - padding
      }
      position.value.x = Math.max(
        padding,
        Math.min(position.value.x, windowWidth - widgetWidth - padding)
      )
    }

    savePosition()
  }

  const startDrag = (event: MouseEvent | TouchEvent) => {
    isDragging.value = true
    
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY
    
    dragStart.value = {
      x: clientX - position.value.x,
      y: clientY - position.value.y
    }
    
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDrag)
    document.addEventListener('touchmove', onDrag, { passive: false })
    document.addEventListener('touchend', stopDrag)
  }

  const onDrag = (event: MouseEvent | TouchEvent) => {
    if (!isDragging.value) return
    
    event.preventDefault()
    
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY
    
    const newX = clientX - dragStart.value.x
    const newY = clientY - dragStart.value.y
    
    // Use default widget dimensions if not provided
    const constrained = constrainPosition(newX, newY, 400, 300)
    position.value = constrained
  }

  const stopDrag = () => {
    isDragging.value = false
    
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', stopDrag)
    document.removeEventListener('touchmove', onDrag)
    document.removeEventListener('touchend', stopDrag)
    
    if (snapToEdges) {
      snapToEdge(400, 300) // Default widget dimensions
    }
  }

  const handleResize = (widgetWidth: number, widgetHeight: number) => {
    if (typeof window === 'undefined') return

    const constrained = constrainPosition(position.value.x, position.value.y, widgetWidth, widgetHeight)
    position.value = constrained
  }

  return {
    isDragging: readonly(isDragging),
    position,
    startDrag,
    stopDrag,
    loadPosition,
    savePosition,
    handleResize,
    snapToEdge
  }
}
