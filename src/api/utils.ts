export const SERVER_DATASET = (uri: string) => {
  return import.meta.env.VITE_SERVER_DATASET + uri;
};
