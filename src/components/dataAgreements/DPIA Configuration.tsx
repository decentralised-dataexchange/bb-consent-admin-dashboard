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
  backgroundColor: "#F7F6F6",
};

interface Props {
  mode: string;
}

const DPIAConfigurations = (props: Props) => {
  const { mode } = props;

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
            DPIA Date
          </th>

          <td style={{ ...tableCellStyle, borderTop: 0, borderRight: 0 }}>
            <input
              autoComplete="off"
              disabled={mode === "Read"}
              style={{
                ...inputDataConfigStyle,
                cursor: mode === "Read" ? "not-allowed" : "auto",
              }}
              name={"dpiaDate"}
              type="datetime-local"
              // value={'policyUrl'}
              // onChange={handleChangeConfig}
            />
          </td>
        </tr>

        <tr>
          <th style={tableCellStyle} scope="row">
            DPIA Summary URL
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
              name={"dpiaSummaryUrl"}
              // value={jurisdiction}
              // onChange={handleChangeConfig}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default DPIAConfigurations;
