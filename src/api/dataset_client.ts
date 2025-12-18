import { DatasetServiceApi } from "./dataset";
import { http } from "@/utils/http";

export * from "./dataset/models";
export const datasetClient = new DatasetServiceApi(
  null,
  import.meta.env.VITE_SERVER_DATASET,
  http.getAxiosInstance()
);
