export default function getImageUrl(src: string | null | undefined) {
  const baseUrl = process.env.NEXT_PUBLIC_ASSETS_BASE_URL;
  if (!baseUrl) {
    if (src === null || src === undefined) return ''
  } else {
    if (src === null || src === undefined) return baseUrl;
  }

  if (src.startsWith('https://') || src.startsWith('http://')) return src;
  else return baseUrl + '/' + src
}