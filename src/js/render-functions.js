export function createMarkup(arr) {
  return arr
    .map(
      ({
        tags,
        largeImageURL,
        webformatURL,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery"><a href="${largeImageURL}" class="gallery-link">
      <img src="${webformatURL}" alt="${tags}" title="" class="picture"/>
      </a>
      <ul class = "img-info">
      <li class = "item-info">Likes<span class = "info-value">${likes}</span></li>
      <li class = "item-info">Views<span class = "info-value">${views}</span></li>
      <li class = "item-info">Comments<span class = "info-value">${comments}</span></li>
      <li class = "item-info">Downloads<span class = "info-value">${downloads}</span></li>
      </ul>
      </li>
`
    )
    .join('');
}
