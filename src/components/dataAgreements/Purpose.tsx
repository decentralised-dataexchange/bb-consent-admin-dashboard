import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  open: boolean;
  mode: string;
}

const inputStyle = {
  width: "100%",
  border: "1",
  outline: "none",
  fontSize: "14px",
  color: "#495057",
  borderWidth: 0,
  borderRadius: 0,
  backgroundColor: "#FFFF",
  borderBottom: "2px solid #DFE0E1",
};

export const Purpose = (props: Props) => {
  const { register, setValue, watch } = useFormContext();
  const value = watch("Name");

  useEffect(() => {
    if (value.length > 60) {
       // Truncate input if length exceeds 60 characters
      setValue("Name", value.slice(0, 60));
    }
  }, [value, setValue]);
  return (
    <>
      <Typography mb={1.3} variant="subtitle1">
        Usage Purpose
        <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
      </Typography>
      <input
        placeholder="E.g. Marketing and campaign (minimum 3 characters)"
        type="text"
        disabled={props.mode === "Read"}
        style={{
          ...inputStyle,
          cursor: props.mode === "Read" ? "not-allowed" : "auto",
        }}
        {...register("Name", {
          required: true,
          minLength: 3,
          maxLength: 60,
          pattern: {
            value: /.*\D.*/,
            message: "",
          },
        })}
        autoComplete="off"
      />
    </>
  );
};
