import { FormControlItem } from "@/components/Common/Form";

export const registerFormControls = [
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

export const LoginFormControls =
    [
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
export const ForgotPasswordFormControls =
    [
        {
          name: "email",
          label: "Email",
          placeholder: "you@example.com",
          component: "input",
          type: "email",
        },
]

export const EnterNewPasswordFormControls =[
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

export const addProductFormElements = [
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
    name: "dateOfEvent",
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
    imageUrl: "/flowerGen4(Services).jpg",
  },
  {
    id: "3",
    title: "Luxury Wedding Reception",
    price: 5000,
    imageUrl: "/contact4.jpg",
  },
];