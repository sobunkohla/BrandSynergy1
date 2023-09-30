"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("d73c1419-0323-4c1d-b588-8f8d7abf12fa");
  }, []);

  return null;
};