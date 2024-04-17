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
  beforeLoadingEl.classList.add('isActive');
  loadingBtn.classList.remove('isActive');
  userSearch = event.currentTarget.search.value.trim();

  try {
    page = 1;
    const data = await getImges(userSearch, page);

    if (!data.hits.length) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      beforeLoadingEl.classList.remove('isActive');
    } else {
      gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
      lightbox.refresh();
      form.reset();
      beforeLoadingEl.classList.remove('isActive');
      loadingBtn.classList.add('isActive');
    }

    if (data.hits.length < 15) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
      loadingBtn.classList.remove('isActive');
    }
  } catch {
    console.log('error');
  }
}

async function handleClick(event) {
  event.preventDefault();
  loadingBtn.classList.remove('isActive');
  page += 1;

  try {
    const data = await getImges(userSearch, page);
    gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    lightbox.refresh();

    if (data.totalHits / 15 < page || data.hits.length < 15) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      loadingBtn.classList.add('isActive');
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
