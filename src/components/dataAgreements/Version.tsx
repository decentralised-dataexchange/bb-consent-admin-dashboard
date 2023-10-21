import { Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

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

export const Version = () => {
  const { register } = useFormContext();

  return (
    <>
      <Typography mt={1.3} mb={1.3} variant="subtitle1">
        Version
        <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
      </Typography>
      <input
        style={{
          ...inputStyle,
          cursor:"not-allowed"
        }}
        type="text"
        {...register('Version', { required: true, value: '1.0.0' })}
        autoComplete="off"
        disabled
      />
    </>
  );
};
