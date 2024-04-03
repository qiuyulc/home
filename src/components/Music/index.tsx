import styles from "./index.module.less";
import { getMusic } from "../../api/index";
import { useEffect, useMemo } from "react";
import useMusicReducer from "./useMusicReducer";
export const MusicCom = () => {
  const { state, initMusicList, handleDisplay } = useMusicReducer();
  const { music_list, display } = state;
  useEffect(() => {
    getMusic().then((res) => {
      initMusicList(res);
    });
  }, [initMusicList]);

  const musicListCom = useMemo(() => {
    return music_list.map((u, i) => {
      return (
        <div key={i} className={styles.list_item}>
          <div
            className={styles.music_img_pic}
            style={{
              background: `url(${u.pic}) no-repeat center center/100%`,
            }}
          ></div>
          <div className={styles.music_name}>{u.title}</div>
        </div>
      );
    });
  }, [music_list]);

  const top = useMemo(() => {
    return display ? 2 : -30;
  }, [display]);

  return (
    <div
      className={`${styles.music_com} ${
        display ? "background_b_no_hover" : ""
      }`}
    >
      <div className={`${styles.music_top}`}>
        <div
          className={styles.music_list}
          style={{ display: display ? "block" : "none" }}
        >
          {musicListCom}
        </div>
      </div>
      <div
        className={`${styles.music_bom} ${
          !display ? "background_b_no_hover" : ""
        }`}
      >
        <div className={styles.img}>
          <div
            className={`${styles.img_icon} iconfont icon-yinleguangpan`}
            style={{ top: top }}
          ></div>
        </div>
        <div className={styles.name}>如果让我遇见你...</div>
        <div className={styles.switch}>
          <i className={`${styles.icon} iconfont icon-arrow-`}></i>
          <i
            className={`${styles.icon} iconfont icon-gedan`}
            onClick={() => handleDisplay(!display)}
          ></i>
        </div>
      </div>
    </div>
  );
};
