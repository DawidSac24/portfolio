// /src/components/ui/Viewport3D.tsx
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { SceneManager } from "../../engine/core/scene.manager";
import type { Scene } from "../../engine/scenes/scene";

interface Viewport3DProps {
  sceneId: string;
  buildFn: () => Promise<Scene>;
  className?: string;
  style?: React.CSSProperties;
}

export const Viewport3D = ({
  sceneId,
  buildFn,
  className,
  style,
}: Viewport3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDisposed = false;
    let isVisible = true;
    let animationFrameId: number;
    let activeScene: Scene | null = null;
    let composer: EffectComposer | null = null;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const updateSize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      const pixelRatio = renderer.getPixelRatio();
      renderer.setSize(width, height);

      if (activeScene) {
        activeScene.camera.aspect = width / height;
        activeScene.camera.updateProjectionMatrix();
        activeScene
          .getEffects()
          .forEach((fx) => fx.onResize?.(width, height, pixelRatio));
      }
      if (composer) {
        composer.setSize(width, height);
      }
    };

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(container);

    const onPointerMove = (e: PointerEvent) => {
      if (!activeScene) return;
      const rect = renderer.domElement.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      activeScene.getEffects().forEach((fx) => fx.onMouseMove?.(x, y));
    };

    const onPointerLeave = () => {
      activeScene?.getEffects().forEach((fx) => fx.onMouseMove?.(-10, -10));
    };

    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerleave", onPointerLeave);

    SceneManager.getInstance()
      .acquireScene(sceneId, buildFn)
      .then((scene) => {
        if (isDisposed) return;
        activeScene = scene;
        activeScene.enter();

        const effects = activeScene.getEffects();
        if (effects.length > 0) {
          const renderTarget = new THREE.WebGLRenderTarget(
            container.clientWidth || 1,
            container.clientHeight || 1,
            { format: THREE.RGBAFormat },
          );
          composer = new EffectComposer(renderer, renderTarget);
          composer.addPass(
            new RenderPass(activeScene.handle, activeScene.camera),
          );

          effects.forEach((fx) => composer!.addPass(fx.pass));
        }

        updateSize();
      });

    let lastTime = 0;
    const loop = (time: number) => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(loop);

      if (!isVisible || !activeScene) return;

      const timeInSeconds = time * 0.001;
      const deltaTime = lastTime ? timeInSeconds - lastTime : 0;
      lastTime = timeInSeconds;

      activeScene.update(deltaTime);

      if (composer) {
        composer.render();
      } else {
        renderer.render(activeScene.handle, activeScene.camera);
      }
    };
    animationFrameId = requestAnimationFrame(loop);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerleave", onPointerLeave);

      activeScene?.exit();

      composer?.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [sceneId]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", width: "100%", height: "100%", ...style }}
    />
  );
};
