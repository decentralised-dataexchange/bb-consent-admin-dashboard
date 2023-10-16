import CSS from "csstype";

import { Autocomplete, Chip, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import { styled } from "@mui/material/styles";
import { DataAttributeInterface } from "../../interfaces/DataAttribute";

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

const tableAttrAdditionalInfoColumn: CSS.Properties = {
  fontWeight: "normal",
  border: "0px",
};

const inputStyleAttr = {
  width: "85%",
  color: "#495057",
  border: "1",
  borderWidth: 0,
  padding: 0,
  paddingBottom: 1,
  borderRadius: 0,
  fontSize: "14px",
  borderBottomWidth: 1.2,
  backgroundColor: "#F7F6F6",
  borderBottomColor: "red", //'#DFE0E1',
  marginRight: "10px",
};

interface DataAtributeNameControllerProps {
  mode: string;
  index: number;
  existingDataAttributes: DataAttributeInterface[];
  formController: any;
}

export const DataAtributeNameController = (
  props: DataAtributeNameControllerProps
) => {
  const { formController } = props;
  const { setValue } = useFormContext();

  return (
    <td
      style={{
        ...tableAttrAdditionalInfoColumn,
        flexGrow: 1,
        marginTop: -10,
      }}
    >
      <Controller
        name={`dataAttributes.${props.index}.attributeName`}
        control={formController}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            autoSelect
            disableClearable={true}
            style={{
              ...inputStyleAttr,
              border: "none",
              outline: "none",
              width: "100%",
              cursor: props.mode === "Read" ? "not-allowed" : "auto",
            }}
            options={props.existingDataAttributes}
            getOptionLabel={(option: string | DataAttributeInterface) => {
              // When option is of type `string`
              // it means the option is new
              if (typeof option === "string") {
                return option;
              } else {
                // When option is of type `DataAttributeInterface`
                // it means the option is existing
                return option.Consent;
              }
            }}
            onChange={(event, value) => {
              if (typeof value === "string") {
                // When option is of type `string`
                // it means the option is new
                // in which case there is no `attributeId`
                setValue(`dataAttributes.${props.index}.attributeName`, value);
              } else {
                // When option is of type `DataAttributeInterface`
                // it means the option is existing
                // and `attributeId` is available
                const tempOption = value as DataAttributeInterface;
                setValue(`dataAttributes.${props.index}`, tempOption);

                setValue(
                  `dataAttributes.${props.index}.attributeDescription`,
                  tempOption.Description
                );
              }
            }}
            freeSolo
            renderTags={(value: any, getTagProps) =>
              value.map((option: DataAttributeInterface, index: number) => (
                <Chip
                  variant="outlined"
                  label={option.Consent}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <CssTextField
                {...params}
                placeholder="Attribute name (minimum 3 characters)"
                sx={{
                  input: {
                    color: "#495057",
                    fontSize: "14px",
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
        )}
      />
    </td>
  );
};
