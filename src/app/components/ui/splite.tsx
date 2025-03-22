"use client";

import Spline from "@splinetool/react-spline";

export function SplineScene({
  scene,
  className,
  ...props
}: {
  scene: string;
  className?: string;
}) {
  return <Spline className={className} scene={scene} {...props} />;
}
