export const serializer = (value: string | object) => {
  if (typeof value == 'string') return JSON.parse(value);
  if (typeof value == 'object') return JSON.stringify(value);
};
