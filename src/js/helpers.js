// contains functions that we use over and over in project

import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const result = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await result.json();

    if (!result.ok) throw new Error(`${data.message}`);
    return data;
  } catch (err) {
    throw err;
  }
};
