import { SwiperDataProps } from "../../../assets/data";
export const useHandleSwiper = (data: SwiperDataProps[]) => {
  const handleData = (list: SwiperDataProps[], divisor: number = 6) => {
    const result: SwiperDataProps[][] = [];

    for (let i = 0; i < list.length; i += divisor) {
      const chunk = list.slice(i, i + divisor);
      result.push(chunk);
    }

    return result;
  };

  return [...handleData(data)];
};
