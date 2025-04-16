import { BsPencil, BsTrash } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/pages/Shopping-view/Carts/ProductCart";
import { Card } from "../ui/card";

export interface AdminProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  setCurrentEditedId:(e:string)=>void; 
  setOpenCreateProductDialog: React.Dispatch<React.SetStateAction<boolean>>
  onDelete: (id: string) => void;
}

const AdminProductCard: React.FC<AdminProductCardProps> = ({
  product,
  onEdit,
  setOpenCreateProductDialog,
  setCurrentEditedId,
  onDelete
}) => {
  const discountPercentage = product.saleprice 
    ? Math.round(((product.price - product.saleprice) / product.price) * 100)
    : null;

  return (
    <Card>

    <motion.div
      className="bg-[#FFF7E0] rounded-xl sm:rounded-2xl shadow-lg overflow-hidden 
                 relative border-2 border-maroon max-w-full transition-shadow 
                 duration-300 hover:shadow-2xl"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Badge de promotion */}
      <AnimatePresence>
        {discountPercentage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="absolute top-3 left-3 z-10"
          >
            <Badge className="bg-red-500 text-white px-2.5 py-1 rounded-full">
              -{discountPercentage}% PROMO
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contrôles Admin */}
      <div className="absolute top-3 right-3 space-x-2 z-10 bg-[#FFF7E0] rounded-full">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => {onEdit(product)
            setOpenCreateProductDialog(true)
            setCurrentEditedId(product?.id)
        }
          }
          className="text-primary hover:bg-primary/90"
        >
          <BsPencil className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onDelete(product.id)}
          className="text-destructive hover:bg-destructive/10"
        >
          <BsTrash className="h-4 w-4" />
        </Button>
      </div>

      {/* Image */}
      <div className="aspect-square w-full relative">
        <img
          src={product.image || "/placeholder-image.jpg"}
          alt={product.name}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      </div>

      {/* Contenu */}
      <div className="p-4 sm:p-6 space-y-4">
        {/* Titre et stock */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate flex-1">
            {product.name}
          </h2>
          <div className="flex items-center gap-1 text-gray-600">
            <span className="text-sm sm:text-base">Stock: {product.stock}</span>
          </div>
        </div>

        {/* Prix */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {discountPercentage ? (
            <>
              <div className="flex items-center gap-3">
                <p className="text-gray-400 line-through text-sm sm:text-base">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-green-600 text-xl sm:text-2xl font-bold">
                  ${product.saleprice?.toFixed(2) || product.price.toFixed(2)}
                </p>
              </div>
            </>
          ) : (
            <p className="text-gray-700 text-lg sm:text-xl font-bold">
              ${product.price.toFixed(2)}
            </p>
          )}
        </div>

        {/* Boutons d'action */}
        <div className="flex gap-2 mt-2 w-full">
          <Button 
            variant="outline" 
            onClick={() => {onEdit(product)
                setOpenCreateProductDialog(true)
                setCurrentEditedId(product?.id)
            }}
            className="flex-1"
          >
            Edit
          </Button>
          <Button 
            variant="destructive" 
            onClick={() => onDelete(product?.id)}
            className="flex-1"
          >
            Delete
          </Button>
        </div>
      </div>
    </motion.div>
    </Card>

  );
};

export default AdminProductCard;