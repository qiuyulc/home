import { useCallback, useReducer } from "react";
import { MusicProps } from "../../api/index";

type Music = {
  music_list: MusicProps[];
  display: boolean;
};

type ACTIONTYPE =
  | { type: "init_music_list"; payload: MusicProps[] }
  | { type: "modify_display"; payload: boolean };

const initMusic: Music = {
  music_list: [],
  display: false,
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
  return {
    state,
    initMusicList,
    handleDisplay,
  };
};

export default useMusicReducer;
