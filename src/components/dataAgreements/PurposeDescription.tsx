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
  fontSize: "14px",
  color: "#495057",
  borderWidth: 0,
  borderRadius: 0,
  backgroundColor: "#FFFF",
  borderBottom: "2px solid #DFE0E1",
};

export const PurposeDescription = (props: Props) => {
  const { register } = useFormContext();

  return (
    <>
      <Typography mb={1.3} mt={1.3} variant="subtitle1">
        Description
        <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
      </Typography>
      <textarea
        disabled={props.mode === "Read"}
        placeholder="Brief description about the usage of data (3-500 characters)"
        style={{
          ...inputStyle,
          cursor: props.mode === "Read" ? "not-allowed" : "auto",
          height: "120px",
          fontFamily: "Roboto,Helvetica,Arial,sans-serif",
        }}
        {...register("Description", {
          required: true,
          minLength: 3,
          maxLength: 500,
        })}
        rows={5}
        cols={25}
        maxLength={500}
      />
    </>
  );
};
