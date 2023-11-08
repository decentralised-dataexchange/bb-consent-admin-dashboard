import { useEffect, useState } from "react";

import { Box, Typography, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

// icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import BreadCrumb from "../../components/Breadcrumbs";
import GeneralModal from "../../components/modals/generalModal";
import EditUserAccessModal from "../../components/modals/editUserAccessModal";
import { HttpService } from "../../service/HTTPService";
import { display } from "@mui/system";

const Container = styled("div")(({ theme }) => ({
  margin: "58px 15px 0px 15px",
  paddingBottom: "50px",
  [theme.breakpoints.down("sm")]: {
    margin: "52px 0 10px 0",
  },
}));

const HeaderContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: "15px",
});

const Item = styled("div")({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff",
  padding: "25px 30px 25px 30px",
  marginTop: "13px",
  justifyContent: "space-between",
  height: "auto",
  borderRadius: 3,
  border: "1px solid #E1E1E1",
});

const uploadButtonStyle = {
  cursor: "pointer",
  border: "1px solid #DFDFDF",
  height: 35,
  borderRadius: 1,
  width: "auto",
  paddingLeft: "50px",
  paddingRight: "50px",
};

const UserAccess = () => {
  const [openEditUserAccessModal, setOpenEditUserAccessModal] = useState(false);
  const [openDeleteUserAccessModal, setOpenDeleteUserAccessModal] =
    useState(false);
  const [configured, setConfigured] = useState(false);
  const [idpDetails, setIdpDetails] = useState<any>();
  useEffect(() => {
    HttpService.listAllIdps().then((response) => {
      if (response.idps.length !== 0) {
        setConfigured(true);
        setIdpDetails(response.idps[0]);
      }
    });
  }, [openDeleteUserAccessModal, openEditUserAccessModal]);

  const handleCSVFile = async (e: any) => {
    let file = e.target.files[0];
    let csv = /text.csv/;

    if (file.type.match(csv)) {
      const formData = new FormData();
      formData.append("individuals", file);

      HttpService.addIndividualUsingByCsv(formData)
        .then((res) => {})
        .catch((error) => {
          console.log(`Error: ${error}`);
        });
    }
  };

  return (
    <Container>
      <BreadCrumb Link="Manage Users" Link2="Configuration" />
      <HeaderContainer>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            User Access
          </Typography>
          <Tooltip title="Create User Access" placement="top">
            <AddCircleOutlineOutlinedIcon
              style={{
                cursor: configured ? "not-allowed" : "pointer",
                marginLeft: "7px",
              }}
              onClick={() => {
                configured === false && setOpenEditUserAccessModal(true);
              }}
            />
          </Tooltip>
        </Box>
      </HeaderContainer>
      <Typography variant="body2" mt={1.35}>
        Manage how individual users of your organisation can access the privacy
        board.
      </Typography>

      <Item>
        {configured ? (
          <>
            <Box style={{ display: "flex" }}>
              <Typography color="black" variant="body2">
                Authentication mechanism:
              </Typography>
              <Typography color="black" variant="body2" ml={1}>
                Open-ID Connect
              </Typography>
            </Box>
            <Box>
              <Tooltip title="Edit User Access" placement="top">
                <EditOutlinedIcon
                  onClick={() => {
                    setOpenEditUserAccessModal(true);
                  }}
                  fontSize="medium"
                  color="disabled"
                  style={{ cursor: "pointer" }}
                />
              </Tooltip>
              <Tooltip title="Delete User Access" placement="top">
                <DeleteOutlineOutlinedIcon
                  onClick={() => setOpenDeleteUserAccessModal(true)}
                  fontSize="medium"
                  color="disabled"
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                />
              </Tooltip>
            </Box>
          </>
        ) : (
          <Box style={{ display: "flex" }}>
            <Typography color="black" variant="body2">
              Authentication mechanism:
            </Typography>
            <Typography color="grey" variant="body2" ml={1}>
              {"<Not configured. Choose + to configure>"}
            </Typography>
          </Box>
        )}
      </Item>
      <Item>
        <Typography color="black" variant="body2">
          Upload existing users via a .csv file using the UPLOAD option.
        </Typography>
        <Box>
          <form>
            <label className="uptext" htmlFor="uploadCSV">
              <Box
                style={uploadButtonStyle}
                sx={{
                  textAlign: "center",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                  color: "black",
                  display:"flex",
                  alignItems:"center"
                }}
              >
                <Typography variant="body2">UPLOAD</Typography>
              </Box>
            </label>
            <input
              accept=".csv"
              id="uploadCSV"
              name="uploadCSV"
              hidden={true}
              type="file"
              multiple={false}
              onChange={handleCSVFile}
            />
          </form>
        </Box>
      </Item>
      {/* Modals */}

      {/* DeletePersonalModal */}
      <GeneralModal
        open={openDeleteUserAccessModal}
        setOpen={setOpenDeleteUserAccessModal}
        headerText={"Delete User Access "}
        confirmText="DELETE"
        resourceName={"configuration"}
        userAccessId={idpDetails?.id}
        modalDescriptionText={
          <Typography sx={{ wordWrap: "breakWord" }}>
            You are about to delete an existing user access. Please type{" "}
            <span style={{ fontWeight: "bold" }}>DELETE</span> to confirm and
            click DELETE. This action is not reversible.
          </Typography>
        }
      />

      <EditUserAccessModal
        open={openEditUserAccessModal}
        setOpen={setOpenEditUserAccessModal}
        headerText={"Access Configuration"}
        idpDetails={idpDetails}
      />
    </Container>
  );
};

export default UserAccess;
