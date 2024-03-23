import { ComponentProps, useEffect, useState } from "react";
import styles from "./index.module.less";
import { getMusicTitle } from "../../api/index";

interface StateProps {
  hitokoto: string;
  from: string;
}

export const TextCom = ({ className }: ComponentProps<"div">) => {
  const [state, setState] = useState<StateProps>();
  useEffect(() => {
    getMusicTitle().then((res: StateProps) => {
      setState(res);
    });
  }, []);
  return (
    <div className={`${styles.music_com} ${className}  background_b`}>
      <span className={styles.music_text}>
        {state?.hitokoto || "我想这里撤回了一条消息！"}
      </span>
      <span className={styles.music_title}>-「 {state?.from || "秋雨"} 」</span>
    </div>
  );
};
