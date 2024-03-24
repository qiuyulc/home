import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper/modules";
import { swiperData, SwiperDataProps } from "../../../assets/data";
import "swiper/css";
import "swiper/css/pagination";
import { useHandleSwiper } from "./useHandleSwiper";
import styles from "./index.module.less";
import { ModaleCom, ModaleProps } from "../index";
import { useState } from "react";
import { Resume, Wallpaper } from "./tools";

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
  const [rest, setRest] = useState<{ key: string | undefined }>({
    key: "Resume",
  });
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
    if (data.open_key) {
      setRest({ key: data.open_key });
    }
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
        modules={[Pagination, Mousewheel]}
        pagination={pagination}
        spaceBetween={50}
        slidesPerView={1}
        mousewheel={true}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
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
        {rest.key === "resume" ? <Resume /> : ""}
        {rest.key === "wallpaper" ? <Wallpaper /> : ""}
      </ModaleCom>
    </>
  );
};
