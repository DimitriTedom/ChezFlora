"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = exports.upload = void 0;
const cloudinary_1 = require("cloudinary");
const env_1 = require("../core/config/env");
const multer_1 = __importDefault(require("multer"));
// Configuration Cloudinary
cloudinary_1.v2.config({
    cloud_name: env_1.envs.CLOUDINARY_CLOUD_NAME,
    api_key: env_1.envs.CLOUDINARY_API_KEY,
    api_secret: env_1.envs.CLOUDINARY_API_SECRET,
});
// Configuration Multer (stockage en mémoire)
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
            cb(new Error('Only image files are allowed!'));
        }
    },
});
// Upload de l'image sans transformation
const uploadToCloudinary = async (file) => {
    const dataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    return await cloudinary_1.v2.uploader.upload(dataUri, { resource_type: 'image' });
};
exports.uploadToCloudinary = uploadToCloudinary;
//# sourceMappingURL=cloudinary.js.map