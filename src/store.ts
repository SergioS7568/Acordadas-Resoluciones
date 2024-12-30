import { create } from "zustand";
import { DataType } from "./Lib/getAgreements";

type StoredType = {
  data: DataType;
  pageSize: number;
  pageIndex: number;
  agreementID: number | null;
  agreementIDList: number[];
  queryIndex: number;
};

type Action = {
  updateData: (data: StoredType["data"]) => void;
  cleanSearch: (data: StoredType["data"]) => void;
  updatePageSize: (number: StoredType["pageSize"]) => void;
  updateQueryIndex: (data: StoredType["queryIndex"]) => void;
  updatePageIndex: (data: StoredType["pageIndex"]) => void;
  updateAgreementID: (data: StoredType["agreementID"]) => void;
  updateIdList: (data: StoredType["agreementIDList"]) => void;
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
  pageIndex: 0,
  agreementID: null,
  agreementIDList: [],
  queryIndex: 0,
  updateData: (data) => set(() => ({ data: data })),
  cleanSearch: (data: DataType) => set(() => ({ data: data })),
  updatePageSize: (number) => set(() => ({ pageSize: number })),
  updateQueryIndex: (number) => set(() => ({ queryIndex: number })),
  updatePageIndex: (number) => set(() => ({ pageIndex: number })),
  updateAgreementID: (number) => set(() => ({ agreementID: number })),
  updateIdList: (newAgreementIDList) =>
    set(() => ({ agreementIDList: newAgreementIDList })),
}));
