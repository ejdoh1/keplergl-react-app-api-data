const helpers = {
  httpGet: async function (url) {
    const data = await fetch(url, {});
    return await data.json();
  },
};
export default helpers;
