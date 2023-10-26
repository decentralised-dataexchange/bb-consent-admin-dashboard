import { Autocomplete, Chip, TextField } from "@mui/material";

import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { HttpService } from "../../service/HTTPService";

const CssTextField = styled(TextField)({
  "& .MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before": {
    borderBottom: "0",
  },
  "& .MuiInput-underline:before": {
    borderBottom: "0",
  },
  "& .MuiInput-underline:after": {
    borderBottom: "0",
  },
});

const inputStyleAttr = {
  color: "#495057",
  border: "1px solid black",
  borderRadius: 5,
  fontSize: "14px",
  borderBottomWidth: 1.2,
  backgroundColor: "white",
  width: "40%",
};

export const SearchByIdRecordsAutoselect = (props: any) => {
  const { handleSearchTriggered, sethandleSearchTriggered, changefilter } =
    props;
  const [recordList, setrecordList] = useState<any>([]);
  useEffect(() => {
    HttpService.listAllDataAgreementRecords(0, 100, "").then((res) => {
      setrecordList(res.dataAgreementRecords);
    });
  }, []);
  return (
    <Autocomplete
      autoSelect
      disableClearable={true}
      // defaultValue={value}
      style={{
        ...inputStyleAttr,
        border: "1px solid black",
      }}
      options={recordList.map((option: any) => option.individualId)}
      onChange={(event, value) => {
        changefilter({
          filterType: "individualId",
          value: value,
        });
        sethandleSearchTriggered(!handleSearchTriggered);
      }}
      freeSolo
      renderTags={(value: any, getTagProps) =>
        value?.map((option: any, index: number) => (
          <Chip
            variant="outlined"
            label={option?.individualId}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <CssTextField
          {...params}
          placeholder="Search by Individual ID"
          sx={{
            input: {
              color: "#495057",
              fontSize: "14px",
              marginLeft: 1,
              "&::placeholder": {
                opacity: 0.8,
                fontSize: "14px",
              },
            },
          }}
          variant="standard"
        />
      )}
    />
  );
};
