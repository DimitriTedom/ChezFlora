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
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/ProductSlice";
import { deleteImage, clearImageData } from "@/store/imageUploadSlice";
import { useCustomToast } from "@/hooks/useCustomToast";
import { Product } from "../Shopping-view/Carts/ProductCart";
import FormTitle from "@/components/Common/FormTitle";
import AdminProductCard from "@/components/Admin-view/AdminProductCard";
import ChezFloraLoader from "@/components/Common/ChezFloraLoader";
import { Helmet } from "react-helmet-async";

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
  const { productList, isLoading } = useSelector(
    (state: RootState) => state.adminProducts
  );
  const { imageUrl, publicId } = useSelector(
    (state: RootState) => state.imageUpload
  );
  const [currentEditedId, setCurrentEditedId] = useState("");
  const [uploadedImagePublicId, setUploadedImagePublicId] = useState<string>("");

  useEffect(() => {
    dispatch(fetchAllProducts()).unwrap();
  }, [dispatch]);
  // Track uploaded images that haven't been saved yet
  useEffect(() => {
    if (imageUrl && publicId) {
      setImageUploadedUrl(imageUrl);
      setUploadedImagePublicId(publicId);
    }
  }, [imageUrl, publicId]);

  // Cleanup function to delete unused uploaded images
  const cleanupUnusedImage = async (publicIdToDelete: string) => {
    if (publicIdToDelete) {
      try {
        await dispatch(deleteImage(publicIdToDelete)).unwrap();
        console.log('Unused image cleaned up from Cloudinary');
      } catch (error) {
        console.error('Failed to cleanup unused image:', error);
      }
    }
  };

  // Handle dialog close with cleanup
  const handleDialogClose = () => {
    // If there's an uploaded image that hasn't been saved as a product, clean it up
    if (uploadedImagePublicId && currentEditedId === "") {
      cleanupUnusedImage(uploadedImagePublicId);
    }
    
    setOpenCreateProductDialog(false);
    setFormData(initialFormData);
    setImageFile(null);
    setImageUploadedUrl("");
    setUploadedImagePublicId("");
    dispatch(clearImageData());
  };
  // Update formData.image when imageUploadedUrl changes
  useEffect(() => {
    if (imageUploadedUrl) {
      setFormData((prev) => ({ ...prev, image: imageUploadedUrl }));
    }
  }, [imageUploadedUrl]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentEditedId !== "") {
      dispatch(editProduct({ id: currentEditedId, formData }))
        .unwrap()
        .then((data) => {
          console.log(data, "edit");
          showToast({
            message: `${data.message}`,
            subtitle: `${data.data.name}`,
            type: "info",
            duration: 5000,
          });
          setOpenCreateProductDialog(false);
          setFormData(initialFormData);
          setCurrentEditedId("");
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
        // console.log("Product added successfully:", data);
        showToast({
          message: `${data.data.name} added successively`,
          type: "success",
          duration: 5000,
        });
        setFormData(initialFormData);
        setImageFile(null);
        setImageUploadedUrl("");
        setUploadedImagePublicId("");
        setOpenCreateProductDialog(false);
        dispatch(clearImageData());
        dispatch(fetchAllProducts()).unwrap();
      })
      .catch((error) => {
        console.error("Failed to add product:", error);
      });
  };

  const handleDelete = (getCurrentProductId: string) => {
    console.log(getCurrentProductId);
    dispatch(deleteProduct(getCurrentProductId))
      .unwrap()
      .then((data) => {
        if (data?.success) {
          dispatch(fetchAllProducts());
          showToast({
            message: `${data.message}`,
            type: "success",
            duration: 5000,
          });
        }
      });
  };

  const isFormValid = () => {
    const keys = Object.keys(formData) as Array<keyof ProductFormData>;
    return keys.every((key) => {
      const value = formData[key];
      return value !== "" && value != null;
    });
  };
  return (
    <Fragment>
      <Helmet>
        <title>Manage Products | ChezFlora Admin</title>
        <meta
          name="description"
          content="Add, edit, or remove floral products, manage inventory, and update promotions."
        />
        <meta property="og:title" content="Manage Products | ChezFlora Admin" />
        <meta
          property="og:description"
          content="Manage ChezFlora's product catalog and inventory."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.chezflora.com/admin/products"
        />
        <meta
          property="og:image"
          content="https://chez-flora-sigma.vercel.app/flowerGen5.jpg"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Helmet>
      <div className="w-full mb-5 flex-col gap-3 flex justify-between items-center lg:flex-row">
        <div>
          <FormTitle
            title="All Products"
            comment="As an admin, you have CRUD Authorizations on Products"
          />
        </div>
        <Button
          className="bg-pink-200 hover:bg-pink-300"
          onClick={() => {
            setOpenCreateProductDialog(true);
            setCurrentEditedId("");
            setUploadedImagePublicId("");
            dispatch(clearImageData());
          }}
        >
          <AiOutlinePlus /> Add New Product
        </Button>
      </div>
      {isLoading ? (
        <ChezFloraLoader />
      ) : productList.length === 0 ? (
        <div className="flex justify-center items-center h-[300px]">
          <span className="text-3xl font-bold">
            No Product, Add products first
          </span>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {productList.map((product: Product) => (
            <AdminProductCard
              key={product.id}
              product={product}
              onEdit={(product) => {
                setFormData(product);
              }}
              onDelete={(id) => handleDelete(id)}
              setOpenCreateProductDialog={setOpenCreateProductDialog}
              setCurrentEditedId={setCurrentEditedId}
            />
          ))}
        </div>
      )}
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={handleDialogClose}
      >
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== "" ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            imageUploadedUrl={imageUploadedUrl}
            setImageUploadedUrl={setImageUploadedUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEditMode={currentEditedId ? true : false}
            uploadedImagePublicId={uploadedImagePublicId}
            setUploadedImagePublicId={setUploadedImagePublicId}
          />
          <div className="py-2">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              formControls={addProductFormElements}
              buttonText={currentEditedId !== "" ? "Edit" : "Add"}
              isBnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
