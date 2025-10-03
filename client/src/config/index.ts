import { FormControlItem } from "@/components/Common/Form";
import { Product } from "@/pages/Shopping-view/Carts/ProductCart";

// Define form data interfaces with enhanced validation
export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface EnterNewPasswordFormData {
  password: string;
  password1: string;
}

export interface AddProductFormData {
  name: string;
  description: string;
  category: string;
  event: string;
  price: number;
  saleprice?: number;
  stock: number;
}

export interface QuoteRequestFormData {
  eventType: string;
  estimatedBudget: number;
  eventDate: string;
  description: string;
}

export interface AddressFormData {
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  notes: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  address?: string;
  subject: string;
  message: string;
}

// Enhanced validation functions
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 8) {
    return { isValid: false, message: "Password must be at least 8 characters long" };
  }
  
  if (password.length > 128) {
    return { isValid: false, message: "Password must be less than 128 characters" };
  }
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[@$!%*?&]/.test(password);
  
  if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
    return {
      isValid: false,
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    };
  }
  
  return { isValid: true, message: "" };
};

export const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  return nameRegex.test(name) && name.length >= 2 && name.length <= 50;
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone) && phone.length >= 8 && phone.length <= 20;
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};


export const registerFormControls: FormControlItem[] = [
    {
      name: "name",
      label: "Name",
      placeholder: "john doe",
      component: "input",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "you@example.com",
      component: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "*********",
      component: "input",
      type: "password",
    },
]

export const LoginFormControls: FormControlItem[] = [
        {
          name: "email",
          label: "Email",
          placeholder: "you@example.com",
          component: "input",
          type: "email",
        },
        {
          name: "password",
          label: "Password",
          placeholder: "********",
          component: "input",
          type: "password",
        },
]
export const ForgotPasswordFormControls: FormControlItem[] = [
        {
          name: "email",
          label: "Email",
          placeholder: "you@example.com",
          component: "input",
          type: "email",
        },
]

export const EnterNewPasswordFormControls: FormControlItem[] = [
  {
    name: "password",
    label: "Password",
    placeholder: "*******",
    component: "input",
    type: "password",
  },
    {
    name: "password1",
    label: "Verify Password",
    placeholder: "*******",
    component: "input",
    type: "password",
  },
]

