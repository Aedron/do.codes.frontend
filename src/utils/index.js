import * as hoc from "./hoc";
import * as http from "./http";

async function promiseWrapper(p) {
  let error = null;
  let data = null;
  let func = () => void 0;

  if (typeof p === "function") {
    func = p;
  } else if (p instanceof Promise) {
    func = () =>
      new Promise((resolve, reject) => {
        p.then(resolve).catch(reject);
      });
  }

  try {
    data = await func();
  } catch (e) {
    error = e;
  }
  return [error, data];
}

function sliceText(text, max, sunfix = "...") {
  if (text.length < max) return text;
  return text.slice(0, max) + sunfix;
}

function formatDate(date) {
  const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${monthNames[monthIndex]} ${day}, ${year}`;
}

function noop() {}

export { hoc, http, promiseWrapper, sliceText, formatDate, noop };
