import {InfiniteData} from 'react-query';
import {Product} from '../interfaces';

export const createCategoriesGridArray = <T extends object[]>(oldarr: T) => {
  const newArr = [];

  for (let i = 0; i <= oldarr.length; i = i % 2 != 0 ? i + 3 : i + 1) {
    if (i == 0 || i % 2 == 0) {
      newArr.push(oldarr[i]);
    } else {
      if (i !== oldarr.length - 1) {
        newArr.push([oldarr[i], oldarr[i + 1], oldarr[i + 2]]);
      } else {
        newArr.push([oldarr[i]]);
      }
    }
  }
  return newArr.filter((x) => x);
};

export const removeDublicates = (data: Product[]) => {
  const Ids = [...new Set(data?.map((item) => item.product_id))];
  const notRedundency = Ids.map((id) =>
    data?.find((order) => order.product_id == id),
  );

  return notRedundency;
};

export const formatNumbers = (num: number) =>
  Math.abs(num) > 999
    ? (Math.sign(num) * Math.round(Math.abs(num) / 100)) / 10 + 'k'
    : Math.sign(num) * Math.abs(num);
