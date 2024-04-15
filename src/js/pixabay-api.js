import { createMarkup } from './render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import axios from 'axios';

let page = 1;

export async function getImges(userSearch = '', page) {
  const API_KEY = '43223956-11c63a864af473bf01df350b7';
  const BASE_URL = 'https://pixabay.com/api/';
  // axios.defaults.baseURL = ``;
  try {
    const { data } = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: userSearch,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: '15',
        page,
      },
    });

    return data;
  } catch (error) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
  }
}
