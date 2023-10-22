import { useState } from "react";

import { Box, Typography, Tooltip, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

// icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import BreadCrumb from "../../components/Breadcrumbs";
import GeneralModal from "../../components/modals/generalModal";
import EditUserAccessModal from "../../components/modals/editUserAccessModal";

const Container = styled('div')(({ theme }) => ({
  margin: '58px 15px 0px 15px',
  paddingBottom:"50px",
  [theme.breakpoints.down('sm')]: {
      margin: '52px 0 10px 0'
  },
}));

const HeaderContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: "15px"
});

const Item = styled("div")({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff",
  padding: "25px 30px 25px 30px" ,
  marginTop: "13px",
  justifyContent: "space-between",
  height: 'auto',
  borderRadius: 3,
  border: "1px solid #E1E1E1",
});

const buttonStyle = {
  borderRadius: 0,
  border: "1px solid #8E8E8E",
  backgroundColor: "#EBEBEB",
  width: "200px",
  height: "25px",
};

const UserAccess = () => {
  const [openEditUserAccessModal, setOpenEditUserAccessModal] =
    useState(false);
  const [openDeleteUserAccessModal, setOpenDeleteUserAccessModal] =
    useState(false);
  const [configured, setConfigured] = useState(false);
  const [fileCSV, setFileCSV] = useState();
  const fileReader = new FileReader();

  console.log("fileCSV", fileCSV);
  const handleChangeCSV = (e: any) => {
    setFileCSV(e.target.files[0]);

    e.preventDefault();

    //try onsubmit inside onchange itself
    if (fileCSV) {
      fileReader.onload = function (event) {
        // const csvOutput = event.target.result;
      };

      fileReader.readAsText(fileCSV);
    }
  };

  // const handleSubmitCSV = (e: any) => {
  //   e.preventDefault();

  //   if (fileCSV) {
  //     fileReader.onload = function (event) {
  //       // const csvOutput = event.target.result;
  //     };

  //     fileReader.readAsText(fileCSV);
  //   }
  // };

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
          <Tooltip title="Create Data Agreement" placement="top">
            <AddCircleOutlineOutlinedIcon style={{ cursor: "pointer", marginLeft:"7px" }}  onClick={() => {setOpenEditUserAccessModal(true)}}/>
          </Tooltip>
        </Box>
      </HeaderContainer>
      <Typography variant="body1" mt={1.35}>
        Manage how individual users of your organisation can access the privacy
        board.
      </Typography>

      <Item>
        {configured ? (
          <>
            <Box style={{ display: "flex" }}>
              <Typography color="black" variant="subtitle1">
                Authentication mechanism:
              </Typography>
              <Typography color="black" variant="subtitle1" ml={1}>
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
              <Tooltip title="Delete Data Agreement" placement="top">
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
            <Typography color="black" variant="subtitle1">
              Authentication mechanism:
            </Typography>
            <Typography color="grey" variant="subtitle1" ml={1}>
              {"<Not configured. Choose + to configure>"}
            </Typography>
          </Box>
        )}
      </Item>
      <Item>
        <Typography color="black" variant="subtitle1">
          Upload existing users via a .csv file using the UPLOAD option.
        </Typography>
        <Box>
          <label htmlFor="photo">
            <input
              accept=".csv*"
              style={{ display: "none" }}
              id="photo"
              name="photo"
              type={fileCSV === undefined ? "file" : "" }
              multiple={false}
              onChange={handleChangeCSV}
            />
            <Button
              component="span"
              variant="contained"
              // onClick={handleSubmitCSV}
              disabled={fileCSV === undefined ? false : true }
              style={{...buttonStyle, color: fileCSV === undefined ? "black" : "#BCC0C4"}}
            >
              UPLOAD
            </Button>
          </label>
        </Box>
      </Item>
      {/* Modals */}

      {/* DeletePersonalModal */}
      <GeneralModal
        open={openDeleteUserAccessModal}
        setOpen={setOpenDeleteUserAccessModal}
        headerText={"Delete User Access "}
        confirmText="DELETE"
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
        setConfigured={setConfigured}
      />
    </Container>
  );
};

export default UserAccess;
