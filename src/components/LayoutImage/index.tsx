import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./index.module.less";
import { LayoutLoading, RefProps } from "../LayoutLoading";
import { message } from "../ui";
export const LayoutImage = ({
  children,
}: {
  children?: ReactNode;
}): ReactNode => {
  const [isLoading, setIsLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const loadingRef = useRef<RefProps>(null);
  const loadImage = () => {
    if (imgRef.current) {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (isLoading) {
      if (imgRef.current) {
        imgRef.current.className = `${styles.load}`;
      }
      loadingRef.current?.handleClose();
      message({ text: "欢迎来到我的主页" });

      // setTimeout(() => {

      // }, 400);
    }
  }, [isLoading]);
  return (
    <>
      <div className={styles.layoutImage}>
        <div className={styles.image}>
          <img
            ref={imgRef}
            onLoad={loadImage}
            onError={(err)=>{
              console.log(err)
              setIsLoading(true);
            }}
            src={"https://api.btstu.cn/sjbz/api.php?lx=fengjing&format=images"}
            alt=""
          />
          <div className={styles.mask}></div>
        </div>
      </div>
      {children}
      <LayoutLoading ref={loadingRef} />
    </>
  );
};
