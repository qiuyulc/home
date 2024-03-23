import {
  createElement,
  ReactNode,
  CSSProperties,
  useState,
  useEffect,
} from "react";
import { createRoot, Root } from "react-dom/client";
import styles from "./index.module.less";

export const MessageCom = ({
  className,
  children,
  duration = 4000,
  style = {},
  id,
  ...props
}: MessageInFoProps) => {
  const [visible, setVisible] = useState(true);
  const { text } = props;
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false); // 隐藏组件
    }, duration);

    return () => {
      clearTimeout(timer); // 在组件卸载时清除定时器
    };
  }, [duration]);

  const handleAnimationEnd = () => {
    if (!visible) {
      destroy(id); // 删除组件
    }
  };

  return (
    <div
      key={id}
      style={{ ...style }}
      onAnimationEnd={handleAnimationEnd}
      className={`${
        styles.message
      } ${className} animate__animated background_b transparency ${
        visible ? "animate__fadeInDown" : "animate__fadeOutUp"
      }`}
    >
      {children ? (
        children
      ) : (
        <>
          <i className={styles.icon}></i>
          <span className={styles.text}>{text || "这是一个消息提醒！"}</span>
        </>
      )}
    </div>
  );
};

interface MessageInFoProps {
  id: number;
  className?: string;
  children?: ReactNode;
  text?: ReactNode | string;
  duration?: number | undefined;
  style?: CSSProperties;
}
let messaeRoot: Root | null;
let element: HTMLDivElement | null;
let elementChildren: MessageInFoProps[] = [];

export const destroy = (id?: number) => {
  elementChildren = elementChildren.filter((u) => u.id !== id);
  renderMessage();
  if (messaeRoot && elementChildren.length === 0) {
    messaeRoot.unmount();
    messaeRoot = null;
    document.getElementById("message_id")?.remove();
  }
};

// 创建渲染源
const createMessageRoot = () => {
  if (!document.getElementById("message_id")) {
    element = document.createElement("div");
    element.id = "message_id";
    document.body.appendChild(element);
  }

  if (document.getElementById("message_id") && !messaeRoot) {
    messaeRoot = createRoot(
      document.getElementById("message_id") as HTMLElement
    );
  }
};

//渲染最终的结果
const renderMessage = () => {
  return messaeRoot?.render(
    elementChildren.map((u, i) => {
      return createElement(MessageCom, {
        key: i,
        style: { top: i * 10 },
        ...u,
      });
    })
  );
};

export const message = (props: Omit<MessageInFoProps, "id">) => {
  createMessageRoot();
  elementChildren.push({ ...props, id: new Date().getTime() });
  return renderMessage();
};
