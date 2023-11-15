import { Typography, Box, FormControl, Select, MenuItem } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const dataExchangeModes = [
  { value: "null", label: "None" },
  { value: "data_source", label: "Data Source" },
  { value: "data_using_service", label: "Data Using Service" },
];

interface DataExchangeModeFormControlProps {
  open: boolean;
  mode: string;
  selectededDataAgreementFromDataAgreement: any;
}

interface DataExchangeModeProps {
  mode: string;
  onChange: (e: React.SyntheticEvent) => void;
  value: any;
  selectededDataAgreementFromDataAgreement: any;
}

const dropDownStyle = {
  border: "1px solid lightgray",
  outline: "none",
  fontSize: "14px",
  backgroundColor: "#FFFF",
  height: "38px",
  borderRadius: "5px",
  cursor: "pointer",
};

const disabledDropDownStyle = {
  border: "1px solid lightgray",
  outline: "none",
  fontSize: "14px",
  backgroundColor: "#F7F6F6",
  height: "38px",
  borderRadius: "5px",
  cursor: "not-allowed",
};

export const DataExchangeMode = (props: DataExchangeModeProps) => {
  return (
    <>
      <Select
        onChange={(e: any) => {
          props.onChange(e);
        }}
        variant="outlined"
        fullWidth
        value={props.value}
        name="AttributeType"
        disabled={
          props.mode === "Read" ||
          props?.selectededDataAgreementFromDataAgreement?.active === true || 
          props?.selectededDataAgreementFromDataAgreement?.version !== "1.0.0"
        }
        style={
          props.mode === "Read"
            ? {
                ...disabledDropDownStyle,
                width: "200px",
                marginTop: "-10px",
              }
            : {
                ...dropDownStyle,
                width: "200px",
                marginTop: "-10px",
              }
        }
      >
        {dataExchangeModes.map((modes) => (
          <MenuItem key={modes?.label} value={modes.value}>
            {modes.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export const DataExchangeModeFormControl = (
  props: DataExchangeModeFormControlProps
) => {
  const { control } = useFormContext();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <Typography variant="subtitle1">Data Exchange</Typography>
        <FormControl>
          <Controller
            name="AttributeType"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <DataExchangeMode
                onChange={onChange}
                value={value}
                mode={props.mode}
                selectededDataAgreementFromDataAgreement={
                  props?.selectededDataAgreementFromDataAgreement
                }
              />
            )}
          />
        </FormControl>
      </Box>
    </>
  );
};
