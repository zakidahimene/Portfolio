const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll reveal
const revealEls = document.querySelectorAll<HTMLElement>('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add('in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  revealEls.forEach((el) => io.observe(el));
}

// Highlight videos: loop only the listed [start, end] segments.
document.querySelectorAll<HTMLVideoElement>('video[data-segments]').forEach((v) => {
  const segs: [number, number][] = JSON.parse(v.dataset.segments || '[]');
  if (!segs.length) return;
  let i = 0;
  const seek = (k: number) => {
    i = k;
    v.currentTime = segs[k][0];
  };
  v.addEventListener('loadedmetadata', () => seek(0));
  v.addEventListener('timeupdate', () => {
    const [start, end] = segs[i];
    if (v.currentTime >= end || v.currentTime < start - 0.5) seek((i + 1) % segs.length);
  });
  v.addEventListener('ended', () => {
    seek(0);
    v.play().catch(() => {});
  });

  if (reduceMotion) {
    v.removeAttribute('autoplay');
    v.pause();
    v.controls = true;
    return;
  }
  // Only play while visible
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) v.play().catch(() => {});
    else v.pause();
  });
  io.observe(v);
});
