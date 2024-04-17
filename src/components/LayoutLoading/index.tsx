import {
  ComponentProps,
  forwardRef,
  useImperativeHandle,
  useState,
  ForwardedRef,
} from "react";
import styles from "./index.module.less";
// import loading from "../../assets/images/loading.gif";

export type RefProps = { handleClose: () => void };

export const LayoutLoading = forwardRef(
  (
    { className, ...props }: ComponentProps<"div">,
    ref: ForwardedRef<RefProps>
  ) => {
    const [top, setTop] = useState<string | number>(0);
    const handleClose = () => {
      setTop("-150%");
    };

    useImperativeHandle(ref, () => {
      return { handleClose };
    });
    return (
      <div
        className={`${styles.layoutLoading} ${className}`}
        style={{ transform: `translateY(${top})` }}
        {...props}
      >
        <div className={styles.loading_box}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`${styles.loading_text}`}>加载中....</div>
        {/* <div
          className={`${styles.loading_text} ${styles.loading_name_text}`}
        >
          秋水先生的个人主页
        </div> */}
      </div>
    );
  }
);
