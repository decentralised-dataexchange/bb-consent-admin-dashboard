import { Select, MenuItem } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import CSS from "csstype";

interface GeographicRestrictionsFormControlProps {
  mode: string;
}

interface GeographicRestrictionsProps {
  mode: string;
  onChange: (e: React.SyntheticEvent) => void;
  value: any;
}

const tableCellStyle: CSS.Properties = {
  fontWeight: "normal",
  fontSize: "14px",
  borderTop: "solid 1px #dee2e6",
  textAlign: "left",
  borderRight: "solid 1px #dee2e6",
};

const dropDownStyle = {
  color: "#495057",
  border: "none",
  outline: "none",
  fontSize: "14px",
  width: "100%",
  height: "35px",
  backgroundColor: "#F7F6F6",
};

const disabledDropDownStyle = {
  border: "none",
  outline: "none",
  fontSize: "14px",
  backgroundColor: "#F7F6F6",
  height: "35px",
  cursor: "not-allowed",
};

const geographicRestrictions = [
  {
    value: "Europe",
    label: "Europe",
  },
  {
    value: "Not restricted",
    label: "Not restricted",
  },
];

export const GeographicRestrictions = (props: GeographicRestrictionsProps) => {
  return (
    <>
      <Select
        variant="outlined"
        fullWidth
        onChange={(e: any) => {
          props.onChange(e);
        }}
        name="restriction"
        defaultValue={"Europe"}
        disabled={props.mode === "Read"}
        style={props.mode === "Read" ? disabledDropDownStyle : dropDownStyle}
      >
        {geographicRestrictions.map((modes) => (
          <MenuItem key={modes?.label} value={modes.value}>
            {modes.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export const GeographicRestrictionsFormControl = (
  props: GeographicRestrictionsFormControlProps
) => {
  const { control } = useFormContext();

  return (
    <>
      <th style={tableCellStyle}>Geographic restriction</th>

      <td style={{ ...tableCellStyle, borderRight: 0 }}>
        <Controller
          name="Restriction"
          control={control}
          defaultValue={"Europe"}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <GeographicRestrictions
              onChange={onChange}
              value={value}
              mode={props.mode}
            />
          )}
        />
      </td>
    </>
  );
};
