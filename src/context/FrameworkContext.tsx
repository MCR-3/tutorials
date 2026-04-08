"use client";

import { createContext, useContext, useState } from "react";

export type Framework = "simplegrad" | "pytorch";

type FrameworkContextValue = {
  framework: Framework;
  setFramework: (f: Framework) => void;
};

const FrameworkContext = createContext<FrameworkContextValue>({
  framework: "simplegrad",
  setFramework: () => {},
});

export function FrameworkProvider({ children }: { children: React.ReactNode }) {
  const [framework, setFramework] = useState<Framework>("simplegrad");
  return (
    <FrameworkContext.Provider value={{ framework, setFramework }}>
      {children}
    </FrameworkContext.Provider>
  );
}

export function useFramework() {
  return useContext(FrameworkContext);
}
