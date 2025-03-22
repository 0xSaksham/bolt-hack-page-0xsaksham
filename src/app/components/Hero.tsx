"use client";

import { SplineScene } from "./ui/splite";
import { Button } from "./ui/button";
import { Countdown } from "./ui/countdown";
import { useEffect, useRef, memo, Suspense, RefObject } from "react";
import Image from "next/image";

// Type definitions for Spline
interface SplineApp {
  setLookAt: (
    index: number,
    position: { x: number; y: number; z: number; lerp: number }
  ) => void;
}

type SplineHandle = {
  spline: SplineApp;
};

// Throttle mouse events to 60fps
const throttle = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
) => {
  let lastCall = 0;
  return (...args: Parameters<T>): ReturnType<T> | void => {
    const now = Date.now();
    if (now - lastCall < delay) return;
    lastCall = now;
    fn(...args);
  };
};

const BackgroundDecorations = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 dark:bg-primary/10" />
    <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-[100px] -z-10 dark:bg-secondary/10" />
  </div>
));
BackgroundDecorations.displayName = "BackgroundDecorations";

const HeroContent = memo(() => (
  <div className="flex-1 text-left max-w-3xl">
    <div className="inline-block px-4 py-1.5 bg-primary/20 dark:bg-primary/30 rounded-full text-sm mb-8 text-primary dark:text-primary-foreground">
      Virtual Event
    </div>
    <div className="flex items-center gap-2 mb-4">
      <span className="text-sm text-muted-foreground">Organized by</span>
      <Image src="/bolt.jpg" alt="Bolt.new" width={24} height={24} />
      <span className="text-sm text-muted-foreground">by</span>
      <Image
        src="/stackblitz-icon-seeklogo.svg"
        alt="StackBlitz"
        width={24}
        height={24}
      />
    </div>
    <h1 className="text-7xl lg:text-9xl font-bold leading-tight mb-6 text-foreground">
      The Worlds
      <br />
      Largest
      <br />
      Hackathon
    </h1>
    <p className="text-3xl text-muted-foreground mb-10">
      Join thousands of developers worldwide
      <br />
      in building the future of technology
    </p>
    <Countdown />
    <Button
      size="lg"
      className="mt-10 text-2xl px-12 py-8 bg-primary text-primary-foreground hover:bg-primary/90"
      onClick={() =>
        window.open(
          "https://form.typeform.com/to/wf94YwH4?typeform-source=t.co",
          "_blank"
        )
      }
    >
      Register Now
    </Button>
  </div>
));
HeroContent.displayName = "HeroContent";

const LazySplineScene = memo(
  ({
    scene,
    className,
  }: {
    splineRef: React.RefObject<SplineHandle>;
    scene: string;
    className: string;
  }) => (
    <Suspense
      fallback={
        <div className="flex-1 h-[600px] w-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white" />
        </div>
      }
    >
      <SplineScene scene={scene} className={className} />{" "}
    </Suspense>
  )
);
LazySplineScene.displayName = "LazySplineScene";

export default function Hero() {
  const splineRef = useRef<SplineHandle>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = throttle((...args: unknown[]) => {
      const e = args[0] as MouseEvent;
      animationFrameId = requestAnimationFrame(() => {
        if (splineRef.current?.spline && sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          const robotLookX = (e.clientX - rect.left) / rect.width - 0.5;
          const robotLookY = (e.clientY - rect.top) / rect.height - 0.5;

          splineRef.current.spline.setLookAt(0, {
            x: robotLookX * 0.3,
            y: robotLookY * 0.3,
            z: 0,
            lerp: 0.1,
          });
        }
      });
    }, 16); // ~60fps

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-background overflow-hidden"
    >
      <BackgroundDecorations />

      <div className="container mx-auto px-4 py-12 relative z-20">
        <div className="flex flex-row items-center gap-20">
          <div className="w-[45%] h-[700px] relative">
            <LazySplineScene
              splineRef={splineRef as RefObject<SplineHandle>}
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
          <HeroContent />
        </div>
      </div>
    </section>
  );
}
