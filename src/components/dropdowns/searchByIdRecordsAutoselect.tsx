import { TextField } from "@mui/material";
import { fontSize } from "@mui/system";

const inputStyleAttr = {
  color: "#495057",
  borderRadius: 5,
  fontSize: "14px",
  borderBottomWidth: 1.2,
  backgroundColor: "white",
  width: "40%",
};

export const SearchByIdRecordsAutoselect = (props: any) => {
  const { handleSearchTriggered, sethandleSearchTriggered, changefilter } =
    props;

  return (
    <TextField
      style={{
        ...inputStyleAttr,
      }}
      placeholder="Search by Individual ID, Consent Record ID, Data Agreement ID"
      // sx={{
      //   input: {
      //     "&::placeholder": {
      //       fontSize: "14px",
      //     },
      //   },
      // }}
      onChange={(event) => {
        changefilter({
          filterType: "id",
          value: event.target.value,
        });
      }}
      onKeyUp={(e) => {
        if (e.key === "Enter" || e.key === "Next") {
          sethandleSearchTriggered(!handleSearchTriggered);
        }
      }}
    />
  );
};
