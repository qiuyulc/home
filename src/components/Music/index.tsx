import styles from "./index.module.less";
import MusicItem, { AudioRef } from "./music";
import { ModaleCom, ModaleProps } from "../index";
import { getMusic, MusicProps } from "../../api/index";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useMusicReducer from "./useMusicReducer";
import { message } from "../ui";
import MusicPlayer from './music_player'
export const MusicCom = () => {
  const music = useRef<AudioRef>(null);
  const {
    state,
    initMusicList,
    handleDisplay,
    handleCurrentMusic,
    handleCurrentPlay,
  } = useMusicReducer();
  const { music_list, display, current_music, play } = state;
  const [modale, setModale] = useState<ModaleProps>({
    title: " ",
    open: false,
  });

  useEffect(() => {
    getMusic().then((res) => {
      initMusicList(res);
    });
  }, [initMusicList]);

  const handleClick = useCallback(
    (data: MusicProps) => {
      handleCurrentPlay("loading");
      handleCurrentMusic(data);
    },
    [handleCurrentMusic, handleCurrentPlay]
  );

  const handleEnded = useCallback(() => {
    handleCurrentPlay("loading");
    const index = music_list.findIndex((u) => u.title === current_music?.title);
    if (index + 1 === music_list.length) {
      handleCurrentMusic(music_list[0]);
    } else {
      handleCurrentMusic(music_list[index + 1]);
    }
  }, [current_music?.title, handleCurrentMusic, handleCurrentPlay, music_list]);

  const onClose = () => {
    console.log(222)
    setModale({ ...modale, open: false });
  };

  useEffect(() => {
    if (music.current && current_music) {
      music.current?.handlePlay();
    }
  }, [current_music, music]);

  const musicListCom = useMemo(() => {
    return music_list.map((u, i) => {
      return (
        <div
          key={i}
          className={`${styles.list_item} ${
            current_music && u.title === current_music.title ? styles.hot : ""
          }`}
          onClick={() => handleClick(u)}
        >
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
  }, [music_list, current_music, handleClick]);

  const buttonLoading = useMemo(() => {
    let icon = "icon-jiazai";
    if (play === "loading") {
      icon = "rotate-animation icon-jiazai";
    } else {
      play ? (icon = "icon-zanting") : (icon = "icon-arrow-");
    }

    return (
      <i
        className={`${styles.icon} iconfont ${icon}`}
        onClick={() => {
          if (!current_music) {
            message({ text: "选择一首歌吧！" });
            return;
          }
          handleCurrentPlay(!play);
        }}
      ></i>
    );
  }, [play, handleCurrentPlay, current_music]);

  const music_player = useMemo(() => {
    return (
      <MusicItem
        handleEnded={handleEnded}
        handleCurrentPlay={handleCurrentPlay}
        play={play}
        url={current_music?.url}
        ref={music}
      ></MusicItem>
    );
  }, [handleEnded, handleCurrentPlay, play, current_music?.url]);

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
            className={`${styles.img_icon} ${
              play ? "rotate-animation" : ""
            } iconfont icon-yinleguangpan`}
            style={{
              top: top,
              background: `rgba(0, 0, 0, 0.4) url(${current_music?.pic}) no-repeat center center/100%`,
            }}
          ></div>
        </div>
        <div className={styles.name}>
          {current_music?.title || "我好像在哪见过你"}
        </div>
        <div className={styles.switch}>
          {buttonLoading}
          <i
            className={`${styles.icon} iconfont icon-fangda`}
            onClick={() => {
              setModale({...modale, open: true});
            }}
          ></i>
          <i
            className={`${styles.icon} iconfont icon-gedan`}
            onClick={() => handleDisplay(!display)}
          ></i>
        </div>
      </div>
      {music_player}
      <ModaleCom
        {...{ ...modale,className:styles.music_enlarged_box, turnOffAnimation:true,modalStyle: { height: "100%",width:'100%' }, onClose: onClose }}
      >
        <div className={styles.music_enlarged}>
          <MusicPlayer/>
        </div>
      </ModaleCom>
    </div>
  );
};
