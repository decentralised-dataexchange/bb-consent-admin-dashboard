import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface LawfullBasisProps {
  open: boolean;
  mode: string;
  onChange: (e: React.SyntheticEvent) => void;
  value: any;
}

interface LawfullBasisFormControlProps {
  open: boolean;
  mode: string;
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

const lawfullBasisOfProcessing = [
  { value: 'consent', label: "Consent" },
  { value: 'contract', label: "Contract" },
  { value: 'legal_obligation', label: "Legal Obligation" },
  { value: 'vital_interest', label: "Vital Interest" },
  { value: 'public_task', label: "Public Task" },
  { value: 'legitimate_interest', label: "Legitimate Interest" },
];

export const LawfullBasisMethods = (props: LawfullBasisProps) => {
  return (
    <>
      <Select
        onChange={(e: any) => {
          props.onChange(e);
        }}
        variant="outlined"
        disabled={props.mode === "Read"}
        value={props.value}
        fullWidth
        name="LawfulBasisOfProcessing"
        style={
          props.mode === "Read"
            ? {
                ...disabledDropDownStyle,
                width: "100%",
                marginBottom: "10px",
                marginTop: "-10px",
              }
            : {
                ...dropDownStyle,
                width: "100%",
                marginBottom: "10px",
                marginTop: "-10px",
              }
        }
      >
        {lawfullBasisOfProcessing.map((modes) => (
          <MenuItem key={modes?.label} value={modes.value}>
            {modes.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export const LawfullBasisOfProcessingFormControll = (
  props: LawfullBasisFormControlProps
) => {
  const { control } = useFormContext();

  return (
    <>
      {" "}
      <Typography mb={1.3} mt={1.3} variant="subtitle1">
        Lawful Basis Of Processing
        <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
      </Typography>
      <FormControl style={{ width: "100%" }}>
        <Controller
          name="LawfulBasisOfProcessing"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <LawfullBasisMethods
              onChange={onChange}
              value={value}
              open={props.open}
              mode={props.mode}
            />
          )}
        />
      </FormControl>{" "}
    </>
  );
};
