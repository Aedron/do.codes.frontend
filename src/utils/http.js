
import axios from 'axios';


const DOMAIN = 'http://127.0.0.1:8088';


function formatURL(path) {
  return `${DOMAIN}${path}`;
}

function getPosts() {
  return axios.get(formatURL(`/api/posts`));
}


export {
  getPosts
}
