import { useEffect, useRef } from "react"

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
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const particlesRef = useRef<any[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000, prevX: 0, prevY: 0 })
  const blastRef = useRef({ active: false, x: 0, y: 0, radius: 0, maxRadius: maxBlastRadius })
  const animationRef = useRef<number>(0)
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 })

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!canvas || !container) return

    contextRef.current = canvas.getContext("2d", { alpha: true })
    if (contextRef.current) {
      contextRef.current.globalCompositeOperation = "lighter"
    }

    class Particle {
      x: number; y: number; size: number; baseX: number; baseY: number
      density: number; color: string; vx: number; vy: number; friction: number

      constructor(x: number, y: number) {
        this.x = x; this.y = y; this.baseX = x; this.baseY = y
        this.size = Math.random() * particleSize + 0.5
        this.density = Math.random() * 3 + 1
        this.color = particleColor
        this.vx = 0; this.vy = 0
        this.friction = 0.9 - 0.01 * this.density
      }

      draw() {
        if (!contextRef.current) return
        contextRef.current.fillStyle = this.color
        contextRef.current.beginPath()
        contextRef.current.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        contextRef.current.closePath()
        contextRef.current.fill()
      }

      update() {
        if (!contextRef.current) return
        this.x += this.vx; this.y += this.vy
        this.vx *= this.friction; this.vy *= this.friction

        const dx = mouseRef.current.x - this.x
        const dy = mouseRef.current.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < interactionDistance && distance > 0) {
          const force = (interactionDistance - distance) / interactionDistance
          this.x -= (dx / distance) * force * this.density * 0.6
          this.y -= (dy / distance) * force * this.density * 0.6
          this.color = activeColor
        } else {
          if (this.x !== this.baseX) this.x -= (this.x - this.baseX) / 20
          if (this.y !== this.baseY) this.y -= (this.y - this.baseY) / 20
          this.color = particleColor
        }

        if (blastRef.current.active) {
          const bx = this.x - blastRef.current.x
          const by = this.y - blastRef.current.y
          const bd = Math.sqrt(bx * bx + by * by)
          if (bd < blastRef.current.radius) {
            const bf = (blastRef.current.radius - bd) / blastRef.current.radius
            this.vx += (bx / (bd || 1)) * bf * 15
            this.vy += (by / (bd || 1)) * bf * 15
            const intensity = Math.min(255, Math.floor(255 - bd))
            this.color = `rgba(${intensity}, ${intensity}, ${intensity}, 0.8)`
          }
        }
        this.draw()
      }
    }

    const initParticles = () => {
      particlesRef.current = []
      const { w, h } = sizeRef.current
      if (w === 0 || h === 0) return
      const count = Math.floor((w * h) / particleDensity)
      for (let i = 0; i < count; i++) {
        particlesRef.current.push(new Particle(Math.random() * w, Math.random() * h))
      }
    }

    const setupCanvas = () => {
      const rect = container.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      if (w === 0 || h === 0) return

      sizeRef.current = { w, h, offsetX: rect.left, offsetY: rect.top }
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
      if (now - lastMove < 10) return
      lastMove = now
      const local = toLocal(e.clientX, e.clientY)
      const prev = { x: mouseRef.current.x, y: mouseRef.current.y }
      mouseRef.current = { x: local.x, y: local.y, prevX: prev.x, prevY: prev.y }
      const d = Math.sqrt((local.x - prev.x) ** 2 + (local.y - prev.y) ** 2)
      if (d < 5) {
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
      if (!contextRef.current) return
      const { w, h } = sizeRef.current
      contextRef.current.clearRect(0, 0, w, h)
      particlesRef.current.forEach(p => p.update())
      animationRef.current = requestAnimationFrame(animate)
    }

    // Use ResizeObserver for reliable sizing
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
  }, [particleDensity, particleSize, particleColor, activeColor, maxBlastRadius, hoverDelay, interactionDistance])

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <canvas ref={canvasRef} className="absolute top-0 left-0" />
    </div>
  )
}
