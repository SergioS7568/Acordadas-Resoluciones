import { create } from "zustand";
import { DataType } from "./Lib/getAgreements";

type StoredType = {
  data: DataType;
  pageSize: number;
};

type Action = {
  updateData: (data: StoredType["data"]) => void;
  cleanSearch: (data: StoredType["data"]) => void;
  updatePageSize: (number: StoredType["pageSize"]) => void;
};

export const useDataType = create<StoredType & Action>((set) => ({
  data: {
    number: "",
    "init-date": null,
    "final-day": null,
    text: "",
    type: "",
  },
  pageSize: 10,

  updateData: (data) => set(() => ({ data: data })),
  cleanSearch: (data: DataType) => set(() => ({ data: data })),
  updatePageSize: (number) => set(() => ({ pageSize: number })),
}));
