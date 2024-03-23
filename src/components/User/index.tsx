import styles from "./index.module.less";
import userImg from "./user.jpg";
export const UserCom = () => {
  return (
    <div className={`${styles.user_com} background_b`}>
      <img src={userImg} width={70} height={70} alt="头像" />
      <span>要优秀啊，不然怎么遇见优秀的人！</span>
    </div>
  );
};
