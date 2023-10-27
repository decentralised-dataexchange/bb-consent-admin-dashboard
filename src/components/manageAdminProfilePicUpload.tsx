import { Avatar, Box } from "@mui/material";
import LogoCammera from "../assets/camera_photo2.png";
import DefaultLogo from "../assets/OrganisationDefaultLogo.png";

import { HttpService } from "../service/HTTPService";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { LocalStorageService } from "../service/localStorageService";

type Props = {
  editMode: boolean;
  logoImageBase64: string;
  setLogoImageBase64: Dispatch<SetStateAction<string>>;
};

const ManageAdminProfilePicUpload = (props: Props) => {
  const { logoImageBase64, setLogoImageBase64 } = props;

  const myFile: { file: string; imagePreviewUrl: any } = {
    file: "",
    imagePreviewUrl: "",
  };

  const handleCsvFile = async (e: any) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    let image = /image.jpeg/;

    reader.onloadend = () => {
      myFile.file = file;
      myFile.imagePreviewUrl = reader.result;
    };

    if (file.type.match(image)) {
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("avatarimage", file);

      HttpService.updateAdminAvatar(formData)
        .then((res) => {
          // Get the newly uploaded image from the server
          HttpService.getAdminAvatarImage().then((imageBase64) => {
            setLogoImageBase64(imageBase64);
            LocalStorageService.updateProfilePic(imageBase64);
          });
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        });
    }
  };

  return (
    <>
      <Avatar
        src={
          logoImageBase64 &&
          `data:image/jpeg;charset=utf-8;base64,${logoImageBase64}`
        }
        style={{
          position: "absolute",
          opacity: props.editMode ? 0.75 : 1,
          width: "130px",
          height: "130px",
          border: "solid white 6px",
        }}
      />
      {props.editMode && (
        <Box style={{ position: "relative" }}>
          <div>
            <form>
              <label className="uptext" htmlFor="uploadProfileImage">
                <img
                  style={{
                    opacity: 0.45,
                    height: "120px",
                    width: "120px",
                    cursor: "pointer",
                  }}
                  src={LogoCammera}
                  alt="img"
                />
              </label>
              <input
                type="file"
                accept="image/jpeg,image/jpg"
                id="uploadProfileImage"
                name="uploadProfileImage"
                hidden={true}
                onChange={handleCsvFile}
              />
            </form>
          </div>
        </Box>
      )}
    </>
  );
};

export default ManageAdminProfilePicUpload;
