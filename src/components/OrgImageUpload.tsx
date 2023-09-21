import BannerCammera from "../assets/camera_photo1.png";
import LogoCammera from "../assets/camera_photo2.png";

interface OrgImageUploadProps {
    imageType : "logo" | "banner",
    size?: 'small'
}

const OrgImageUpload = (props: OrgImageUploadProps) => {
    const { imageType, size } = props
    return (
        <div>
            <form>
                <label className="uptext" htmlFor="browse">
                    <img
                        style={{ borderRadius: 50, opacity: .45, height:size=== "small" ? "120px" : "auto", width:size=== "small" ? "120px" : "auto" }}
                        src={imageType === "banner" ? BannerCammera : LogoCammera }
                        alt='editcover'
                    />
                </label>
                <input
                    type="file"
                    accept="image/jpeg,image/jpg"
                    id="browse"
                    name="browse"
                    hidden={true}
                />
            </form>
        </div>
    );
}

export default OrgImageUpload;