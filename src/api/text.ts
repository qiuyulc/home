import AxiosRequest from "../utils/request";

export const getMusicTitle = async () => {
  return AxiosRequest({
    url: "https://api.btstu.cn/yan/api.php?charset=utf-8&encode=json",
  });
};
