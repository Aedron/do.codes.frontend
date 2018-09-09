
import axios from 'axios';


const DOMAIN = 'http://127.0.0.1:3000';


function formatURL(path) {
  return `${DOMAIN}${path}`;
}

function httpWrapper(p) {
  return new Promise((resolve, reject) => {
      p.then((response) => {
          const { data: { code, data } } = response;
          if (code !== 0) {
              const e = Error(`HTTP response error: ${code}`);
              return reject(e);
          }
          return resolve(data);
      }).catch(reject)
  });
}

function getPosts() {
  return httpWrapper(
      axios.get(formatURL(`/api/posts`))
  );
}


export {
  getPosts
}