export const addProductFormElements: FormControlItem[] = [
  {
    label: "Name",
    name: "name",
    component: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    component: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    placeholder: "Select product category", // Added placeholder
    component: "select",
    options: [
      { id: "FRESH_FLOWERS", label: "Fresh Flowers" },
      { id: "BOUQUETS", label: "Bouquets" },
      { id: "POTTED_PLANTS", label: "Potted Plants" },
      { id: "DECORATION", label: "Decoration" },
    ],
  },
  {
    label: "Event",
    name: "event",
    placeholder: "Select relevant event", // Added placeholder
    component: "select",
    options: [
      { id: "WEDDING", label: "Wedding" },
      { id: "BIRTHDAY", label: "BirthDay" },
      { id: "FUNERAL", label: "Funeral" }, 
      { id: "CHRISTMASS", label: "Christmass" },
      { id: "VALENTINES", label: "Valentine's Day" },
      { id: "WOMENDAY", label: "Women's Day" },
    ],
  },
  {
    label: "Price",
    name: "price",
    component: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "saleprice",
    component: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Stock",
    name: "stock",
    component: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];


export const categoryOptionsMap = {
  FRESH_FLOWERS: "Fresh Flowers",
  BOUQUETS: "Bouquets",
  POTTED_PLANTS: "Potted Plants",
  DECORATION: "Decoration",
};


export const filterOptions = {
  category: [
    { id: "FRESH_FLOWERS", label: "Fresh Flowers" },
    { id: "BOUQUETS", label: "Bouquets" },
    { id: "POTTED_PLANTS", label: "Potted Plants" },
    { id: "DECORATION", label: "Decoration" },
  ],
  event:[
    { id: "WEDDING", label: "Wedding" },
    { id: "BIRTHDAY", label: "BirthDay" },
    { id: "FUNERAL", label: "Funeral" }, 
    { id: "CHRISTMASS", label: "Christmass" },
    { id: "VALENTINES", label: "Valentine's Day" },
    { id: "WOMENDAY", label: "Women's Day" },
  ]
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const QuoteRequestformControls: FormControlItem[] = [
  {
    name: "eventType",
    label: "Type of Event",
    placeholder: "",
    component: "select",
    options: [
      { id: "WEDDING", label: "Wedding" },
      { id: "BIRTHDAY", label: "BirthDay" },
      { id: "FUNERAL", label: "Funeral" }, 
      { id: "CHRISTMASS", label: "Christmass" },
      { id: "VALENTINES", label: "Valentine's Day" },
      { id: "WOMENDAY", label: "Women's Day" },
    ]
  },
  {
    name: "estimatedBudget",
    label: "Estimated Budget",
    placeholder: "Ex: $250",
    component: "input",
    type: "number",
  },
  {
    name: "eventDate",
    label: "Date of Event",
    placeholder: "dd/mm/yy",
    component: "input",
    type: "date", // Use date input type for better UX
  },
  {
    name: "description",
    label: "Tell us more",
    placeholder: "Tell us more about your use case...",
    component: "textarea",
  },
];

export const events = [
  {
    id: "1",
    title: "Receipt at the Presidency",
    price: 2500,
    imageUrl: "/flowerGen5.jpg",
  },
  {
    id: "2",
    title: "Elegant Garden Party",
    price: 3000,
    imageUrl: "/blog3.jpeg",
  },
  {
    id: "3",
    title: "Luxury Wedding Reception",
    price: 5000,
    imageUrl: "/blog2.jpeg",
  },
];


export const products: Product[] = [
  {
    id: "prod1",
    name: "Bouquet de Roses Rouges",
    price: 49.99,
    stock: 15,
    image: "/flowerGen5.jpg",
    saleprice: 39.99
  },
  {
    id: "prod2",
    name: "Plantes d'Intérieur",
    price: 29.99,
    stock: 25,
    image: "/flower1.jpg"
  },
  {
    id: "prod3",
    name: "Couronne Florale",
    price: 79.99,
    stock: 5,
    image: "/flower3.jpg",
    saleprice: 69.99
  },
  {
    id: "prod4",
    name: "Cactus en Pot",
    price: 19.99,
    stock: 30,
    image: "/flowerGen4(Services).jpg"
  }
]
export const initalAddressFormData = {
  address: '',
  city: '',
  postalCode: '',
  phone: '',
  notes: ''
}
export const addressFormControls:FormControlItem[] = [
  {
    label: "Address",
    name: "address",
    component: "input",
    type: "text",
    placeholder: "Enter your address Ex: 123 avenue snowdev, New york, USA",
  },
  {
    label: "City",
    name: "city",
    component: "input",
    type: "text",
    placeholder: "Enter your city Ex: New York",
  },
  {
    label: "Postal code",
    name: "postalCode",
    component: "input",
    type: "text",
    placeholder: "Enter your postal code",
  },
  {
    label: "Phone",
    name: "phone",
    component: "input",
    type: "number",
    placeholder: "Enter your phone number Ex: +1 234 567 890",
  },
  {
    label: "Notes",
    name: "notes",
    component: "textarea",
    placeholder: "Enter any additional notes",
  },
];

export  const contactFormControls: FormControlItem[] = [
    {
      name: "name",
      label: "Full Name",
      placeholder: "John Doe",
      component: "input",
      type: "text",
    },
    {
      name: "email",
      label: "Email Address",
      placeholder: "john@example.com",
      component: "input",
      type: "email",
    },
    {
      name: "phone",
      label: "Phone Number",
      placeholder: "+1 234 567 890",
      component: "input",
      type: "tel",
    },
    {
      name: "address",
      label: "Physical Address (Optional)",
      placeholder: "123 Flower Street",
      component: "input",
      type: "text",
    },
    {
      name: "subject",
      label: "Subject",
      placeholder: "Select a topic",
      component: "select",
      options: [
        { id: "product", label: "Product Question" },
        { id: "delivery", label: "Delivery Issue" },
        { id: "blog", label: "Blog Feedback" },
        { id: "business", label: "Business Collaboration" },
        { id: "other", label: "Other" },
      ],
    },
    {
      name: "message",
      label: "Your Message",
      placeholder: "Type your message here...",
      component: "textarea",
    },
  ];
