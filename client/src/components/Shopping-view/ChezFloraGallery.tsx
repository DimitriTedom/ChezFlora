import * as React from "react";
import { useState } from "react";
// Adaptez les imports de ShadCN UI et Lucide selon votre structure
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

export interface ChezFloraGalleryProps {
  images: string[];
}

 function ChezFloraGallery({ images }: ChezFloraGalleryProps) {
  // On prend la première image comme image principale par défaut, s’il y en a
  const [mainImage, setMainImage] = useState<string>(
    images?.length ? images[0] : ""
  );
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">

      {/* Image principale */}
      <div className="mb-4">
        {mainImage ? (
          <img
            src={mainImage}
            alt="Main"
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
            <span className="text-gray-500">Aucune image disponible</span>
          </div>
        )}
      </div>

      {/* Miniatures (thumbnails) */}
      {images && images.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setMainImage(img)}
              className="focus:outline-none"
            >
              <img
                src={img}
                alt={`Thumbnail ${index}`}
                className={`w-24 h-16 object-cover rounded-md shadow-sm
                  hover:opacity-80 transition-opacity
                  ${mainImage === img ? "ring-2 ring-pink-500" : ""}`}
              />
            </button>
          ))}
        </div>
      )}

      {/* Bouton pour tout afficher (ouvre le Dialog) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className="px-4 py-2 bg-pink-300 text-white rounded-md 
                       hover:bg-pink-400 transition-colors"
          >
            Show all
          </button>
        </DialogTrigger>

        {/* Contenu du Dialog */}
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="text-2xl font-bold">All Photos</span>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </DialogTitle>
            <DialogDescription>
              Click on an image to see it bigger
            </DialogDescription>
          </DialogHeader>

          {/* Grille de toutes les images */}
          {images && images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setMainImage(img);
                    setOpen(false);
                  }}
                  className="focus:outline-none"
                >
                  <img
                    src={img}
                    alt={`Photo ${index}`}
                    className="w-full h-auto rounded-md shadow-sm hover:opacity-80 transition-opacity"
                  />
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4">
              <p className="text-gray-500">Aucune image disponible</p>
            </div>
          )}

          <DialogFooter>
            <button
              className="px-4 py-2 bg-pink-200 rounded-md 
                         hover:bg-pink-300 transition-colors"
              onClick={() => setOpen(false)}
            >
              Fermer
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default ChezFloraGallery;