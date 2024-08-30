import styles from "./index.module.less";
const MusicPlayer = () => {
  return (
    <div className={styles.music_player}>
      <div className={styles.music_player_top}>
        <div className={styles.music_details}>
            <div className={styles.music_details_top}>
                <div>
                    <span className={styles.music_user}></span>
                    <span className={styles.music_play_state}>
                        PLAY
                    </span>
                </div>
                <div>
                    <span className={styles.music_lb}>3/56</span>
                    <span className={styles.music_q}></span>
                </div>
            </div>
            <div className={styles.music_details_content}>
                <span className={styles.music_h}>3</span>
                <span className={styles.suffix}>h</span>
                <span className={styles.music_h}>3</span>
                <span className={styles.suffix}>m</span>
                <span className={styles.music_h}>29</span>
                <span className={styles.suffix}>s</span>
            </div>
            <div className={styles.music_details_btm}>
                <div className={styles.music_channel}>
                    44.1kHz · 26bit
                </div>
                <div className={styles.state_of_charge}></div>
            </div>
        </div>
        <div className={styles.music_name}>讨厌红楼梦_陶喆.mp3</div>
        <div className={styles.volume_box}>
            <div className={styles.volume_left}></div>
            <div className={styles.volume}>
                <div className={styles.volume_dividing_line}>
                    {
                        Array.from({length:100}).map((_,index)=>{
                            return <span key={index} className={styles.line}></span>
                        })
                    }
                </div>
                <div className={styles.volume_bar}>
                    <span></span>
                </div>
            </div>
            <div className={styles.volume_right}></div>
        </div>
      </div>
      <div className={styles.music_player_btm}>
        <div className={styles.music_btn_left}></div>
        <div className={styles.music_btn_center}></div>
        <div className={styles.music_btn_right}></div>
      </div>
    </div>
  );
};

export default MusicPlayer;
