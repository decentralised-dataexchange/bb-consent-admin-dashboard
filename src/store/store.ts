import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// Setup initial state
type State = {
  filterDataAgreement: string;
  filterDataAttribute: string;
  filterViewLogs: any;
  userRecordsFilter: any;
};

// Setup actions
type Action = {
  updateFilterDataAgreement: (
    filterDataAgreement: State["filterDataAgreement"]
  ) => void;
  updateFilterDataAttribute: (
    filterDataAttribute: State["filterDataAttribute"]
  ) => void;
  updateFilterViewLogs: (filterViewLogs: State["filterViewLogs"]) => void;
};

// Setup store
export let store = (set: any) => ({
  filterDataAgreement: "all",
  filterDataAttribute: "all",
  filterViewLogs: 0,
  disabledPurposeDropDown: true,
  disabledLawfulBasisDropDown: true,
  userRecordsFilter: {
    filterType: "all",
    value: "all",
  },
  updateFilterDataAgreement: (filterDataAgreement: any) =>
    set(() => {
      return { filterDataAgreement: filterDataAgreement };
    }),
  updateFilterDataAttribute: (filterDataAttribute: any) =>
    set(() => ({ filterDataAttribute: filterDataAttribute })),
  updateFilterViewLogs: (filterViewLogs: any) =>
    set(() => ({ filterViewLogs: filterViewLogs })),
  updateFilterUserRecords: (userRecordsFilter: any) =>
    set(() => ({ userRecordsFilter: userRecordsFilter })),
  updateDisabledPurposeDropDown: (disabledPurposeDropDown: any) =>
    set(() => ({ disabledPurposeDropDown: disabledPurposeDropDown })),
  updateDisabledLawfulBasisDropDown: (disabledLawfulBasisDropDown: any) =>
    set(() => ({ disabledLawfulBasisDropDown: disabledLawfulBasisDropDown })),
});

let devtoolsStore = devtools(store);
// let persistStore = persist(devtoolsStore, { name: 'filterSetting'});

export const useFilterStore = create(devtoolsStore);
