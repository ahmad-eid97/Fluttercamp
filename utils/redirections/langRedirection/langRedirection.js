export default function langRedirection (req, locale) {
  const currentLang = req.cookies['LaravelcampLang'];

  if (locale === currentLang) return;

  let redirectLocation = ''

  if (currentLang === 'ar') {
    redirectLocation = req.url;
  } else if (currentLang === 'en') {
    redirectLocation = '/en/' + req.url
  }

  if (redirectLocation) {
    return {
      redirect: {
        destination: redirectLocation,
        permanent: false
      }
    }
  }
}