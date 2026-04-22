import { useEffect, useRef } from "react"
import { useInView } from "@/utils/useInView"

const isTouchDevice = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches

export default function FluidParticles({
  particleDensity = 100,
  particleSize = 1,
  particleColor = "#555555",
  activeColor = "#ffffff",
  maxBlastRadius = 300,
  hoverDelay = 100,
  interactionDistance = 10,
}: {
  particleDensity?: number
  particleSize?: number
  particleColor?: string
  activeColor?: string
  maxBlastRadius?: number
  hoverDelay?: number
  interactionDistance?: number
}) {
  const { ref: viewRef, isInView } = useInView("100px")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const particlesRef = useRef<Float64Array | null>(null)
  const particleCountRef = useRef(0)
  const mouseRef = useRef({ x: -1000, y: -1000, prevX: 0, prevY: 0 })
  const blastRef = useRef({ active: false, x: 0, y: 0, radius: 0, maxRadius: maxBlastRadius })
  const animationRef = useRef<number>(0)
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sizeRef = useRef({ w: 0, h: 0 })
  const isInViewRef = useRef(false)
  const lastFrameRef = useRef(0)

  // Keep ref in sync so the RAF loop reads the latest value without re-creating the effect
  useEffect(() => { isInViewRef.current = isInView }, [isInView])

  useEffect(() => {
    const container = viewRef.current
    const canvas = canvasRef.current
    if (!canvas || !container) return

    // FPS cap: 30 on touch devices, 60 on desktop
    const targetFps = isTouchDevice() ? 30 : 60
    const minFrameTime = 1000 / targetFps
    // Squared interaction distance — avoids sqrt in hot loop
    const interactionDist2 = interactionDistance * interactionDistance

    contextRef.current = canvas.getContext("2d", { alpha: true })
    if (contextRef.current) {
      contextRef.current.globalCompositeOperation = "lighter"
    }

    // Particle data stored in a flat Float64Array for cache performance.
    // Layout per particle: [x, y, baseX, baseY, size, density, vx, vy, friction]
    const STRIDE = 9
    const X = 0, Y = 1, BX = 2, BY = 3, SIZE = 4, DENSITY = 5, VX = 6, VY = 7, FRICTION = 8

    const initParticles = () => {
      const { w, h } = sizeRef.current
      if (w === 0 || h === 0) return
      const count = Math.floor((w * h) / particleDensity)
      // Cap max particle count
      const maxParticles = isTouchDevice() ? 3000 : 8000
      const cappedCount = Math.min(count, maxParticles)
      particleCountRef.current = cappedCount
      const data = new Float64Array(cappedCount * STRIDE)
      for (let i = 0; i < cappedCount; i++) {
        const off = i * STRIDE
        const px = Math.random() * w
        const py = Math.random() * h
        data[off + X] = px
        data[off + Y] = py
        data[off + BX] = px
        data[off + BY] = py
        data[off + SIZE] = Math.random() * particleSize + 0.5
        data[off + DENSITY] = Math.random() * 3 + 1
        data[off + VX] = 0
        data[off + VY] = 0
        data[off + FRICTION] = 0.9 - 0.01 * data[off + DENSITY]
      }
      particlesRef.current = data
    }

    const setupCanvas = () => {
      const rect = container.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      if (w === 0 || h === 0) return

      sizeRef.current = { w, h }
      const pr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * pr
      canvas.height = h * pr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      contextRef.current = canvas.getContext("2d", { alpha: true })
      if (contextRef.current) {
        contextRef.current.scale(pr, pr)
        contextRef.current.globalCompositeOperation = "lighter"
      }
      initParticles()
    }

    const easeOutQuad = (t: number) => t * (2 - t)

    const triggerBlast = (lx: number, ly: number) => {
      blastRef.current = { active: true, x: lx, y: ly, radius: 0, maxRadius: maxBlastRadius }
      const start = performance.now()
      const expand = (ts: number) => {
        const p = Math.min((ts - start) / 300, 1)
        blastRef.current.radius = easeOutQuad(p) * blastRef.current.maxRadius
        if (p < 1) requestAnimationFrame(expand)
        else setTimeout(() => { blastRef.current.active = false }, 100)
      }
      requestAnimationFrame(expand)
      if (hoverTimerRef.current) { clearTimeout(hoverTimerRef.current); hoverTimerRef.current = null }
    }

    const toLocal = (cx: number, cy: number) => {
      const rect = container.getBoundingClientRect()
      return { x: cx - rect.left, y: cy - rect.top }
    }

    let lastMove = 0
    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now()
      if (now - lastMove < 16) return // throttle to ~60fps
      lastMove = now
      const local = toLocal(e.clientX, e.clientY)
      const prev = { x: mouseRef.current.x, y: mouseRef.current.y }
      mouseRef.current = { x: local.x, y: local.y, prevX: prev.x, prevY: prev.y }
      const d2 = (local.x - prev.x) ** 2 + (local.y - prev.y) ** 2
      if (d2 < 25) { // d < 5
        if (!hoverTimerRef.current) hoverTimerRef.current = setTimeout(() => triggerBlast(local.x, local.y), hoverDelay)
      } else {
        if (hoverTimerRef.current) { clearTimeout(hoverTimerRef.current); hoverTimerRef.current = null }
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return
      const l = toLocal(e.touches[0].clientX, e.touches[0].clientY)
      mouseRef.current = { x: l.x, y: l.y, prevX: mouseRef.current.x, prevY: mouseRef.current.y }
    }
    const onTouchStart = (e: TouchEvent) => {
      if (!e.touches[0]) return
      const l = toLocal(e.touches[0].clientX, e.touches[0].clientY)
      hoverTimerRef.current = setTimeout(() => triggerBlast(l.x, l.y), hoverDelay)
    }
    const onTouchEnd = () => {
      if (hoverTimerRef.current) { clearTimeout(hoverTimerRef.current); hoverTimerRef.current = null }
    }
    const onClick = (e: MouseEvent) => { const l = toLocal(e.clientX, e.clientY); triggerBlast(l.x, l.y) }

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate)

      // Skip frame if not in view
      if (!isInViewRef.current) return

      // FPS limiter
      const now = performance.now()
      if (now - lastFrameRef.current < minFrameTime) return
      lastFrameRef.current = now

      const ctx = contextRef.current
      const data = particlesRef.current
      const count = particleCountRef.current
      if (!ctx || !data) return
      const { w, h } = sizeRef.current

      ctx.clearRect(0, 0, w, h)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const blastActive = blastRef.current.active
      const bx = blastRef.current.x
      const by = blastRef.current.y
      const br = blastRef.current.radius
      const br2 = br * br

      for (let i = 0; i < count; i++) {
        const off = i * STRIDE
        let px = data[off + X]
        let py = data[off + Y]
        const density = data[off + DENSITY]

        // Apply velocity
        px += data[off + VX]
        py += data[off + VY]
        data[off + VX] *= data[off + FRICTION]
        data[off + VY] *= data[off + FRICTION]

        // Mouse interaction — use squared distance to avoid sqrt
        const dx = mx - px
        const dy = my - py
        const dist2 = dx * dx + dy * dy
        let isActive = false

        if (dist2 < interactionDist2 && dist2 > 0) {
          const invDist = 1 / Math.sqrt(dist2) // only sqrt when needed
          const force = (interactionDistance - dist2 * invDist) / interactionDistance
          px -= dx * invDist * force * density * 0.6
          py -= dy * invDist * force * density * 0.6
          isActive = true
        } else {
          // Spring back to base position
          const baseX = data[off + BX]
          const baseY = data[off + BY]
          if (px !== baseX) px -= (px - baseX) * 0.05
          if (py !== baseY) py -= (py - baseY) * 0.05
        }

        // Blast interaction
        if (blastActive) {
          const bdx = px - bx
          const bdy = py - by
          const bd2 = bdx * bdx + bdy * bdy
          if (bd2 < br2) {
            const bd = Math.sqrt(bd2)
            const bf = (br - bd) / br
            data[off + VX] += (bdx / (bd || 1)) * bf * 15
            data[off + VY] += (bdy / (bd || 1)) * bf * 15
          }
        }

        data[off + X] = px
        data[off + Y] = py

        // Draw
        ctx.fillStyle = isActive ? activeColor : particleColor
        const size = data[off + SIZE]
        ctx.beginPath()
        ctx.arc(px, py, size, 0, 6.2832) // 2*PI
        ctx.fill()
      }
    }

    const ro = new ResizeObserver(() => setupCanvas())
    ro.observe(container)

    setupCanvas()
    animate()

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: true })
    window.addEventListener("touchstart", onTouchStart)
    window.addEventListener("touchend", onTouchEnd)
    window.addEventListener("click", onClick)

    return () => {
      cancelAnimationFrame(animationRef.current)
      ro.disconnect()
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchend", onTouchEnd)
      window.removeEventListener("click", onClick)
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    }
  }, [particleDensity, particleSize, particleColor, activeColor, maxBlastRadius, hoverDelay, interactionDistance]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={viewRef} className="absolute inset-0 w-full h-full">
      <canvas ref={canvasRef} className="absolute top-0 left-0" />
    </div>
  )
}
