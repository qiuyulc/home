import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { swiperData, SwiperDataProps } from "../../../assets/data";
import "swiper/css";
import "swiper/css/pagination";
import { useHandleSwiper } from "./useHandleSwiper";
import styles from "./index.module.less";
import { ModaleCom, ModaleProps } from "../index";
import { useState } from "react";

const SwiperItem = (
  props: SwiperDataProps & { onChange: (data: SwiperDataProps) => void }
) => {
  const { name, url, open, icon, onChange } = props;

  const handleOpen = () => {
    if (open) {
      window.open(url);
    } else {
      onChange?.(props);
    }
  };

  return (
    <div onClick={handleOpen} className={`${styles.swiper_item} background_b`}>
      <div className={styles.item}>
        <i className={`iconfont icon-${icon}`}></i>
        <span className={styles.name}>{name}</span>
      </div>
    </div>
  );
};

export const SwiperCom = () => {
  const data = useHandleSwiper(swiperData);
  const [modale, setModale] = useState<ModaleProps>({
    title: "弹窗",
    open: false,
  });

  const onClose = () => {
    setModale({ ...modale, open: false });
  };

  const pagination = {
    clickable: true,
    renderBullet: function (_: number, className: string) {
      return `<span class="${className}" ></span>`;
    },
  };

  const swiperItemChange = (data: SwiperDataProps) => {
    setModale({ ...modale, title: data.name, open: true });
  };
  return (
    <>
      <Swiper
        style={{
          height: "100%",
          margin: -6,
          padding: "6px",
          boxSizing: "border-box",
        }}
        modules={[Pagination]}
        pagination={pagination}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {data.map((u: SwiperDataProps[], index) => {
          return (
            <SwiperSlide key={index}>
              <div className={styles.swiper_item_box}>
                {u.map((v: SwiperDataProps, i) => {
                  return (
                    <SwiperItem
                      onChange={swiperItemChange}
                      key={i}
                      {...v}
                    ></SwiperItem>
                  );
                })}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <ModaleCom
        {...{ ...modale, modalStyle: { height: "76%" }, onClose: onClose }}
      >
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
      </ModaleCom>
    </>
  );
};
