import { useDeferredValue, useEffect, useState } from "react";

export default function useScrollPosition() {
  const [position, setPosition] = useState(getScrollPos());

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const event = () => {
      setPosition(getScrollPos());
    };
    event();
    window.addEventListener("scroll", event);
    return () => window.removeEventListener("scroll", event);
  }, []);

  return useDeferredValue(position);
}

function getScrollPos() {
  return typeof window === "undefined" ? 0 : window.scrollY;
}
