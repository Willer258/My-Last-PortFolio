import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { useInView } from "@/utils/useInView";

export type DeviceMedia = { src: string; kind: "image" | "video" };

interface DeviceSceneProps {
  device: "laptop" | "phone";
  media: DeviceMedia[];
  index: number;
  /** Lecture de la démo vidéo (contrôlée par le parent — pause par défaut en reduced-motion). */
  videoActive: boolean;
  label: string;
}

type LoadedMedia = {
  texture: THREE.Texture;
  video?: HTMLVideoElement;
  width: number;
  height: number;
};

/* Encre du thème (tailwind ink/surface) — le device appartient à la même famille visuelle. */
const BODY_COLOR = 0x1c1c1b;
const BODY_DARK = 0x121211;

function makeKeyboardTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 288;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#161615";
  ctx.fillRect(0, 0, c.width, c.height);
  // Grille de touches, très bas contraste — suggère le clavier sans le dessiner.
  const rows = 5;
  const cols = 14;
  const pad = 18;
  const gap = 7;
  const kw = (c.width - pad * 2 - gap * (cols - 1)) / cols;
  const kh = (c.height - pad * 2 - gap * (rows - 1) - 54) / rows;
  ctx.fillStyle = "#1f1f1e";
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      const x = pad + col * (kw + gap);
      const y = pad + r * (kh + gap);
      ctx.beginPath();
      ctx.roundRect(x, y, kw, kh, 4);
      ctx.fill();
    }
  }
  // Barre espace + trackpad fantôme
  ctx.beginPath();
  ctx.roundRect(c.width * 0.32, c.height - 44, c.width * 0.36, 26, 5);
  ctx.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeShadowTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(128, 128, 8, 128, 128, 126);
  g.addColorStop(0, "rgba(0,0,0,0.55)");
  g.addColorStop(0.55, "rgba(0,0,0,0.22)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

function makeRoundedAlpha(w: number, h: number, r: number): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.roundRect(0, 0, w, h, r);
  ctx.fill();
  return new THREE.CanvasTexture(c);
}

/** Cover-fit d'une texture sur un plan d'aspect donné (répétition/offset UV). */
function fitCover(tex: THREE.Texture, mediaW: number, mediaH: number, planeAspect: number) {
  const mediaAspect = mediaW / mediaH;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  if (mediaAspect > planeAspect) {
    tex.repeat.set(planeAspect / mediaAspect, 1);
    tex.offset.set((1 - tex.repeat.x) / 2, 0);
  } else {
    tex.repeat.set(1, mediaAspect / planeAspect);
    tex.offset.set(0, (1 - tex.repeat.y) / 2);
  }
}

