export default function imageLoader() {
  if (!document) return;

  const placeholderImage = '/imgs/placeholder-image.png';
  const allImages = document.querySelectorAll('img');

  allImages.forEach(image => {
    image.onerror = function () {
      image.src = placeholderImage;
    };
  });



  let erroredImagesObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        let Img = entry.target as HTMLImageElement;
        if (Img.complete && Img.naturalWidth <= 0 && Img.naturalHeight <= 0) Img.src = placeholderImage;
        erroredImagesObserver.unobserve(Img);
      }
    });
  });

  allImages.forEach(img => erroredImagesObserver.observe(img));
}