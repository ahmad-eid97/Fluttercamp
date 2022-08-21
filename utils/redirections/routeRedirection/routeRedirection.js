export default function routeRedirection (req, resolvedUrl) {
  const requireAuth = ['/dsfd'];
  const requireNoAuth = ['/login', '/signup']

  if (requireAuth.includes(resolvedUrl)) {
    return {
      redirect: {
        destination: '/'
      }
    }
  }
}