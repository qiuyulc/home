import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import {Play} from './useMusicReducer'
type MusicItemProps = {
  url?: string;
  handleCurrentPlay: (data: Play) => void;
  play:Play
};

export type AudioRef = {
  handlePlay: () => void; // 修正了拼写错误
  handlePause: () => void;

};

const MusicItem = forwardRef((props: MusicItemProps, ref) => {
  const { url ,handleCurrentPlay,play} = props;
  const audio = useRef<HTMLAudioElement>(null);

  const handlePlay = () => { // 将函数定义移动到 useImperativeHandle 调用之前
    audio.current?.play();
  };

  const handlePause = () => {
    audio.current?.pause();
  };
  useImperativeHandle(ref, () => {
    return {
      handlePlay,
      handlePause
    };
  });

  useEffect(()=>{
    if(play===true){
      handlePlay()
    }else if(play===false){
      handlePause()
    }
  },[play])

  return <audio ref={audio} onCanPlay={()=>{
    handleCurrentPlay(true)
  }} src={url}></audio>;
});
export default MusicItem;