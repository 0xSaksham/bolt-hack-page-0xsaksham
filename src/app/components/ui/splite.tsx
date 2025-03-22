"use client";

import { Suspense, lazy, forwardRef } from "react";
const Spline = lazy(() => import("@splinetool/react-spline/next"));

interface SplineSceneProps {
  scene?: string;
  className?: string;
}

export const SplineScene = forwardRef<any, SplineSceneProps>(
  function SplineScene(
    {
      scene = "https://prod.spline.design/m-MoSEqFYUyF9nxz/scene.splinecode",
      className,
    },
    ref
  ) {
    return (
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
          </div>
        }
      >
        <Spline ref={ref} scene={scene} className={className} />
      </Suspense>
    );
  }
);
