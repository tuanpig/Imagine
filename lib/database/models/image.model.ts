import { Schema, model, models } from "mongoose"

import { Types } from "mongoose";

export interface IImage extends Document {
  _id?: Types.ObjectId;          // MongoDB automatically adds this
  title: string;                 // Image title or description
  transformationType: string;    // Type of edit (e.g., "blur", "resize")
  publicId: string;              // Cloudinary public ID
  secureUrl: string;             // Secure image URL (should be string, not URL)
  width?: number;                // Optional width in pixels
  height?: number;               // Optional height in pixels
  config?: Record<string, any>;  // Optional config object
  transformationUrl?: string;    // Optional transformed image URL
  aspectRatio?: string;          // Optional aspect ratio, e.g. "16:9"
  color?: string;                // Optional color data
  prompt?: string;               // Optional AI generation prompt
  author?: {
    _id: string;
    firstName: string;
    lastName: string;
  }     // Reference to User collection
  createdAt?: Date;              // Creation date
  updatedAt?: Date;              // Last update date
}


const ImageSchema = new Schema({
    title: { type:String,  required: true },
    transformationType: { type:String, required: true },
    publicId: { type: String, required: true },
    secureUrl: { type: URL, required: true },
    width: { type: Number },
    height: { type: Number },
    config: { type: Object },
    transformationUrl: { type: URL },
    aspectRatio: { type: String },
    color: { type: String },
    prompt: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    createAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now}
});

const Image = models?.Image || model('Image', ImageSchema)

export default Image;