import config from "./apiconfig";

const { get, post, del } = config;

export default {
  getData(data) {
    const url = `/aa/bb/cc`;
    return post({ url, data });
  },
};
