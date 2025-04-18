import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { uploadImage } from "@/store/imageUploadSlice";
import { useCustomToast } from "@/hooks/useCustomToast";
import { Skeleton } from "../ui/skeleton";
import axios from "axios";

interface ImageUploadProps {
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  imageUploadedUrl: string;
  setImageUploadedUrl: React.Dispatch<React.SetStateAction<string>>;
  imageLoadingState: boolean;
  setImageLoadingState: React.Dispatch<React.SetStateAction<boolean>>;
  isEditMode:boolean;
}
const ProductImageUpload = ({
  imageFile,
  setImageFile,
  imageUploadedUrl,
  setImageUploadedUrl,
  isEditMode,
  imageLoadingState,
  setImageLoadingState,
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  console.log(isEditMode, "isEditMode");

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEditMode) return;
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageUploadedUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setImageFile(file);
      setImageUploadedUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImageUploadedUrl("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const dispatch = useDispatch<AppDispatch>();

  const { showToast } = useCustomToast();
  const handleImageSelect = async (file: File) => {
    try {
      setImageLoadingState(true);
      const result = await dispatch(uploadImage(file)).unwrap();
      console.log(result);
      setImageUploadedUrl(()=>result.data.url); // Accéder à data.url
      setImageLoadingState(false);
      showToast({
        message: result.message,
        type: "success",
        duration: 3000,
      });
      console.log(imageUploadedUrl,"upload image try")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setImageLoadingState(false);
        handleRemoveImage();
        showToast({
          message: error.message,
          type: "error",
          duration: 3000,
        });
        console.log(imageUploadedUrl,"upload image catch")
        console.log(error.message)
      }
    }
  };

  useEffect(() => {
    if (imageFile) {
      handleImageSelect(imageFile);
    }
  }, [imageFile]);
  console.log(isEditMode, "isEditMode");

  return (
    <div className="w-full max-w-md mx-auto">
      <Label htmlFor="image" className="text-lg font-semibold mb-2 block">
        Upload image
      </Label>
      <div
        className={` ${isEditMode ? "opacity-60" : ""} border border-dashed border-gray-400 rounded-lg`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          type="file"
          name="image"
          id="image-upload"
          className=""
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : "cursor-pointer"
            } flex flex-col items-center justify-center h-32  `}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & Drop or Click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-rose-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 mr-2 text-primary" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => handleRemoveImage()}
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
