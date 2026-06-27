"use client";

import React from "react";

interface MagneticProps {
  children: React.ReactElement;
  range?: number;
  strength?: number;
}

export function Magnetic({ children }: MagneticProps) {
  return children;
}
