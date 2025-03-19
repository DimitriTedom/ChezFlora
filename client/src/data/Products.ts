import { Product } from "@/pages/Shopping-view/Carts/ProductCart";

export const products: Product[] = [
  {
    id: "prod1",
    title: "Bouquet de Roses Rouges",
    price: 49.99,
    stock: 15,
    image: "https://res.cloudinary.com/demo/image/upload/v1742332575/sample_flower.webp",
    saleprice: 39.99
  },
  {
    id: "prod2",
    title: "Plantes d'Intérieur",
    price: 29.99,
    stock: 25,
    image: "https://res.cloudinary.com/demo/image/upload/v1742332575/indoor_plant.webp"
  },
  {
    id: "prod3",
    title: "Couronne Florale",
    price: 79.99,
    stock: 5,
    image: "https://res.cloudinary.com/demo/image/upload/v1742332575/floral_wreath.webp",
    saleprice: 69.99
  },
  {
    id: "prod4",
    title: "Cactus en Pot",
    price: 19.99,
    stock: 30,
    image: "https://res.cloudinary.com/demo/image/upload/v1742332575/cactus.webp"
  }
]