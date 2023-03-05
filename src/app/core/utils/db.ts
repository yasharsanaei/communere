import { serializer } from './serializer';
import { Location } from '../types/location/location';
import { LocationImpl } from '../types/location/locationImpl';

const LOCAL_STORAGE_KEY = 'LOCATION_DATA';

export const db = () => {
  const read = (): LocationImpl[] | null => {
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
