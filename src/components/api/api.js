import axios from "axios";
const API_KEY = '35543502-65f1c05577a99d30b7ac9b3fc';
const BASE_URL = "https://pixabay.com/api/";
const fetchImages = async (query, currentPage) => {
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q:query,
        page: currentPage,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12
    })
    const images = await axios.get(`${BASE_URL}?${searchParams}`);

  return images.data;
}
export default fetchImages;