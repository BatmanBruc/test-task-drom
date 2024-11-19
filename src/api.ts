import axios from 'axios';
import { City, CityDaysStructur, Order } from './types';

const domain = 'https://ylg4g.wiremockapi.cloud/';

export const getCities = async () => {
  const result: {
    cities: City[]
  } = (await axios({
    baseURL: domain,
    url: '/cities',
    method: 'get',
  })).data
  return result.cities;
}

export const getInfoByCity = async (id: string) => {
  const result: {
    data: CityDaysStructur
  } =  (await axios({
    baseURL: domain,
    url: '/cities/' + id,
    method: 'get',
  })).data
  return result.data;
}

export const setOrder = (data: Order) => {
  const id = String(localStorage.length);
  localStorage.setItem(id, JSON.stringify(data))
}

export const removeOrder = (id: string) => {
  localStorage.removeItem(id);
}

export const getOrderList = () => {
  const list: Order[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const id = localStorage.key(i)
    if (id) {
      const strObject = localStorage.getItem(id);
      if (strObject) {
        const order: Order = JSON.parse(strObject);
        list.push({
          id,
          ...order
        })
      }
    }
  }
  return list;
}