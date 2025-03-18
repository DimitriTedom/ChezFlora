import { AiOutlinePlus } from "react-icons/ai"; 
import { Button } from "@/components/ui/button";
import { Fragment } from "react/jsx-runtime";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import CommonForm from "@/components/Common/Form";
import { addProductFormElements } from "@/config";
import ProductImageUpload from "@/components/Admin-view/ImageUpload";


interface ProductFormData {
  image: File | null ;
  title: string;
  description: string;
  price: number;
  category: string;
  salePrice: number;
  totalStock: number;
}

const initialFormData: ProductFormData = {
  image: null,
  title: '',
  description: '',
  price: 0,
  category: '',
  salePrice: 0,
  totalStock: 0,
};

const AdminProducts = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUploadedUrl, setImageUploadedUrl] = useState<string>('');
  // const {imageUrl} = useSelector((state:RootState)=>state.imageUpload);
  const [imageLoadingState,setImageLoadingState] = useState<boolean>(false)
  useEffect(() => {
    if (imageFile) {
      setFormData(prev => ({ ...prev, image: imageFile }));
    }
  }, [imageFile]);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };
  console.log(formData);

  return (
    <Fragment>
      <div className="w-full mb-5 flex justify-end">
        <Button className="bg-pink-200 hover:bg-pink-300" onClick={() => setOpenCreateProductDialog(true)}><AiOutlinePlus/> Add New Product</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"> </div>
      <Sheet open={openCreateProductDialog} onOpenChange={()=>{setOpenCreateProductDialog(false)}}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
          <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          imageUploadedUrl={imageUploadedUrl}
          setImageUploadedUrl={setImageUploadedUrl}
          setImageLoadingState={setImageLoadingState}
          />
          <div className="py-2">
            <CommonForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            formControls={addProductFormElements}
            buttonText="Add"
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
