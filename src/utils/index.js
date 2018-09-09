import * as hoc from './hoc';
import * as http from './http';


async function promiseWrapper(p) {
    let error = null;
    let data = null;
    let func = () => void 0;

    if (typeof p === "function") {
        func = p;
    }
    else if (p instanceof Promise) {
        func = () => new Promise((resolve, reject) => {
            p.then(resolve).catch(reject);
        })
    }

    try {
        data = await func();
    } catch (e) {
        error = e;
    }
    return [error, data];
}


export {
    hoc,
    http,
    promiseWrapper
}
