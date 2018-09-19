import qiniu from "qiniu-js";
import { noop } from "./";
import { getUploadToken } from "./http";

// async function fileToBlob(file) {
//   const reader = new FileReader();
//   reader.addEventListener('load', readFile);
//   reader.readAsBlob(file);
// }

async function upload(file, filename, token, subscribe = {}) {
  if (!token) {
    const [error, data] = await getUploadToken();
    if (error) throw error;
    else token = data;
  }
  const observable = qiniu.upload(file, filename, token);

  return observable.subscribe({
    ...subscribe,
    next: noop,
    error: noop,
    complete: noop
  });
  // return subscription.unsubscribe();
}

export { upload };
