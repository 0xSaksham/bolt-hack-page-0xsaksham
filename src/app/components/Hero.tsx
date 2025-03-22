"use client";

import { SplineScene } from "./ui/splite";

import { Button } from "./ui/button";
import { Countdown } from "./ui/countdown";
import { SplashCursor } from "./ui/splash-cursor";
import { useEffect, useRef, useState, useCallback, memo } from "react";

// Memoize static content components
const BackgroundDecorations = memo(() => (
  <>
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10" />
    <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-900/10 rounded-full blur-[100px] -z-10" />
  </>
));
BackgroundDecorations.displayName = "BackgroundDecorations";

// Memoize the content section
const HeroContent = memo(() => (
  <div className="flex-1 text-center lg:text-left">
    <div className="inline-block px-4 py-1.5 bg-blue-950 rounded-full text-sm mb-6 cursor-none">
      Virtual Event
    </div>
    <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-4">
      The Worlds
      <br />
      Largest
      <br />
      Hackathon
    </h1>
    <p className="text-xl text-blue-200 mb-8">
      Join thousands of developers worldwide
      <br />
      in building the future of technology
    </p>
    <Countdown />
    <Button
      size="lg"
      className="mt-8 text-lg px-8 py-6 bg-blue-600 text-white hover:bg-blue-700 cursor-none"
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

export default function Hero() {
  const [isInsideHero, setIsInsideHero] = useState(false);
  const splineRef = useRef(null);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>();
  const lastMouseEvent = useRef<MouseEvent>();

  // Memoize event handlers
  const handleMouseEnter = useCallback(() => setIsInsideHero(true), []);
  const handleMouseLeave = useCallback(() => setIsInsideHero(false), []);

  // Optimized mouse movement handler using RAF
  const updateSplinePosition = useCallback(() => {
    if (!lastMouseEvent.current || !splineRef.current) return;

    const e = lastMouseEvent.current;
    const splineApp = (splineRef.current as any).spline;

    if (splineApp) {
      // Adjust these values to control robot movement range
      const robotLookX = (e.clientX / window.innerWidth - 0.5) * 0.3;
      const robotLookY = (e.clientY / window.innerHeight - 0.5) * 0.3;

      splineApp.setLookAt(0, {
        x: robotLookX,
        y: robotLookY,
        z: 0,
        lerp: 0.1, // Adjust this for smoother movement
      });
    }

    rafRef.current = requestAnimationFrame(updateSplinePosition);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      lastMouseEvent.current = e;
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateSplinePosition);
      }
    },
    [updateSplinePosition]
  );

  // Setup mouse tracking
  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mouseenter", handleMouseEnter);
      section.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (section) {
        section.removeEventListener("mouseenter", handleMouseEnter);
        section.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [handleMouseEnter, handleMouseLeave]);

  // Setup mouse movement tracking
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center cursor-none bg-black"
    >
      {isInsideHero && <SplashCursor />}

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <HeroContent />

          <div className="flex-1 h-[600px] w-full relative cursor-none">
            <SplineScene
              ref={splineRef}
              scene="https://prod.spline.design/m-MoSEqFYUyF9nxz/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      <BackgroundDecorations />
    </section>
  );
}
