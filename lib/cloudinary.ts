import { v2 as cloudinary } from "cloudinary";
import { optimizeCloudinaryUrl } from "./cloudinary-utils";

cloudinary.config({ secure: true });

export { cloudinary, optimizeCloudinaryUrl };
