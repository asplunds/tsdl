import { useMemo } from "react";
import useMounted from "./useMounted";
import { useTheme } from "nextra-theme-docs";

export default function useIsDarkTheme() {
  const isMounted = useMounted();
  const theme = useTheme();
  return useMemo(() => {
    return isMounted && theme.resolvedTheme === "dark";
  }, [theme, isMounted]);
}
