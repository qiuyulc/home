export interface SwiperDataProps {
  name: string;
  icon: string;
  url: string;
  open: boolean;
}

export const swiperData: SwiperDataProps[] = [
  {
    name: "个人简介",
    icon: "gerenziliao",
    url: "",
    open: false,
  },
  {
    name: "github",
    icon: "github",
    open: true,
    url: "https://github.com/qiuyulc/home",
  },
  {
    name: "掘金",
    icon: "juejin",
    open: true,
    url: "https://juejin.cn/user/720895618858541/posts",
  },
  {
    name: "MyWeek",
    icon: "MyWeek",
    open: true,
    url: "http://47.94.12.253:3308/task-hook/home",
  },
  {
    name: "博客",
    icon: "bokeyuan",
    open: true,
    url: "https://qiuyulc.github.io/blog/",
  },
  {
    name: "electron",
    icon: "electron",
    open: true,
    url: "https://github.com/MrLishizhen/electron",
  },
  {
    name: "react模板",
    icon: "react",
    open: true,
    url: "https://github.com/qiuyulc/react-vite-template",
  },
];
