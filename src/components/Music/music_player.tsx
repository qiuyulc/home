import styles from "./index.module.less";
import { useEffect, useState, useMemo } from "react";
import type { Play, Music } from "./useMusicReducer";

interface MusicPlayerProps {
  play: Play;
  audio: HTMLAudioElement | undefined;
  current_music: Music["current_music"];
  music_list: Music["music_list"];
  handlePreviousSong: () => void;
  handlePopPeople: () => void;
  handleCurrentPlay:(data:Play)=>void
}

function convertDecimalToTime(totalSeconds: number) {
  if (totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return {
      hours: hours > 0 ? (hours < 10 ? "0" + hours : hours) : 0,
      minutes: minutes > 0 ? (minutes < 10 ? "0" + minutes : minutes) : 0,
      seconds: seconds > 0 ? (seconds < 10 ? "0" + seconds : seconds) : 0,
    };
  } else {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }
}

const CountdownTimer = (props: {
  audio: MusicPlayerProps["audio"];
  play: Play;
  url: string;
}) => {
  const { audio, play, url } = props;
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    let timer: number = 0;
    if (audio) {
      timer = setInterval(() => {
        if (!play) {
          clearInterval(timer);
        }
        setTimeRemaining(() => {
          const duration = audio?.duration;
          const createTime = audio?.currentTime;
          if (duration - createTime < 1) {
            clearInterval(timer);
            return 0;
          } else {
            return duration - createTime;
          }
        });
      }, 1000); // 每秒减少1秒
    }

    return () => clearInterval(timer);
  }, [audio, play, url]);

  const date = convertDecimalToTime(timeRemaining);

  return (
    <>
      {date.hours ? (
        <>
          <span className={styles.music_h}>{date.hours}</span>
          <span className={styles.suffix}>h</span>
        </>
      ) : (
        ""
      )}
      {date.minutes ? (
        <>
          <span className={styles.music_h}>{date.minutes}</span>
          <span className={styles.suffix}>m</span>
        </>
      ) : (
        ""
      )}

      <>
        <span className={styles.music_h}>{date.seconds}</span>
        <span className={styles.suffix}>s</span>
      </>
    </>
  );
};

const MusicPlayer = (props: MusicPlayerProps) => {
  const {
    current_music,
    music_list,
    play,
    audio,
    handlePreviousSong,
    handlePopPeople,
    handleCurrentPlay
  } = props;
  const { url } = current_music || { url: "" };
  //   const audioContext = new AudioContext();
  const [bar, setBar] = useState(50);
  const getTime = useMemo(() => {
    if (audio) {
      return (
        <CountdownTimer
          url={current_music?.url || ""}
          audio={audio}
          play={play}
        />
      );
    } else {
      return "";
    }
  }, [audio]);
  const getNumber = useMemo(() => {
    const index = music_list.findIndex((u) => u.title === current_music?.title);
    if (index) {
      return index + 1;
    } else {
      return 1;
    }
  }, [url]);

  useEffect(() => {
    if (audio) {
      const currentVolume = audio.volume;
      console.log(currentVolume);
    }
  }, [audio]);

  //   useEffect(() => {
  //     if (url) {
  //       fetch(url)
  //         .then((response) => response.arrayBuffer())
  //         .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
  //         .then((decodedData) => {
  //         //   const sampleRate = decodedData.sampleRate;
  //         //   const numberOfChannels = decodedData.numberOfChannels;
  //         //   const duration = decodedData.duration;

  //         //   console.log("音频采样率：" + sampleRate + " Hz");
  //         //   console.log("音频通道数：" + numberOfChannels);
  //         //   console.log("音频时长：" + duration + " 秒");
  //         //   console.log("注意：Web Audio API 不直接提供原始音频的比特深度信息");
  //         })
  //         .catch((error) => {
  //           console.error("音频数据解码失败：", error);
  //         });
  //     }
  //   }, [url]);

  const reduceVolume = () => {
    if (audio) {
      audio.volume -= 0.1;
      setBar((pre) => {
        if (pre === 0) {
          return 0;
        }
        return (pre -= 10);
      });
    }
  };

  const increaseVolume = () => {
    if (audio) {
      audio.volume += 0.1;
      setBar((pre) => {
        if (pre === 1) {
          return 1;
        }
        return (pre += 10);
      });
    }
  };
  const buttonLoading = useMemo(() => {
    let icon = "icon-jiazai";
    if (play === "loading") {
      icon = "rotate-animation icon-jiazai";
    } else {
      play ? (icon = styles.btn_play) : (icon = "icon-bofang");
    }

    return (
      <span
        className={`${styles.icon} iconfont ${icon}`}
        onClick={() => {
          if (!current_music) {
            console.log('选择一首歌吧')
            // message({ text: "选择一首歌吧！" });
            return;
          }
          handleCurrentPlay(!play);
        }}
      ></span>
    );
  }, [play, handleCurrentPlay, current_music]);

  return (
    <div className={styles.music_player}>
      <div className={styles.music_player_top}>
        <div className={styles.music_details}>
          <div className={styles.music_details_top}>
            <div>
              <span className={styles.music_user}></span>
              <span className={styles.music_play_state}>
                {play ? "PLAY" : "PAUSE"}
              </span>
            </div>
            <div>
              <span className={styles.music_lb}>
                {getNumber + "/" + music_list.length}
              </span>
              <span className={styles.music_q}></span>
            </div>
          </div>
          <div className={styles.music_details_content}>{getTime}</div>
          <div className={styles.music_details_btm}>
            <div className={styles.music_channel}>44.1kHz · 26bit</div>
            <div className={styles.state_of_charge}></div>
          </div>
        </div>
        <div className={styles.music_name}>
          {current_music?.title}_{current_music?.author}
        </div>
        <div className={styles.volume_box}>
          <div className={styles.volume_left} onClick={reduceVolume}></div>
          <div className={styles.volume}>
            <div className={styles.volume_dividing_line}>
              {Array.from({ length: 100 }).map((_, index) => {
                return <span key={index} className={styles.line}></span>;
              })}
            </div>
            <div style={{ left: `${bar}%` }} className={styles.volume_bar}>
              <span></span>
            </div>
          </div>
          <div className={styles.volume_right} onClick={increaseVolume}></div>
        </div>
      </div>
      <div className={styles.music_player_btm}>
        <div className={styles.music_btn_left} onClick={handlePreviousSong}></div>
        <div className={styles.music_btn_center}>
            {
                buttonLoading
            }
        </div>
        <div className={styles.music_btn_right} onClick={handlePopPeople}></div>
      </div>
    </div>
  );
};

export default MusicPlayer;
