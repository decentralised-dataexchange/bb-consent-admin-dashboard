import CSS from "csstype";

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
};

const dropDownStyle = {
  color: "#495057",
  border: "none",
  outline: "none",
  fontSize: "14px",
  width: "100%",
  backgroundColor: "#ffff",
};

interface Props {
  mode: string;
}

const DataAgreementPolicy = (props: Props) => {
  const { mode } = props;
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
              name={"policyUrl"}
              // value={'policyUrl'}
              // onChange={handleChangeConfig}
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
              name={"jurisdiction"}
              // value={jurisdiction}
              // onChange={handleChangeConfig}
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
              name={"industryScope"}
              // value={industryScope}
              // onChange={handleChangeConfig}
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
              disabled
              style={{
                ...inputDataConfigStyle,
                cursor: mode === "Read" ? "not-allowed" : "auto",
              }}
              name={"storageLocation"}
              // value={storageLocation}
              // onChange={handleChangeConfig}
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
              name={"dataRetentionPeriod"}
              // value={dataRetentionPeriod}
              // onChange={handleChangeConfig}
            />
          </td>
        </tr>

        <tr>
          <th style={tableCellStyle}>Geographic restriction</th>

          <td style={{ ...tableCellStyle, borderRight: 0 }}>
            <select
              // type="text"
              disabled={mode === "Read"}
              style={{
                ...dropDownStyle,
                cursor: mode === "Read" ? "not-allowed" : "auto",
              }}
              name={"selectedGeographicRestriction"}
            >
              {geographicRestrictions.map((type, i) => {
                return (
                  <option key={i} value={type.label}>
                    {type.label}
                  </option>
                );
              })}
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default DataAgreementPolicy;
