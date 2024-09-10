export function getRandomGradient() {
  const hue1 = Math.floor(Math.random() * 360);
  const hue2 = (hue1 + 30) % 360; // Complementary hue
  return `linear-gradient(135deg, hsl(${hue1}, 70%, 60%), hsl(${hue2}, 70%, 60%))`;
}
