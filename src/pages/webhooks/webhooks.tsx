import { useState } from "react";
import { List, Datagrid, TextField, Form,  useRefresh } from "react-admin";

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
import { HttpService } from "../../service/HTTPService";
import { useParams } from "react-router-dom";

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
  marginTop: "10px",
});

const Webhooks = () => {
  const [openEditWebhooks, setOpenEditWebhooks] = useState(false);
  const [openDeleteWebhooks, setOpenDeleteWebhooks] = useState(false);
  const [showRecentDeliveries, setShowRecentDeliveries] = useState(false);
  const [recentDeliveryValues, setRecentDeliveryValues] = useState([]);

  const [modeOfPopup, setModeOfPopup] = useState("");
  const params = useParams();
  const selectedWebhooksId = params["*"];
  
  const refresh = useRefresh();
   
  const onRefetch = () => {
    refresh();
  };

  const recentDeliveries = () => {
    setShowRecentDeliveries(!showRecentDeliveries);
    HttpService.getWebhooksRecentDeliveries(selectedWebhooksId)
    .then((res)=>{
      setRecentDeliveryValues(res.data.webhookDeliveries)
    })
  };

  return (
    <Container>
      <List
        empty={false}
        actions={false}
        sx={{ width: "100%", overflow: "hidden" }}
      >
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
                  onClick={() => {
                    setOpenEditWebhooks(true);
                    setModeOfPopup("Create");
                  }}
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
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Datagrid
            bulkActionButtons={false}
            rowClick="edit"
            sx={{
              overflow: "auto",
              width: { xs: "359px", sm: "100%", md: "100%", lg: "100%" },
            }}
          >
            <TextField
              source="payloadUrl"
              label={"Call Back URL"}
              onClick={recentDeliveries}
              sx={{ cursor: "pointer" }}
            />
            <TextField source="disabled" label={"Status"} />
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
                    setModeOfPopup("Update");
                  }}
                  fontSize="small"
                  color="disabled"
                  style={{ cursor: "pointer", marginRight: 10 }}
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

      {showRecentDeliveries && recentDeliveryValues && <RecentDeliveries recentDeliveryValues={recentDeliveryValues} />}

      {/* Modals */}

      {/* DeletePersonalModal */}
      <GeneralModal
        open={openDeleteWebhooks}
        setOpen={setOpenDeleteWebhooks}
        headerText={"Delete Webhooks "}
        confirmText="DELETE"
        resourceName={"webhooks"}
        onRefetch={onRefetch}
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
        mode={modeOfPopup}
        onRefetch={onRefetch}
      />
    </Container>
  );
};

export default Webhooks;
