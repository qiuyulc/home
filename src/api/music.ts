import AxiosRequest from "../utils/request";

export interface MusicProps {
  author: string;
  lrc: string;
  pic: string;
  title: string;
  url: string;
}

export const getMusic = () => {
  return AxiosRequest({
    url: "https://api-meting.imsyy.top/api?server=netease&type=playlist&id=7452421335",
  });
};
