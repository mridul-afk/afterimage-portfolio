# AFTERIMAGE.EXE — FINAL CUT

A narrative-first personal portfolio with a scroll-scrubbed **real WebGL camera journey**, inspired by Gen-X Soft Club, Y2K digital nostalgia, impossible architectural spaces and the expressive visual language of stylish action-game cover art. No game assets or copyrighted cover designs are copied.

## Start

```powershell
npm install
npm run dev
```

Open http://localhost:3000.

## Key files
- `src/components/WorldEngine.tsx`: React Three Fiber real-time corridor and camera driven by scroll progress.
- `src/components/DreamSequence.tsx`: pinned GSAP ScrollTrigger sequence, photo-to-WebGL transitions, chapter titles.
- `src/components/ChromeObject.tsx`: hero chrome sculpture.
- `src/app/page.tsx`: personal story, curiosity (including graphics, OpenGL and Vulkan learning), compact project archive.
- `src/app/globals.css`: Y2K/Soft Club styling and responsive/reduced-motion fallback.
- `public/references/`: user-provided visual references.

## Notes
The camera is animated through a real Three.js scene; the user-provided photographs remain atmospheric overlays. This is a custom portfolio, not a game engine, and the WebGL corridor is deliberately stylized geometry rather than photorealistic architecture. Scroll backwards to reverse the camera. For a reduced-motion OS setting, a static fallback appears. Heavy effects are intentionally capped at DPR 1.5.

The build has not been verified in a browser in this environment. Run `npm run build` before deploying.
