import { Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

interface Props {
  open: boolean;
  mode: string;
}

const inputStyle = {
  width: "100%",
  border: "1",
  outline: "none",
  fontSize: "16px",
  color: "#495057",
  borderWidth: 0,
  borderRadius: 0,
  backgroundColor: "#F7F6F6",
  borderBottom: "2px solid #DFE0E1",
};

export const Purpose = (props: Props) => {
  const { register } = useFormContext();

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
        })}
        autoComplete="off"
      />
    </>
  );
};
