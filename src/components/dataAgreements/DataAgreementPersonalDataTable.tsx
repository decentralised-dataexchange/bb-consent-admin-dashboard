import { useState } from "react";
import CSS from "csstype";

import { Box, Typography } from "@mui/material";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";

import RestrictionModal from "../modals/restrictionModal";

const titleAttrRestrictionStyle = {
  fontWeight: "normal",
  margin: "10px 10px 5px 10px",
  borderBottom: "solid 1px #dee2e6",
  lineHeight: "1.5rem",
};

const tableAttrAdditionalInfoStyle = {
  border: 0,
  width: "100%",
  maxWidth: "100%",
  marginBottom: "0rem",
  backgroundColor: "#F7F6F6",
};

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
  borderBottomColor: "lightgray", //'#DFE0E1',
  marginRight: "10px",
};

interface Props {
  mode: string;
  subtext?: string;
}
interface AttributeValueType {
  [key: string]: any;
  attributeName: string;
  attributeDescription: string;
}

const DataAgreementPersonalDataTable = (props: Props) => {
  const { mode, subtext } = props;

  const [personalDataValues, setPersonalDataValues] = useState<
    AttributeValueType[]
  >([{ attributeName: "", attributeDescription: "" }]);
  const [openRestrictionModal, setOpenRestrcitionModal] = useState(false);

  let addPersonalDataFields = () => {
    setPersonalDataValues([
      ...personalDataValues,
      { attributeName: "", attributeDescription: "" },
    ]);
  };

  let removePersonalDataFields = (i: number) => {
    let newPersonalDataValues = [...personalDataValues];
    newPersonalDataValues.splice(i, 1);
    setPersonalDataValues(newPersonalDataValues);
  };

  let handleChangePersonalDataFields = (
    i: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newPersonalDataValues = [...personalDataValues];
    newPersonalDataValues[i][e.target.name] = e.target.value;
    setPersonalDataValues(newPersonalDataValues);
  };

  return (
    <Box style={{ marginBottom: "4rem" }}>
      <Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <Typography variant="subtitle1">
            Data Attributes
            <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
          </Typography>
          <AddCircleOutlineOutlinedIcon
            onClick={mode === "Read" ? () => {} : addPersonalDataFields}
            style={{
              cursor: mode === "Read" ? "not-allowed" : "pointer",
              marginLeft: "5px",
            }}
          />
        </Box>
        <Typography
          variant="subtitle1"
          style={{ marginTop: "-7px", marginBottom: "10px" }}
        >
          {subtext}
        </Typography>
      </Box>

      {personalDataValues.map((pd, index) => (
        <Box
          style={{
            marginBottom: "25px",
            border: "1px solid #DFE0E1",
            borderRadius: 5,
          }}
          key={index}
        >
          <Box style={titleAttrRestrictionStyle}>
            <table style={tableAttrAdditionalInfoStyle}>
              <tbody>
                <tr style={{ display: "flex" }}>
                  <td style={{ ...tableAttrAdditionalInfoColumn, flexGrow: 1 }}>
                    <input
                      className="personal-data-table-attribute-name"
                      placeholder="Attribute name (minimum 3 characters)"
                      disabled={mode === "Read"}
                      style={{
                        ...inputStyleAttr,
                        border: "none",
                        outline: "none",
                        width: "100%",
                        cursor: mode === "Read" ? "not-allowed" : "auto",
                      }}
                      type="text"
                      autoComplete="off"
                      name={"attributeName"}
                      value={pd.attributeName}
                      onChange={(e) => {
                        handleChangePersonalDataFields(index, e);
                      }}
                    />
                  </td>
                  <th style={{ marginRight: "14px", marginLeft: "17px" }}>
                    <BlockOutlinedIcon
                      style={{ zIndex: 10 }}
                      onClick={() => {
                        setOpenRestrcitionModal(true);
                      }}
                      cursor={"pointer"}
                    />
                  </th>

                  <th>
                    <DeleteOutlineOutlinedIcon
                      style={{
                        cursor: mode === "Read" ? "not-allowed" : "pointer",
                        float: "right",
                        zIndex: 10,
                      }}
                      onClick={
                        mode === "Read"
                          ? () => {}
                          : () => removePersonalDataFields(index)
                      }
                    />
                  </th>
                </tr>
              </tbody>
            </table>
          </Box>

          <Box style={{ ...titleAttrRestrictionStyle, borderBottom: 0 }}>
            <table style={tableAttrAdditionalInfoStyle}>
              <tbody>
                <tr style={{ display: "flex" }}>
                  <td style={{ ...tableAttrAdditionalInfoColumn, flexGrow: 1 }}>
                    <input
                      placeholder="Attribute description (minimum 3 characters)"
                      disabled={mode === "Read"}
                      style={{
                        ...inputStyleAttr,
                        border: "none",
                        outline: "none",
                        width: "100%",
                        cursor: mode === "Read" ? "not-allowed" : "auto",
                      }}
                      type="text"
                      autoComplete="off"
                      //   name={"personalDataDescription_" + index}
                      //   value={pd.attributeDescription || ""}
                      //   onChange={(e) => {
                      //     this.onInputAttributeValues(e, pd, index);
                      //   }}
                      //   onKeyPress={(event) => {
                      //     if (event.key === "Enter") {
                      //       if (
                      //         pd.attributeName.length >= 3 &&
                      //         pd.attributeDescription.length >= 3
                      //       ) {
                      //         this.props.addAttributeField();
                      //       }
                      //     }
                      //   }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Box>
      ))}
      <RestrictionModal
        open={openRestrictionModal}
        setOpen={setOpenRestrcitionModal}
        mode={mode}
      />
    </Box>
  );
};

export default DataAgreementPersonalDataTable;
