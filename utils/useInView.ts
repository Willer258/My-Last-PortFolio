import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref to attach to a container and a boolean that is true
 * whenever any part of the element is inside the viewport.
 * Animations can check `isInView` to pause their RAF loop.
 */
export function useInView(rootMargin = "200px") {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, isInView };
}
