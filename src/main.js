import { getImges } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
export const gallery = document.querySelector('.gallery-list');
const beforeLoadingEl = document.querySelector('.loader');
const loadingBtn = document.querySelector('.load-btn');
let page = 1;
const lightbox = new SimpleLightbox('.gallery-link');
let userSearch = '';

form.addEventListener('submit', handleSubmit);
loadingBtn.addEventListener('click', handleClick);

async function handleSubmit(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  beforeLoadingEl.classList.remove('isactive');
  loadingBtn.classList.remove('isactive');
  userSearch = event.currentTarget.search.value.trim();

  try {
    const data = await getImges(userSearch, page);

    if (!data.hits.length) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      loadingBtn.classList.remove('isactive');
    } else {
      gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
      lightbox.refresh();
      form.reset();
      beforeLoadingEl.classList.remove('isactive');
      loadingBtn.classList.add('isactive');
    }
  } catch {
    console.log(error);
  }
}

async function handleClick(event) {
  event.preventDefault();
  loadingBtn.classList.remove('isactive');
  page += 1;

  try {
    const data = await getImges(userSearch, page);
    gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));

    if (page < data.totalHits / page) {
      loadingBtn.classList.add('isactive');
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    const card = document.querySelector('.gallery');
    const cardHeight = card.getBoundingClientRect().height;

    window.scrollBy({
      left: 0,
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch {
    console.log(error);
  }
}
