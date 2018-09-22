import * as qiniu from "qiniu-js";
import { noop } from "./";
import { getUploadToken } from "./http";

async function upload(file, filename, token, subscribe = {}) {
  if (!token) {
    const [error, data] = await getUploadToken();
    if (error) throw error;
    else token = data;
  }

  const observable = qiniu.upload(file, filename, token);

  return observable.subscribe({
    next: noop,
    error: noop,
    complete: noop,
    ...subscribe
  });
}

function getCDNLink(key) {
  return `http://pevwri600.bkt.clouddn.com/${key}`;
}

export { upload, getCDNLink };
