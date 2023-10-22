import CSS from "csstype";
import { useFormContext } from "react-hook-form";
import { GeographicRestrictionsFormControl } from "./GeographicRestrctions";
import { ThirdPartyDataSharingFormControl } from "./ThirdPartySharing";

const tableCellStyle: CSS.Properties = {
  fontWeight: "normal",
  fontSize: "14px",
  borderTop: "solid 1px #dee2e6",
  textAlign: "left",
  borderRight: "solid 1px #dee2e6",
};

const inputDataConfigStyle = {
  color: "#495057",
  border: "none",
  outline: "none",
  fontSize: "14px",
  width: "100%",
  backgroundColor: "#F7F6F6",
};

interface Props {
  mode: string;
}

const DataAgreementPolicy = (props: Props) => {
  const { mode } = props;
  const { register } = useFormContext();

  return (
    <table
      style={{
        border: "solid 1px #dee2e6",
        width: "100%",
        maxWidth: "100%",
        marginBottom: "1rem",
        marginTop: ".5rem",
      }}
    >
      <tbody>
        <tr>
          <th style={{ ...tableCellStyle, borderTop: 0 }} scope="row">
            Policy URL
          </th>

          <td style={{ ...tableCellStyle, borderTop: 0 }}>
            <input
              autoComplete="off"
              type="text"
              disabled={mode === "Read"}
              style={{
                ...inputDataConfigStyle,
                cursor: mode === "Read" ? "not-allowed" : "auto",
              }}
              {...register("PolicyURL", {
                required: true,
                minLength: 1,
              })}
            />
          </td>
        </tr>

        <tr>
          <th style={tableCellStyle} scope="row">
            Jurisdiction
          </th>

          <td style={tableCellStyle}>
            <input
              autoComplete="off"
              type="text"
              disabled={mode === "Read"}
              style={{
                ...inputDataConfigStyle,
                cursor: mode === "Read" ? "not-allowed" : "auto",
              }}
              {...register("Jurisdiction", {
                required: true,
                minLength: 1,
              })}
            />
          </td>
        </tr>

        <tr>
          <th style={tableCellStyle} scope="row">
            Industry scope
          </th>

          <td style={tableCellStyle}>
            <input
              autoComplete="off"
              type="text"
              disabled={mode === "Read"}
              style={{
                ...inputDataConfigStyle,
                cursor: mode === "Read" ? "not-allowed" : "auto",
              }}
              {...register("IndustryScope", {
                required: true,
                minLength: 1,
              })}
            />
          </td>
        </tr>

        <tr>
          <th style={tableCellStyle} scope="row">
            Storage Location
          </th>

          <td style={{ ...tableCellStyle, borderRight: 0 }}>
            <input
              autoComplete="off"
              type="text"
              style={{
                ...inputDataConfigStyle,
              }}
              {...register("StorageLocation", {
                required: true,
                minLength: 1,
              })}
            />
          </td>
        </tr>

        <tr>
          <th style={tableCellStyle} scope="row">
            Data retention period in year (s)
          </th>

          <td style={tableCellStyle}>
            <input
              autoComplete="off"
              type="number"
              disabled={mode === "Read"}
              style={{
                ...inputDataConfigStyle,
                cursor: mode === "Read" ? "not-allowed" : "auto",
              }}
              {...register("dataRetentionPeriodDays", {
                required: true,
                minLength: 1,
                valueAsNumber: true,
              })}
            />
          </td>
        </tr>

        <tr>
          <GeographicRestrictionsFormControl mode={mode} />
        </tr>

        <tr>
          <ThirdPartyDataSharingFormControl mode={mode} />
        </tr>
      </tbody>
    </table>
  );
};

export default DataAgreementPolicy;
