/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { useTheme } from "nextra-theme-docs";
import { useMemo } from "react";
void jsx;

const Root = styled.div`
  display: inline-block;
  svg {
    height: 40px;
    width: 40px;
    display: flex;
  }
`;

function Logo() {
  const theme = useTheme();
  const color = useMemo(
    () => (theme.resolvedTheme === "dark" ? "#fff" : "#000"),
    [theme]
  );

  return (
    <Root>
      <svg viewBox="0 0 106 106" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 3H83C94.0457 3 103 11.9543 103 23V103H23C11.9543 103 3 94.0457 3 83V3Z"
          stroke={color}
          strokeWidth="5"
        />
        <path
          d="M39.6 26.28H40.6V25.28V21.64V20.64H39.6H16.72H15.72V21.64V25.28V26.28H16.72H25.2V50V51H26.2H30.12H31.12V50V26.28H39.6ZM62.2682 29.0232L63.0929 28.7327L62.915 27.8766C62.5606 26.171 61.673 24.2069 59.9668 22.6634C58.2443 21.1053 55.7576 20.04 52.3359 20.04C46.6208 20.04 41.9759 24.4136 41.9759 29.48C41.9759 31.8444 42.7862 33.8127 44.1931 35.3058C45.587 36.785 47.5144 37.7447 49.6831 38.2171L53.7231 39.0971L53.7292 39.0984C54.9902 39.3648 55.8476 39.8701 56.3834 40.4553C56.913 41.0337 57.1759 41.7401 57.1759 42.52C57.1759 43.4871 56.8097 44.3297 56.0803 44.9463C55.3377 45.5741 54.1292 46.04 52.3359 46.04C50.4389 46.04 49.0694 45.4001 48.1415 44.4763C47.2009 43.5399 46.6542 42.251 46.532 40.8717L46.4218 39.6276L45.2319 40.0073L41.4719 41.2073L40.6777 41.4608L40.7841 42.2877C41.0708 44.515 42.1069 46.8478 44.0258 48.6281C45.9578 50.4205 48.728 51.6 52.3759 51.6C58.8822 51.6 63.1759 47.2346 63.1759 42.2C63.1759 39.9839 62.4315 38.0091 61.0034 36.4496C59.5845 34.9002 57.5439 33.8171 55.0311 33.2634L55.028 33.2627L50.788 32.3427L50.7877 32.3427C49.7552 32.119 49.055 31.6911 48.6144 31.1783C48.1779 30.6703 47.9359 30.0095 47.9359 29.2C47.9359 27.2323 49.6401 25.48 52.4159 25.48C55.7616 25.48 57.1638 27.7904 57.428 29.475L57.6143 30.6626L58.7482 30.2632L62.2682 29.0232ZM44.8 57.64H43.8V58.64V87V88H44.8H54.64C58.4611 88 62.1093 86.7144 64.8094 84.1443C67.5202 81.5642 69.2 77.7611 69.2 72.88C69.2 67.9845 67.5442 64.1535 64.8561 61.5471C62.1767 58.9491 58.5463 57.64 54.72 57.64H44.8ZM91.3388 88H92.3388V87V83.32V82.32H91.3388H78.9388V58.64V57.64H77.9388H74.0188H73.0188V58.64V87V88H74.0188H91.3388ZM49.72 82.52V63.12H54.6C56.9881 63.12 59.105 63.9364 60.626 65.51C62.1457 67.0823 63.16 69.5041 63.16 72.88C63.16 76.2289 62.1302 78.6175 60.5949 80.1659C59.0554 81.7185 56.9155 82.52 54.52 82.52H49.72Z"
          fill={color}
          stroke={color}
          strokeWidth="2"
        />
      </svg>
    </Root>
  );
}

export default Logo;