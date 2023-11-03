import { TextField } from "@mui/material";
import { useFilterStore } from "../../store/store";
const debounce = require("lodash.debounce");

const inputStyleAttr = {
  color: "#495057",
  borderRadius: 5,
  fontSize: "14px",
  borderBottomWidth: 1.2,
  backgroundColor: "white",
};

export const SearchByIdRecords = (props: any) => {
  const { handleSearchTriggered, sethandleSearchTriggered, changefilter } =
    props;

  const updateDisabledPurposeDropDown = (disabledPurposeDropDown: any) => {
    useFilterStore
      .getState()
      .updateDisabledPurposeDropDown(disabledPurposeDropDown);
  };

  const updateDisabledLawfulBasisDropDown = (
    disabledLawfulBasisDropDown: any
  ) => {
    useFilterStore
      .getState()
      .updateDisabledLawfulBasisDropDown(disabledLawfulBasisDropDown);
  };

  const updateQuery = (e: any) => {
    changefilter({
      filterType: "id",
      value: e?.target?.value,
    });
    updateDisabledPurposeDropDown(true);
    updateDisabledLawfulBasisDropDown(true);
    sethandleSearchTriggered(!handleSearchTriggered);
  };

  const debouncedOnChange = debounce(updateQuery, 100);

  return (
    <TextField
      style={{
        ...inputStyleAttr,
      }}
      sx={{ width: { xs: "100%", sm: "40%" } }}
      placeholder="Search by Individual ID, Consent Record ID, Data Agreement ID"
      onChange={debouncedOnChange}
    />
  );
};
