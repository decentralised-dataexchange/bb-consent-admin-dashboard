import { useState } from "react";
import { List, Datagrid, TextField, Form, useRecordContext } from "react-admin";

import { Box, Typography, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

// icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import BreadCrumb from "../../components/Breadcrumbs";
import GeneralModal from "../../components/modals/generalModal";
import EditWebhooks from "../../components/modals/editwebhooksmodal";
import RecentDeliveries from "../../components/webhooks/recentDeliveries";

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
  marginTop: '10px',
});

const Webhooks = () => {
  const [openEditWebhooks, setOpenEditWebhooks] = useState(false);
  const [openDeleteWebhooks, setOpenDeleteWebhooks] = useState(false);
  const [showRecentDeliveries, setShowRecentDeliveries] = useState(false)
  const record = useRecordContext();

  return (
    <Container>
      <List actions={false} sx={{ width: "100%", overflow: "hidden" }}>
        <Form>
          <BreadCrumb Link="Account" Link2="Webhooks" />
          <HeaderContainer>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Webhooks
              </Typography>
              <Tooltip title="Create Webhooks" placement="top">
                <AddCircleOutlineOutlinedIcon
                  onClick={() => setOpenEditWebhooks(true)}
                  style={{ cursor: "pointer", marginLeft: "7px" }}
                />
              </Tooltip>
            </Box>
          </HeaderContainer>
          <Typography variant="body1" mt={1.25}>
            Manage webhooks for user events. Webhooks allow external services to
            be notified when certain events happen.
          </Typography>
        </Form>
        <Box style={{ display: "flex", justifyContent:"center", marginTop:"20px"}}>
          <Datagrid bulkActionButtons={false} sx={{ overflow: "auto" , width:{xs:"359px",sm:"100%",md:"100%", lg:"100%"}}} >
            <TextField source="callBackURL" label={"Call Back URL"} onClick={()=> setShowRecentDeliveries(!showRecentDeliveries)} sx={{cursor:"pointer"}}/>
            <TextField source="status" label={"Status"}/>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Tooltip title="Edit Webhooks" placement="top">
                <EditOutlinedIcon
                  onClick={() => {
                    setOpenEditWebhooks(true);
                  }}
                  fontSize="small"
                  color="disabled"
                  style={{ cursor: "pointer", marginRight:10 }}
                />
              </Tooltip>
              <Tooltip title="Delete Webhooks" placement="top">
                <DeleteOutlineOutlinedIcon
                  onClick={() => setOpenDeleteWebhooks(true)}
                  fontSize="small"
                  color="disabled"
                  style={{ cursor: "pointer" }}
                />
              </Tooltip>
            </Box>
          </Datagrid>
        </Box>
      </List>

      {showRecentDeliveries && <RecentDeliveries />}

      {/* Modals */}

      {/* DeletePersonalModal */}
      <GeneralModal
        open={openDeleteWebhooks}
        setOpen={setOpenDeleteWebhooks}
        headerText={"Delete Personal Data: "}
        dataExchange={"Aadhar name"}
        confirmText="DELETE"
        modalDescriptionText={
          <Typography sx={{ wordWrap: "breakWord" }}>
            You are about to delete an existing personal data. Please type{" "}
            <span style={{ fontWeight: "bold" }}>DELETE</span> to confirm and
            click DELETE. This action is not reversible.
          </Typography>
        }
      />

      <EditWebhooks
        open={openEditWebhooks}
        setOpen={setOpenEditWebhooks}
        headerText={"Webhook Configuration"}
      />
    </Container>
  );
};

export default Webhooks;
