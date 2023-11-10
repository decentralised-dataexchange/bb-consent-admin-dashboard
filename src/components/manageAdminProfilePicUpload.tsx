import { Avatar, Box } from "@mui/material";
import LogoCammera from "../assets/camera_photo2.png";

import { Dispatch, SetStateAction } from "react";

type Props = {
  editMode: boolean;
  logoImageBase64: string;
  setLogoImageBase64: Dispatch<SetStateAction<string>>;
  setFormDataForImageUpload: any;
  previewImage: any;
  setPreviewImage: any;
};

const ManageAdminProfilePicUpload = (props: Props) => {
  const {
    setFormDataForImageUpload,
    previewImage,
    setPreviewImage,
    logoImageBase64
  } = props;

  const myFile: { file: string; imagePreviewUrl: any } = {
    file: "",
    imagePreviewUrl: "",
  };

  const handleChangeImage = async (e: any) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    let image = /image.jpeg/;

    reader.onloadend = () => {
      myFile.file = file;
      myFile.imagePreviewUrl = reader.result;
      setPreviewImage(reader.result);
    };

    if (file.type.match(image)) {
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("avatarimage", file);
      setFormDataForImageUpload(formData);
    }
  };

  return (
    <>
      {previewImage && (
        <Avatar
          src={previewImage}
          style={{
            position: "absolute",
            opacity: props.editMode ? 1 : 0,
            width: "130px",
            height: "130px",
            border: "solid white 6px",
          }}
        />
      )}
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
                onChange={handleChangeImage}
              />
            </form>
          </div>
        </Box>
      )}
    </>
  );
};

export default ManageAdminProfilePicUpload;
