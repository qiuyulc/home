import AxiosRequest from "../utils/request";

export const getMusicTitle = async () => {
  return AxiosRequest({
    url: "https://v1.hitokoto.cn/",
  });
};
