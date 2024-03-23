import { ReactNode, useEffect, useState, CSSProperties } from "react";
import { createPortal } from "react-dom";
import styles from "./index.module.less";

export interface ModaleProps {
  open: boolean;
  title?: string;
  onClose?: () => void;
  children?: ReactNode;
  modalStyle?: CSSProperties;
}

export const ModaleCom = (props: ModaleProps) => {
  const { open, title, onClose, children, modalStyle } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(open);
    }
  }, [open]);

  const handleClose = () => {
    onClose?.();
  };

  const handleAnimationEnd = () => {
    if (!open) {
      setVisible(false);
      handleClose();
    }
  };
  return visible
    ? createPortal(
        <div className={`${styles.modale_com}`}>
          <div
            onAnimationEnd={handleAnimationEnd}
            style={{ position: "absolute", width: "100%", height: "100%" }}
            className={`animate__animated ${
              open ? " animate__backInLeft" : "animate__backOutRight"
            }`}
          >
            <div
              style={{ ...modalStyle }}
              className={`${styles.modale} background_b`}
            >
              <div className={styles.modale_top}>
                <h3 className={styles.modale_title}>{title || "弹窗标题"}</h3>
                <span
                  onClick={handleClose}
                  className={`iconfont icon-guanbi ${styles.icon}`}
                ></span>
              </div>
              <div
                className={styles.modale_bom}
                style={{ height: "calc(100% - 50px)" }}
              >
                <div className={styles.modale_ov}>{children || ""}</div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    : "";
};
