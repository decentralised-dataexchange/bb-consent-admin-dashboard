import { useContext, useState } from "react";

import {
  Grid,
  Typography,
  Box,
  Tooltip,
  Alert,
  Button,
  Snackbar,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { styled } from "@mui/material/styles";
import GeneralModal from "../../components/modals/generalModal";

import BreadCrumb from "../../components/Breadcrumbs";
import { HttpService } from "../../service/HTTPService";
import { OrganizationDetailsCRUDContext } from "../../contexts/organizationDetailsCrud";
import { LocalStorageService } from "../../service/localStorageService";
import {
  Datagrid,
  List,
  TextField,
  useRecordContext,
  useRefresh,
} from "react-admin";

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

const DetailsContainer = styled("div")({
  height: "auto",
  width: "100%",
  borderRadius: 2,
});

const Item = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
  padding: 10,
  paddingLeft: 20,
  height: "auto",
  borderRadius: 2,
  border: "1px solid #CECECE",
}));

const DeveloperAPIs = () => {
  const { organisationDetails } = useContext(OrganizationDetailsCRUDContext);
  const [showAPI, setShowAPI] = useState(false);
  const [apiKeyValue, setApiKeyValue] = useState<any>();
  const { id } = LocalStorageService.getUser();
  let stagingURL = process.env.REACT_APP_API_BASE_URL;
  const [openDeleteApiKey, setOpenDeleteApiKey] = useState(false);
  const [developerApiDeleteID, setDeveloperApiDeleteID] = useState<any>();


  const refresh = useRefresh();
  const onRefetch = () => {
    refresh();
  };

  const createNewApiKey = () => {
    let payload = {
      apiKey: {
        scopes: ["Service"],
      },
    };

    HttpService.addNewApiKey(payload).then((res) => {
      setShowAPI(true);
      setApiKeyValue(res.data.apiKey.apiKey);
      refresh();
    });
  };

  const handleCopy = () => {
    if (showAPI) {
      navigator.clipboard.writeText(apiKeyValue);
    }
  };

  const DeleteButtonField = (props: any) => {
    const record = useRecordContext(props);
    if (!record || !props.source) {
      return null;
    }
    return (
      record[props.source] && (
        <Box
          onClick={() => {setOpenDeleteApiKey(true); setDeveloperApiDeleteID(record.id)}}
          sx={{
            cursor: "pointer",
          }}
        >
          <DeleteOutlineOutlinedIcon color="disabled" />
        </Box>
      )
    );
  };

  const ExpiryField = (props: any) => {
    const record = useRecordContext(props);
    if (!record || !props.source) {
      return null;
    }
    return (
      record[props.source] && (
        <Typography variant="body2">{record[props.source]} days</Typography>
      )
    );
  };

  const ScopeField = (props: any) => {
    const record = useRecordContext(props);
    if (!record || !props.source) {
      return null;
    }
    let scopes = record[props.source];
    return (
      <Box style={{ display: "flex" }}>
        {scopes.map((scope: any, i: number) => {
          if (i + 1 === scopes.length) {
            return <Typography variant="body2">{scope} </Typography>;
          } else {
            return (
              <Typography variant="body2" style={{ marginRight: 7 }}>{scope}, </Typography>
            );
          }
        })}
      </Box>
    );
  };

  return (
    <Container>
      <BreadCrumb Link="Account" Link2="Developer APIs" />
      <Snackbar
        open={showAPI}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        style={{ top: 100 }}
      >
        <Alert
          icon={<></>}
          sx={{ width: "100%", background: "#F7F6F6", color: "black" }}
          action={
            <Button color="inherit" size="small" onClick={handleCopy}>
              COPY
            </Button>
          }
        >
          Here is your new key. Copy it now! This is the only time we will show
          it you.
        </Alert>
      </Snackbar>

      <HeaderContainer>
        <Typography variant="h6" fontWeight="bold">
          Developer APIs and Credentials
        </Typography>
      </HeaderContainer>
      <DetailsContainer sx={{ flexGrow: 1 }}>
        <Typography variant="body2" mt={1.25} mb={1}>
          All API requests require you to authenticate using the credentials
          below
        </Typography>
        <Grid container spacing={2}>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Item>
              <Typography
                color="black"
                variant="subtitle1"
                fontWeight="bold"
                mb={0.5}
              >
                Organization ID
              </Typography>
              <Typography color="grey" variant="body2">
                {organisationDetails.id}
              </Typography>
            </Item>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Item>
              <Typography
                color="black"
                variant="subtitle1"
                fontWeight="bold"
                mb={0.5}
              >
                Your User ID
              </Typography>
              <Typography color="grey" variant="body2">
                {id}
              </Typography>
            </Item>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Item>
              <Typography
                color="black"
                variant="subtitle1"
                fontWeight="bold"
                mb={0.5}
              >
                Configured base URL
              </Typography>
              <Typography color="grey" variant="body2">
                {stagingURL}
              </Typography>
            </Item>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box style={{ display: "flex", alignItems: "center" }} mt={1}>
              <Typography color="black" variant="subtitle1" fontWeight="bold">
                API Key
              </Typography>
              <Tooltip title="Create API Key" placement="top">
                <AddCircleOutlineOutlinedIcon
                  onClick={createNewApiKey}
                  style={{
                    cursor: "pointer",
                    marginLeft: "7px",
                  }}
                />
              </Tooltip>
            </Box>
            <List
              actions={false}
              sx={{ width: "100%", overflow: "hidden" }}
              empty={false}
            >
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Datagrid
                  bulkActionButtons={false}
                  sx={{
                    overflow: "auto",
                    width: "100%",
                  }}
                >
                  <TextField
                    source="id"
                    label={"API Key ID"}
                    sortable={false}
                  />
                  <ScopeField
                    source="scopes"
                    label={"Scope"}
                    sortable={false}
                  />
                  <ExpiryField
                    source="expiryInDays"
                    label={"Expiry"}
                    sortable={false}
                  />

                  <DeleteButtonField
                    source="id"
                    label={""}
                    textAlign={"center"}
                    sortable={false}
                  />
                </Datagrid>
              </Box>
            </List>
          </Grid>
        </Grid>
      </DetailsContainer>

      {/* DeletePersonalModal */}
      <GeneralModal
        open={openDeleteApiKey}
        setOpen={setOpenDeleteApiKey}
        headerText={"Delete API Key "}
        confirmText="DELETE"
        resourceName={"developerapi"}
        developerApiDeleteID={developerApiDeleteID}
        onRefetch={onRefetch}
        modalDescriptionText={
          <Typography sx={{ wordWrap: "breakWord" }}>
            You are about to delete an existing api key. Please type{" "}
            <span style={{ fontWeight: "bold" }}>DELETE</span> to confirm and
            click DELETE. This action is not reversible.
          </Typography>
        }
      />

    </Container>
  );
};

export default DeveloperAPIs;
