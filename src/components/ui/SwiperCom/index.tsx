import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { swiperData, SwiperDataProps } from "../../../assets/data";
import "swiper/css";
import "swiper/css/pagination";
import { useHandleSwiper } from "./useHandleSwiper";
import styles from "./index.module.less";
import { message } from "../Message";

const SwiperItem = (props: SwiperDataProps) => {
  const { name, url, open, icon } = props;

  const handleOpen = () => {
    if (open) {
      window.open(url);
    } else {
      message({ text: "敬请期待！" });
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
  console.log(data);

  const pagination = {
    clickable: true,
    renderBullet: function (_: number, className: string) {
      return `<span class="${className}" ></span>`;
    },
  };

  return (
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
                return <SwiperItem key={i} {...v}></SwiperItem>;
              })}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
