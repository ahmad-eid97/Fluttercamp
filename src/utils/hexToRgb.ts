export default function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? result.map(i => parseInt(i, 16).toFixed(0)).slice(1) : []
}