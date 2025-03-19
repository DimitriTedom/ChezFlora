import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Fragment } from "react/jsx-runtime";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import CommonForm from "@/components/Common/Form";
import { addProductFormElements } from "@/config";
import ProductImageUpload from "@/components/Admin-view/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { addNewProduct, editProduct, fetchAllProducts } from "@/store/ProductSlice";
import { useCustomToast } from "@/hooks/useCustomToast";
import { Product } from "../Shopping-view/Carts/ProductCart";
import FormTitle from "@/components/Common/FormTitle";
import AdminProductCard from "@/components/Admin-view/AdminProductCard";

export interface ProductFormData {
  image: null | string;
  name: string;
  description: string;
  price: number;
  category: string;
  saleprice: number;
  stock: number;
}

const initialFormData: ProductFormData = {
  image: null,
  name: "",
  description: "",
  price: 0,
  category: "",
  saleprice: 0,
  stock: 0,
};

const AdminProducts = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUploadedUrl, setImageUploadedUrl] = useState<string>("");
  const [imageLoadingState, setImageLoadingState] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { showToast } = useCustomToast();
  const { productList } = useSelector(
    (state: RootState) => state.adminProducts
  );
  const [currentEditedId, setCurrentEditedId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllProducts()).unwrap();
  }, [dispatch]);
  // Mettre à jour formData.image lorsque imageUploadedUrl change
  useEffect(() => {
    if (imageUploadedUrl) {
      setFormData((prev) => ({ ...prev, image: imageUploadedUrl }));
    }
  }, [imageUploadedUrl]);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentEditedId !== null) {
      dispatch(editProduct({ id: currentEditedId, formData }))
        .unwrap()
        .then((data) => {
          console.log(data, "edit");
            showToast({
              message: `${data.message}`,
              subtitle: `${data.data.name}`,
              type: "success",
              duration: 5000,
            });
            setOpenCreateProductDialog(false);
            setFormData(initialFormData);
            setCurrentEditedId(null);
            dispatch(fetchAllProducts()).unwrap();
        });
    
      return; // Empêche l'ajout d'un nouveau produit après l'édition
    }
    // Vérifier si une image a été téléchargée
    if (!formData.image) {
      alert("Please upload an image before submitting.");
      return;
    }

    // Envoyer les données du produit via Redux pour mon back
    dispatch(addNewProduct(formData))
      .unwrap()
      .then((data) => {
        console.log("Product added successfully:", data);
        showToast({
          message: `${data.data.name} added successively`,
          type: "success",
          duration: 5000,
        });
        setFormData(initialFormData);
        setImageFile(null);
        setImageUploadedUrl("");
        setOpenCreateProductDialog(false);
        dispatch(fetchAllProducts()).unwrap();
      })
      .catch((error) => {
        console.error("Failed to add product:", error);
      });
  };
  console.log(
    "product list:",
    productList,
    "uploaded image url:",
    imageUploadedUrl
  );

  return (
    <Fragment>
      <div className="w-full mb-5 flex-col gap-3 flex justify-between items-center lg:flex-row">
        <div>
          <FormTitle
            title="All Products"
            comment="As an admin, you have CRUD Authorizations on Products"
          />
        </div>
        <Button
          className="bg-pink-200 hover:bg-pink-300"
          onClick={() =>{ setOpenCreateProductDialog(true)
            setCurrentEditedId(null)
          }
          }
        >
          <AiOutlinePlus /> Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList.map((product: Product) => (
          <AdminProductCard
            key={product.id}
            product={product}
            onEdit={(product) => {
              setFormData(product);
            }}
            onDelete={(id) => dispatch(deleteProduct(id))}
            setOpenCreateProductDialog={setOpenCreateProductDialog}
            setCurrentEditedId={setCurrentEditedId}
          />
        ))}
      </div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setFormData(initialFormData)
          setImageFile(null)
          setImageUploadedUrl("")
        }}
      >
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{currentEditedId !== null ? 'Edit Product' : 'Add New Product'}</SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            imageUploadedUrl={imageUploadedUrl}
            setImageUploadedUrl={setImageUploadedUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEditMode={currentEditedId}
          />
          <div className="py-2">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              formControls={addProductFormElements}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
