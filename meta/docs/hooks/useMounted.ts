import { useEffect, useState } from "react";

export default function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true);
    }
  }, []);

  return mounted;
}
