import { useCallback, useReducer } from "react";
import { MusicProps } from "../../api/index";

export type Play = boolean | "loading";

type Music = {
  music_list: MusicProps[];
  display: boolean;
  current_music: MusicProps | null;
  play: Play;
};

type ACTIONTYPE =
  | { type: "init_music_list"; payload: MusicProps[] }
  | { type: "modify_display"; payload: boolean }
  | { type: "current_music"; payload: MusicProps }
  | {type:'current_music_play',payload:Play};

const initMusic: Music = {
  music_list: [],
  display: false,
  current_music: null,
  play: false,
};

const reducer = (state: Music, action: ACTIONTYPE) => {
  switch (action.type) {
    case "init_music_list": {
      return {
        ...state,
        music_list: action.payload,
      };
    }
    case "modify_display": {
      return {
        ...state,
        display: action.payload,
      };
    }
    case "current_music": {
      return {
        ...state,
        current_music: action.payload,
      };
    }
    case "current_music_play":{
      return {
        ...state,
        play:action.payload
      }
    }
  }
  throw Error("Unknown action: ");
};

const useMusicReducer = () => {
  const [state, dispatch] = useReducer(reducer, initMusic);

  const initMusicList = useCallback((data: MusicProps[]) => {
    dispatch({ type: "init_music_list", payload: data });
  }, []);

  const handleDisplay = useCallback((data: boolean) => {
    dispatch({ type: "modify_display", payload: data });
  }, []);

  const handleCurrentMusic = useCallback((data: MusicProps) => {
    dispatch({ type: "current_music", payload: data });
  }, []);

  const handleCurrentPlay = useCallback((data:Play)=>{
    dispatch({type:'current_music_play',payload:data})
  },[])
  return {
    state,
    initMusicList,
    handleDisplay,
    handleCurrentMusic,
    handleCurrentPlay
  };
};

export default useMusicReducer;
