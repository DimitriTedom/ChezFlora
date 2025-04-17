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
  const [currentEditedId, setCurrentEditedId] = useState('');

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

    if (currentEditedId !== '') {
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
          setCurrentEditedId('');
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
        setOpenCreateProductDialog(false);
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
    return Object.keys(formData)
      .map((key: string|number) => formData[key] !== "")
      .every((item) => item);
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
          content="https://www.chezflora.com/images/admin-products-preview.jpg"
        />
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
            setCurrentEditedId('');
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
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setFormData(initialFormData);
          setImageFile(null);
          setImageUploadedUrl("");
        }}
      >
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== '' ? "Edit Product" : "Add New Product"}
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
          />
          <div className="py-2">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              formControls={addProductFormElements}
              buttonText={currentEditedId !== '' ? "Edit" : "Add"}
              isBnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