export default function DeviceScene({ device, media, index, videoActive, label }: DeviceSceneProps) {
  const { ref: viewRef, isInView } = useInView("60px");
  const mountRef = useRef<HTMLDivElement>(null);
  const isInViewRef = useRef(false);
  const apiRef = useRef<{
    setMedia: (i: number) => void;
    setVideoActive: (on: boolean) => void;
  } | null>(null);
  const mediaRef = useRef(media);
  const videoActiveRef = useRef(videoActive);

  useEffect(() => {
    isInViewRef.current = isInView;
    // La visibilité (re)déclenche lecture/pause de la vidéo courante.
    apiRef.current?.setVideoActive(videoActiveRef.current);
  }, [isInView]);

  useEffect(() => {
    mediaRef.current = media;
  }, [media]);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      32,
      Math.max(currentMount.clientWidth, 1) / Math.max(currentMount.clientHeight, 1),
      0.1,
      60
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.touchAction = "pan-y"; // le scroll vertical du sheet reste natif
    renderer.domElement.style.cursor = "grab";
    currentMount.appendChild(renderer.domElement);

    /* ── Lumières ── */
    scene.add(new THREE.AmbientLight(0xffffff, 1.05));
    const key = new THREE.DirectionalLight(0xffffff, 2.1);
    key.position.set(3.2, 4.5, 4.2);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xdfe8ff, 0.9);
    rim.position.set(-4, 2.2, -3.5);
    scene.add(rim);

    /* ── Hiérarchie: rotGroup(Y drag) > [ombre, bobGroup(X tilt + bob) > device] ── */
    const rotGroup = new THREE.Group();
    const bobGroup = new THREE.Group();
    rotGroup.add(bobGroup);
    scene.add(rotGroup);

    const disposables: Array<{ dispose: () => void }> = [];
    const track = <T extends { dispose: () => void }>(d: T): T => {
      disposables.push(d);
      return d;
    };

    const bodyMat = track(
      new THREE.MeshStandardMaterial({ color: BODY_COLOR, metalness: 0.35, roughness: 0.5 })
    );
    const bodyDarkMat = track(
      new THREE.MeshStandardMaterial({ color: BODY_DARK, metalness: 0.2, roughness: 0.75 })
    );
    const screenMat = track(
      new THREE.MeshBasicMaterial({ color: 0x000000, toneMapped: false, transparent: true })
    );

    let planeAspect = 1;
    let shadowY = 0;

    if (device === "laptop") {
      // Base
      const base = new THREE.Mesh(track(new RoundedBoxGeometry(3.4, 0.16, 2.3, 4, 0.05)), bodyMat);
      base.position.y = 0.08;
      bobGroup.add(base);
      // Clavier (texture générée)
      const kbTex = track(makeKeyboardTexture());
      const kb = new THREE.Mesh(
        track(new THREE.PlaneGeometry(3.06, 1.72)),
        track(new THREE.MeshStandardMaterial({ map: kbTex, roughness: 0.9, metalness: 0.05 }))
      );
      kb.rotation.x = -Math.PI / 2;
      kb.position.set(0, 0.165, 0.12);
      bobGroup.add(kb);
      // Écran sur charnière, légèrement incliné vers l'arrière
      const hinge = new THREE.Group();
      hinge.position.set(0, 0.14, -1.1);
      hinge.rotation.x = 0.24;
      const lid = new THREE.Mesh(track(new RoundedBoxGeometry(3.4, 2.18, 0.09, 4, 0.045)), bodyMat);
      lid.position.y = 1.09;
      hinge.add(lid);
      planeAspect = 16 / 10;
      const screen = new THREE.Mesh(track(new THREE.PlaneGeometry(3.18, 3.18 / planeAspect)), screenMat);
      screen.position.set(0, 1.09, 0.05);
      hinge.add(screen);
      bobGroup.add(hinge);
      shadowY = 0.001;
    } else {
      // Téléphone flottant
      const body = new THREE.Mesh(track(new RoundedBoxGeometry(1.12, 2.36, 0.1, 4, 0.11)), bodyMat);
      body.position.y = 1.3;
      bobGroup.add(body);
      // Tranche caméra arrière discrète
      const camBump = new THREE.Mesh(track(new RoundedBoxGeometry(0.34, 0.34, 0.03, 3, 0.06)), bodyDarkMat);
      camBump.position.set(-0.3, 2.12, -0.06);
      bobGroup.add(camBump);
      const sw = 1.0;
      const sh = sw * (2622 / 1206); // ratio exact des captures iPhone
      planeAspect = sw / sh;
      screenMat.alphaMap = track(makeRoundedAlpha(512, Math.round(512 / planeAspect), 60));
      const screen = new THREE.Mesh(track(new THREE.PlaneGeometry(sw, sh)), screenMat);
      screen.position.set(0, 1.3, 0.055);
      bobGroup.add(screen);
      shadowY = 0.001;
    }

    // Ombre de contact
    const shadow = new THREE.Mesh(
      track(new THREE.PlaneGeometry(device === "laptop" ? 4.6 : 2.4, device === "laptop" ? 3.4 : 2.4)),
      track(
        new THREE.MeshBasicMaterial({
          map: track(makeShadowTexture()),
          transparent: true,
          depthWrite: false,
          opacity: 0.85,
        })
      )
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = shadowY;
    rotGroup.add(shadow);

    /* ── Cadrage caméra (contient le device quel que soit l'aspect du conteneur) ── */
    const bounds = new THREE.Box3().setFromObject(bobGroup);
    const center = bounds.getCenter(new THREE.Vector3());
    const half = bounds.getSize(new THREE.Vector3()).multiplyScalar(0.5);
    const frameCamera = () => {
      const w = Math.max(currentMount.clientWidth, 1);
      const h = Math.max(currentMount.clientHeight, 1);
      camera.aspect = w / h;
      const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const pad = 1.22;
      const distH = (half.y * pad) / tanHalf;
      const distW = (half.x * pad * 1.12) / (tanHalf * camera.aspect); // marge extra pour la rotation
      const dist = Math.max(distH, distW) + half.z;
      camera.position.set(0, center.y + dist * 0.14, dist);
      camera.lookAt(0, center.y, 0);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    frameCamera();

    /* ── Médias (textures image/vidéo, avec cache) ── */
    const cache = new Map<string, Promise<LoadedMedia>>();
    const texLoader = new THREE.TextureLoader();

    const loadMedia = (m: DeviceMedia): Promise<LoadedMedia> => {
      const hit = cache.get(m.src);
      if (hit) return hit;
      const p: Promise<LoadedMedia> =
        m.kind === "video"
          ? new Promise((resolve, reject) => {
              const el = document.createElement("video");
              el.muted = true;
              el.loop = true;
              el.playsInline = true;
              el.setAttribute("playsinline", "");
              el.preload = "auto";
              el.src = m.src;
              el.addEventListener(
                "loadedmetadata",
                () => {
                  const texture = new THREE.VideoTexture(el);
                  texture.colorSpace = THREE.SRGBColorSpace;
                  texture.minFilter = THREE.LinearFilter;
                  texture.generateMipmaps = false;
                  resolve({ texture, video: el, width: el.videoWidth, height: el.videoHeight });
                },
                { once: true }
              );
              el.addEventListener("error", () => reject(new Error("video " + m.src)), { once: true });
              el.load();
            })
          : texLoader.loadAsync(m.src).then((texture) => {
              texture.colorSpace = THREE.SRGBColorSpace;
              texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
              const img = texture.image as { width: number; height: number };
              return { texture, width: img.width, height: img.height };
            });
      cache.set(m.src, p);
      return p;
    };

    let screenFade = 0;
    let activeVideo: HTMLVideoElement | null = null;
    let currentKind: DeviceMedia["kind"] = "image";
    let swapSeq = 0;

    const syncVideoPlayback = () => {
      if (!activeVideo) return;
      const shouldPlay =
        currentKind === "video" && videoActiveRef.current && isInViewRef.current && !document.hidden;
      if (shouldPlay) activeVideo.play().catch(() => {});
      else activeVideo.pause();
    };

    const setMedia = (i: number) => {
      const m = mediaRef.current[i];
      if (!m) return;
      const seq = ++swapSeq;
      loadMedia(m)
        .then((loaded) => {
          if (seq !== swapSeq) return; // une sélection plus récente a gagné
          if (activeVideo && activeVideo !== loaded.video) activeVideo.pause();
          activeVideo = loaded.video ?? null;
          currentKind = m.kind;
          fitCover(loaded.texture, loaded.width, loaded.height, planeAspect);
          screenMat.map = loaded.texture;
          screenMat.color.set(0xffffff);
          screenMat.needsUpdate = true;
          screenFade = 0;
          syncVideoPlayback();
        })
        .catch(() => {});
    };

    apiRef.current = {
      setMedia,
      setVideoActive: () => syncVideoPlayback(),
    };
    setMedia(index);

    /* ── Interaction: drag → rotation, souris → parallax, idle → sway ── */
    const rot = { y: 0, x: 0, targetY: 0, targetX: 0, parX: 0, parY: 0 };
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const el = renderer.domElement;
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* pointeur déjà inactif (stylet relâché, évènement synthétique…) */
      }
      el.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      rot.targetY = THREE.MathUtils.clamp(rot.targetY + (e.clientX - lastX) * 0.0055, -0.95, 0.95);
      rot.targetX = THREE.MathUtils.clamp(rot.targetX + (e.clientY - lastY) * 0.0035, -0.12, 0.34);
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const endDrag = (e: PointerEvent) => {
      dragging = false;
      el.style.cursor = "grab";
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* déjà relâché */
      }
    };
    const onMouseMove = (e: MouseEvent) => {
      if (dragging || prefersReducedMotion) return;
      const r = currentMount.getBoundingClientRect();
      rot.parX = ((e.clientX - r.left) / r.width - 0.5) * 0.16;
      rot.parY = ((e.clientY - r.top) / r.height - 0.5) * 0.08;
    };
    const onMouseLeave = () => {
      rot.parX = 0;
      rot.parY = 0;
    };
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    currentMount.addEventListener("mousemove", onMouseMove, { passive: true });
    currentMount.addEventListener("mouseleave", onMouseLeave, { passive: true });

    const onVisibility = () => syncVideoPlayback();
    document.addEventListener("visibilitychange", onVisibility);

    /* ── Boucle ── */
    const clock = new THREE.Clock();
    const introDur = prefersReducedMotion ? 0 : 0.95;
    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isInViewRef.current || document.hidden) return;

      const t = clock.getElapsedTime();
      // Intro: le device se présente (échelle + rotation), easing expo-out.
      const k = introDur > 0 ? Math.min(t / introDur, 1) : 1;
      const easeK = 1 - Math.pow(2, -10 * k);
      const introScale = 0.92 + 0.08 * easeK;
      const introRot = -0.4 * (1 - easeK);
      bobGroup.scale.setScalar(introScale);

      const sway = prefersReducedMotion ? 0 : Math.sin(t * 0.5) * 0.045;
      const bob = prefersReducedMotion ? 0 : Math.sin(t * 0.8) * 0.02;
      rot.y += (rot.targetY + rot.parX + sway + introRot - rot.y) * 0.085;
      rot.x += (rot.targetX + rot.parY - rot.x) * 0.085;
      rotGroup.rotation.y = rot.y;
      bobGroup.rotation.x = rot.x;
      bobGroup.position.y = bob;

      if (screenFade < 1) {
        screenFade = Math.min(1, screenFade + 0.07);
        screenMat.opacity = screenFade;
      }

      renderer.render(scene, camera);
    };
    animate();

    const resizeObserver = new ResizeObserver(frameCamera);
    resizeObserver.observe(currentMount);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      currentMount.removeEventListener("mousemove", onMouseMove);
      currentMount.removeEventListener("mouseleave", onMouseLeave);
      apiRef.current = null;
      cache.forEach((p) =>
        p
          .then((m) => {
            m.texture.dispose();
            if (m.video) {
              m.video.pause();
              m.video.removeAttribute("src");
              m.video.load();
            }
          })
          .catch(() => {})
      );
      disposables.forEach((d) => d.dispose());
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [device]); // eslint-disable-line react-hooks/exhaustive-deps

  // Changement de média (flèches / points) → swap de texture dans la scène.
  useEffect(() => {
    apiRef.current?.setMedia(index);
  }, [index, media]);

  // Lecture/pause de la démo vidéo, pilotée par le parent.
  useEffect(() => {
    videoActiveRef.current = videoActive;
    apiRef.current?.setVideoActive(videoActive);
  }, [videoActive]);

  return (
    <div ref={viewRef} className="absolute inset-0 w-full h-full" role="img" aria-label={label}>
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
