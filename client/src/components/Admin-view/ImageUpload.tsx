import { useRef } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";

interface ImageUploadProps {
    imageFile: File | null;
    setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
    imageUploadedUrl: string;
    setImageUploadedUrl: React.Dispatch<React.SetStateAction<string>>;
  }
  
  const ProductImageUpload = ({
    imageFile,
    setImageFile,
    imageUploadedUrl,
    setImageUploadedUrl,
  }: ImageUploadProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
  
    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      setImageUploadedUrl('');
    };
  return (
    <div className="w-full max-w-md mx-auto">
        <Label htmlFor="image" className="text-lg font-semibold mb-2 block">Upload image</Label>
        <div className="border border-dashed border-gray-400 rounded-lg" onDragOver={handleDragOver} onDrop={handleDrop}>
            <Input type="file" name="image" id="image-upload" className="" ref={inputRef} onChange={handleImageFileChange}/>
            {
                !imageFile ? <Label htmlFor="image-upload" className="flex flex-col items-center justify-center h-32 cursor-pointer ">
                   
                <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2"/>
                <span>Drag & Drop or Click to upload image</span>
                </Label> : (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <FileIcon className="w-8 h-8 mr-2 text-primary" />
                        </div>
                        <p className="text-sm font-medium">{imageFile.name}</p>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={() => handleRemoveImage()}>
                            <XIcon className="w-4 h-4"/>
                        </Button>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default ProductImageUpload