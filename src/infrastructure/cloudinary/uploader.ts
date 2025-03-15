import cloudinary from "./cloudinary"
import streamifier from "streamifier"

// Function to upload image to Cloudinary
export const uploadImageToCloudinary = async (filebuffer: Buffer): Promise<string | null> => {
    return new Promise((resolve, reject) => {
        streamifier.createReadStream(filebuffer).pipe(cloudinary.uploader.upload_stream({ folder: "uploads" }, (err, result) => {
            if (err) reject(null)
            else resolve(result.secure_url)
        }))
    })
}