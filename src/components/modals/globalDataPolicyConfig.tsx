import React, {
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import CSS from "csstype";

import {
  Box,
  Drawer,
  Typography,
  Avatar,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Banner from "../../assets/OrganisationDefaultBanner.jpg";
import logo from "../../assets/OrganisationDefaultLogo.png";

import {
  Container,
  HeaderContainer,
  BannerContainer,
  DetailsContainer,
  FooterContainer,
  buttonStyle,
  disabledButtonstyle,
} from "./modalStyle";
import { OrganizationDetailsCRUDContext } from "../../contexts/organizationDetailsCrud";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { HttpService } from "../../service/HTTPService";

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
  backgroundColor: "transparent",
};

const dropDownStyle = {
  color: "#495057",
  border: "none",
  outline: "none",
  fontSize: "14px",
  width: "100%",
  backgroundColor: "transparent",
};

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

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

const orgTypes = [
  {
    value: "Retail",
    label: "Retail",
  },
  {
    value: "Government",
    label: "Government",
  },
  {
    value: "Finance",
    label: "Finance",
  },
  {
    value: "Healthcare",
    label: "Healthcare",
  },
  {
    value: "Automotive",
    label: "Automotive",
  },
];

export default function GlobalDataPolicyConfigModal(props: Props) {
  const { open, setOpen } = props;

  const { organisationDetails, logoImageBase64, coverImageBase64 } = useContext(
    OrganizationDetailsCRUDContext
  );
  const [policyIdForUpdatePolicy, setPolicyIdForUpdatePolicy] =
    useState<string>();
  const [listAllPoliciesLength, setListAllPoliciesLength] = useState<number>();

  const methods = useForm({
    mode: "onChange",
  });

  const { control, register, reset } = methods;

  useEffect(() => {
    let defaultValues = {
      name: "string",
      version: "string",
      url: "https://abc.org/policy.html",
      jurisdiction: "London, GB",
      industrySector: "Retail",
      dataRetentionPeriodDays: 0,
      geographicRestriction: "Europe",
      storageLocation: "Europe",
      thirdPartyDataSharing: "false",
    };

    HttpService.listAllPolicies().then((response) => {
      setListAllPoliciesLength(response.length);
      setPolicyIdForUpdatePolicy(response[0]?.id);
      // default values for hook form
      defaultValues = response[0] ? response[0] : defaultValues;
      reset({ ...defaultValues });
    });
  }, [open]);

  const onSubmit = (createdData: any) => {
    const payload = {
      policy: createdData,
    };

    if (methods.formState.isValid === true) {
      HttpService.addPolicies(payload).then((response) => {});
    } else {
      HttpService.updatePoliciesById(payload, policyIdForUpdatePolicy).then(
        () => { 
          setOpen(false)
        }
      );
    }
  };

  return (
    <React.Fragment>
      <Drawer anchor="right" open={open}>
        <Container>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <HeaderContainer>
                <Typography pl={2} color="#F3F3F6">
                  Global Data Policy Configurations{" "}
                </Typography>
                <CloseIcon
                  onClick={() => setOpen(false)}
                  sx={{ paddingRight: 2, cursor: "pointer", color: "#F3F3F6" }}
                />
              </HeaderContainer>
              <BannerContainer>
                <Box
                  style={{ height: "200px", width: "100%" }}
                  component="img"
                  alt="Banner"
                  src={
                    coverImageBase64
                      ? `data:image/jpeg;charset=utf-8;base64,${coverImageBase64}`
                      : Banner
                  }
                />
              </BannerContainer>
              <Box sx={{ marginBottom: "60px" }}>
                <Avatar
                  src={
                    logoImageBase64
                      ? `data:image/jpeg;charset=utf-8;base64,${logoImageBase64}`
                      : logo
                  }
                  style={{
                    position: "absolute",
                    marginLeft: 50,
                    marginTop: "-75px",
                    width: "130px",
                    height: "130px",
                    border: "solid white 6px",
                  }}
                />
              </Box>
              <DetailsContainer>
                <Box p={1.5}>
                  <Typography variant="h6" fontWeight="bold">
                    {organisationDetails.name}
                  </Typography>
                  <Typography color="#9F9F9F" mt={1}>
                    {organisationDetails.location}
                  </Typography>
                  <Typography variant="subtitle1" mt={2}>
                    Overview
                  </Typography>
                  <Typography
                    color="#9F9F9F"
                    mt={1}
                    sx={{ wordWrap: "breakWord" }}
                  >
                    {organisationDetails.description}
                  </Typography>

                  <Box mt={2}>
                    <Typography variant="subtitle1">
                      {" "}
                      Global Data Policy Configurations{" "}
                    </Typography>
                    <table
                      style={{
                        border: "solid 1px #dee2e6",
                        width: "100%",
                        maxWidth: "100%",
                        marginBottom: "5rem",
                        marginTop: ".5rem",
                      }}
                    >
                      <tbody>
                        <tr>
                          <th
                            style={{ ...tableCellStyle, borderTop: 0 }}
                            scope="row"
                          >
                            Policy URL
                          </th>

                          <td style={{ ...tableCellStyle, borderTop: 0 }}>
                            <input
                              autoComplete="off"
                              type="text"
                              style={inputDataConfigStyle}
                              {...register("url", {
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
                              style={inputDataConfigStyle}
                              {...register("jurisdiction", {
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

                          <td
                            style={{
                              ...tableCellStyle,
                              borderRight: 0,
                              fontSize: 12,
                            }}
                          >
                            <Controller
                              name="industrySector"
                              control={control}
                              rules={{
                                required: true,
                              }}
                              render={({ field: { onChange, value } }) => (
                                <Select
                                  onChange={(e: any) => {
                                    onChange(e);
                                  }}
                                  variant="outlined"
                                  fullWidth
                                  defaultValue={value ? value : ""}
                                  name="industrySector"
                                  style={{
                                    ...dropDownStyle,
                                    width: "250px",
                                    height: "32px",
                                  }}
                                >
                                  {orgTypes.map((Type) => (
                                    <MenuItem
                                      key={Type?.label}
                                      value={Type.value}
                                    >
                                      {Type.label}
                                    </MenuItem>
                                  ))}
                                </Select>
                              )}
                            />
                          </td>
                        </tr>

                        <tr>
                          <th style={tableCellStyle} scope="row">
                            Data retention period in year(s)
                          </th>

                          <td style={tableCellStyle}>
                            <input
                              autoComplete="off"
                              style={{
                                ...inputDataConfigStyle,
                                height: "25px",
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
                          <th style={tableCellStyle}>Geographic restriction</th>

                          <td style={{ ...tableCellStyle, borderRight: 0 }}>
                            <Controller
                              name="geographicRestriction"
                              control={control}
                              rules={{
                                required: true,
                              }}
                              render={({ field: { onChange, value } }) => (
                                <Select
                                  onChange={(e: any) => {
                                    onChange(e);
                                  }}
                                  variant="outlined"
                                  fullWidth
                                  defaultValue={value ? value : ""}
                                  name="geographicRestriction"
                                  style={{
                                    ...dropDownStyle,
                                    width: "250px",
                                    height: "32px",
                                  }}
                                >
                                  {geographicRestrictions.map((Type) => (
                                    <MenuItem
                                      key={Type?.label}
                                      value={Type.value}
                                    >
                                      {Type.label}
                                    </MenuItem>
                                  ))}
                                </Select>
                              )}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Box>
                </Box>
              </DetailsContainer>
              <FooterContainer>
                <Button
                  onClick={() => setOpen(false)}
                  style={buttonStyle}
                  sx={{ marginRight: "10px" }}
                  variant="outlined"
                >
                  Close
                </Button>
                <Button
                  variant="outlined"
                  type="submit"
                  style={
                    methods.formState.isValid
                      ? buttonStyle
                      : disabledButtonstyle
                  }
                  sx={{
                    cursor: methods.formState.isValid
                      ? "pointer"
                      : "not-allowed",
                    marginRight: "20px",
                  }}
                >
                  Save
                </Button>
              </FooterContainer>
            </form>
          </FormProvider>
        </Container>
      </Drawer>
    </React.Fragment>
  );
}
