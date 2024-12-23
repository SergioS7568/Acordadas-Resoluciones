import { create } from "zustand";
import { DataType } from "./Lib/getAgreements";

type StoredType = {
  data: DataType;
};

type Action = {
  updateData: (data: StoredType["data"]) => void;
  cleanSearch: (data: StoredType["data"]) => void;
};

export const useDataType = create<StoredType & Action>((set) => ({
  data: {
    number: "",
    "init-date": null,
    "final-day": null,
    text: "",
    type: "",
  },

  updateData: (data) => set(() => ({ data: data })),
  cleanSearch: (data: DataType) => set(() => ({ data: data })),
}));
