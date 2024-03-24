import { useEffect, useState } from "react";
import styles from "./index.module.less";
import { getWallpaper, WallpaperProps, ResultItem } from "../../../api";
// 个人信息
export const Resume = () => {
  return (
    <div className={styles.personal}>
      <p>
        <span>姓名：</span>
        <span>李秋雨</span>
      </p>
      <p>
        <span>性别：</span>
        <span>男</span>
      </p>
      <p className={styles.col}>
        <div>
          <span>职业：</span>
          <span>Web前端工程师</span>
        </div>
        <div>
          <span>从业时间：</span>
          <span>近四年时间</span>
        </div>
      </p>
      <p className={styles.col}>
        <div>
          <span>工作地点：</span>
          <span>上海</span>
        </div>
        <div>
          <span>联系方式：</span>
          <span>718647063@qq.com</span>
        </div>
      </p>
      <p>
        <span>技术栈：</span>
        <span>
          主要技术栈是React、Vue、微信小程序等。玩过three.js、D3.js。不过最近在学习electron等桌面端开发技能。
        </span>
      </p>
      <p>
        <span>项目：</span>
        <span>
          最近的主要项目是可视化低代码平台、税收一体化管理平台，当然也有一些比较大众的项目。比如管理系统、业务系统等等，毕竟要吃饭。。。
        </span>
      </p>
      <p>
        <span>三方库：</span>
        <span>
          Echarts、DataV等等(工作过得人你懂的，项目中用到啥学啥，真让我列出来有点困难。不过正在改正这个习惯。)
        </span>
      </p>

      <p>
        <span>贡献过得项目：</span>
        <span>
          <a href="https://narchart.github.io/" target="_blank">
            Narrative Chart
          </a>
        </span>
      </p>
      <p>
        <span>个人github：</span>
        <span>
          <a href="https://github.com/MrLishizhen" target="_blank">
            之前的
          </a>
          <a href="https://github.com/qiuyulc" target="_blank">
            现在的
          </a>
        </span>
      </p>
      <p>
        <span>个人介绍：</span>
        <span>
          面试困难症(会但是不会说)、完美主义者、效果追求者(做前端不就是为了写效果拉满的界面吗！)
        </span>
      </p>
    </div>
  );
};

// 高清壁纸
export const Wallpaper = () => {
  const [imags, setImags] = useState<WallpaperProps["result"]>([]);
  useEffect(() => {
    getWallpaper().then((res) => {
      if (res.code === 200) {
        setImags(res.result);
      } else {
        setImags([]);
      }
    });
  }, []);

  const downloadImage = (data: { title: string; url: string }) => {
    const { title, url } = data;
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${title}.jpg`;
        link.click();
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <div className={styles.wallpaper}>
      {imags.map((u: ResultItem) => {
        return (
          <div key={u.date} className={styles.wallpaper_item}>
            <div
              className={styles.img}
              style={{
                background: `content-box url(${u.url}) no-repeat center/cover`,
              }}
            >
              <span
                onClick={() => downloadImage({ title: u.title, url: u.url })}
                className={`iconfont icon-xiazai ${styles.icon}`}
              ></span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
