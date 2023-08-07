const colors = [
  "#17c3b2",
  "#ffcb77",
  "#fe6d73",
  "#227c9d",
];

export function getColor(idx: number) {
  return colors[idx % (colors.length - 1)];
}
