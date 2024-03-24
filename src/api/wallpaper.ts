import AxiosRequest from "../utils/request";

export interface WallpaperProps {
  code: number;
  result: {
    copyright: string;
    copyrightlink: string;
    date: string;
    title: string;
    url: string;
  }[];
  msg: string;
}

// 获取 'result' 的类型
type ResultType<T> = T extends { result: infer R } ? R : never;

// 使用 'ResultType' 获取类型
type Result = ResultType<WallpaperProps>;

// 打印结果类型
export type ResultItem = Result[0]; // 单个结果项的类型

export const getWallpaper = async () => {
  return AxiosRequest({
    url: "https://api.oioweb.cn/api/bing",
  });
};
