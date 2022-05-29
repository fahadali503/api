
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'
cloudinary.config({
    cloud_name: "dmvibgbyt",
    api_key: "785182898941522",
    api_secret: "yiUTIXXMSkivinuNwFd6C13PTZE",
})

export { cloudinary as Cloudinary }

export interface ICloudinaryImage extends UploadApiResponse {
    asset_id?: string;
    width: number,
    height: number,
    format: string,
    resource_type: string,
    bytes: number,
    url: string,
    secure_url: string,
    original_filename: string,
};