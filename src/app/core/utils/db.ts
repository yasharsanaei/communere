import { serializer } from './serializer';
import { Location } from '../types/location/location';

const LOCAL_STORAGE_KEY = 'LOCATION_DATA';

export const db = () => {
  const read = (): Location[] | null => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data != null) return serializer(data);
    return data;
  };
  const write = (data: Location[]) => localStorage.setItem(LOCAL_STORAGE_KEY, serializer(data));
  return {
    read,
    write,
  };
};
