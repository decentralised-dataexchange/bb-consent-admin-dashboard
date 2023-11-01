import { useContext, useEffect, useState } from "react";

import { Grid, Typography, Box, Tooltip } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { styled } from "@mui/material/styles";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

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
  const [firstAPIKeyDetailsInListApiKey, setFirstAPIKeyDetailsInListApiKey] =
    useState<any>();
  const [showHideButton, setShowHideButton] = useState<boolean>(false);
  const [apiKeyValue, setApiKeyValue] = useState<any>();
  let stagingURL = process.env.REACT_APP_API_BASE_URL;
  const refresh = useRefresh();

  useEffect(() => {
    HttpService.listAllApiKeys(0, 100).then((res) => {
      setFirstAPIKeyDetailsInListApiKey(res.apiKeys);
    });
  }, []);

  const createNewApiKey = () => {
    if (firstAPIKeyDetailsInListApiKey?.length === 0) {
      let payload = {
        apiKey: {
          scopes: ["service"],
        },
      };

      HttpService.addNewApiKey(payload).then((res) => {
        setShowAPI(true);
        setShowHideButton(true);
        setApiKeyValue(res.data.apiKey.apiKey);
        refresh();
      });
    }
  };

  const deleteApiKey = () => {
    if (firstAPIKeyDetailsInListApiKey?.length !== 0) {
      HttpService.deleteApiKey(firstAPIKeyDetailsInListApiKey[0].id).then(
        () => {
          refresh();
        }
      );
    }
  };

  const handleCopy = () => {
    if (showAPI) {
      navigator.clipboard.writeText(apiKeyValue);
    }
  };

  const onChangeShowHideButton = () => {
    if (showAPI === true) {
      setShowHideButton(!showHideButton);
    }
  };
  const { id } = LocalStorageService.getUser();

  const APIKeyField = (props: any) => {
    const record = useRecordContext(props);
    if (!record || !props.source) {
      return null;
    }
    return record[props.source] && showAPI && showHideButton === true ? (
      <TextField {...props} sx={{ wordBreak: "break-all" }} />
    ) : (
      <Typography sx={{ wordBreak: "break-all" }}>
        ****************************************************************************************************************************************************************************************************************************************************************************************************************************************************
      </Typography>
    );
  };

  const CopyButtonField = (props: any) => {
    const record = useRecordContext(props);
    if (!record || !props.source) {
      return null;
    }
    return (
      record[props.source] && (
        <Box
          sx={{
            cursor: showAPI ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
          }}
          onClick={handleCopy}
        >
          <ContentCopyOutlinedIcon style={{ marginRight: 5 }} />
          <Typography variant="body2">Copy</Typography>
        </Box>
      )
    );
  };

  const DeleteButtonField = (props: any) => {
    const record = useRecordContext(props);
    if (!record || !props.source) {
      return null;
    }
    return (
      record[props.source] && (
        <Box
          onClick={deleteApiKey}
          sx={{
            cursor:
              firstAPIKeyDetailsInListApiKey?.length !== 0
                ? "pointer"
                : "not-allowed",
            display: "flex",
            alignItems: "center",
          }}
        >
          <DeleteOutlineOutlinedIcon style={{ marginRight: 5 }} />
          <Typography variant="body2">Delete</Typography>
        </Box>
      )
    );
  };

  const ShowKeyButtonField = (props: any) => {
    const record = useRecordContext(props);
    if (!record || !props.source) {
      return null;
    }
    return record[props.source] && showHideButton === true ? (
      <Box
        onClick={onChangeShowHideButton}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: showAPI ? "pointer" : "not-allowed",
        }}
      >
        <VisibilityOffOutlinedIcon style={{ marginRight: 5 }} />
        <Typography variant="body2">Hide</Typography>
      </Box>
    ) : (
      <Box
        onClick={onChangeShowHideButton}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: showAPI ? "pointer" : "not-allowed",
        }}
      >
        <VisibilityOutlinedIcon style={{ marginRight: 5 }} />

        <Typography variant="body2">Show</Typography>
      </Box>
    );
  };

  return (
    <Container>
      <BreadCrumb Link="Account" Link2="Developer APIs" />
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
                    cursor:
                      firstAPIKeyDetailsInListApiKey?.length === 0
                        ? "pointer"
                        : "not-allowed",
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
                  <APIKeyField source="apiKey" label={"API Key"} />
                  <ShowKeyButtonField
                    source="apiKey"
                    label={"Show / Hide"}
                    textAlign={"center"}
                  />
                  <CopyButtonField
                    source="apiKey"
                    label={"Copy"}
                    textAlign={"center"}
                  />
                  <DeleteButtonField
                    source="apiKey"
                    label={"Delete"}
                    textAlign={"center"}
                  />
                </Datagrid>
              </Box>
            </List>
          </Grid>
        </Grid>
      </DetailsContainer>
    </Container>
  );
};

export default DeveloperAPIs;
