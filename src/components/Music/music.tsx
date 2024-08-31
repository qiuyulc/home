import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Play } from "./useMusicReducer";
type MusicItemProps = {
  url?: string;
  handleCurrentPlay: (data: Play) => void;
  play: Play;
  handleEnded: () => void;
};

export type AudioRef = {
  audio: HTMLAudioElement;
  handlePlay: () => void; // 修正了拼写错误
  handlePause: () => void;
};

const MusicItem = forwardRef((props: MusicItemProps, ref) => {
  const { url, handleCurrentPlay, play, handleEnded } = props;
  const audio = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    // 将函数定义移动到 useImperativeHandle 调用之前
    audio.current?.play();
  };

  const handlePause = () => {
    audio.current?.pause();
  };
  useImperativeHandle(ref, () => {
    return {
      handlePlay,
      handlePause,
      audio: audio.current,
    };
  });

  useEffect(() => {
    if (audio.current) {
      audio.current.volume = 0.5;
    }

    if (play === true) {
      handlePlay();
    } else if (play === false) {
      handlePause();
    }
  }, [play]);

  return (
    <audio
      id="myAudio"
      onEnded={() => {
        // console.log('播放结束')
        handleEnded();
      }}
      ref={audio}
      onCanPlay={() => {
        handleCurrentPlay(true);
      }}
      src={url}
    ></audio>
  );
});
export default MusicItem;
