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
  filterViewLogs: 0,
  disabledPurposeDropDown: true,
  disabledLawfulBasisDropDown: true,
  userRecordsFilter: {
    filterType: "all",
    value: "all",
  },
  changeAvatar: false,
  changeAdminName: false,
  updateFilterDataAgreement: (filterDataAgreement: any) =>
    set(() => {
      return { filterDataAgreement: filterDataAgreement };
    }),
  updateFilterViewLogs: (filterViewLogs: any) =>
    set(() => ({ filterViewLogs: filterViewLogs })),
  updateFilterUserRecords: (userRecordsFilter: any) =>
    set(() => ({ userRecordsFilter: userRecordsFilter })),
  updateDisabledPurposeDropDown: (disabledPurposeDropDown: any) =>
    set(() => ({ disabledPurposeDropDown: disabledPurposeDropDown })),
  updateDisabledLawfulBasisDropDown: (disabledLawfulBasisDropDown: any) =>
    set(() => ({ disabledLawfulBasisDropDown: disabledLawfulBasisDropDown })),
  updateChangeAvatar: (changeAvatar: any) =>
    set(() => ({ changeAvatar: changeAvatar })),
  updateChangeAdminName: (changeAdminName: any) =>
    set(() => ({ changeAdminName: changeAdminName })),
  // reset function to call when route is changed
  resetStore: () =>
    set({
      filterDataAgreement: "all",
      filterDataAttribute: "all",
      filterViewLogs: 0,
      disabledPurposeDropDown: true,
      disabledLawfulBasisDropDown: true,
      userRecordsFilter: {
        filterType: "all",
        value: "all",
      },
    }),
});

let devtoolsStore = devtools(store);
// let persistStore = persist(devtoolsStore, { name: 'filterSetting'});

export const useFilterStore = create(devtoolsStore);
