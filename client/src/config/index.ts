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
      placeholder: "*******",
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
          placeholder: "******",
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
    placeholder: "******",
    component: "input",
    type: "password",
  },
    {
    name: "password1",
    label: "Verify Password",
    placeholder: "******",
    component: "input",
    type: "password",
  },
]

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
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
      { id: "freshflowers", label: "Fresh Flowers" },
      { id: "bouquets", label: "Bouquets" },
      { id: "pottedplants", label: "Potted Plants" },
      { id: "decoration", label: "Decoration" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];


export const categoryOptionsMap = {
  freshflowers: "Fresh Flowers",
  bouquets: "Bouquets",
  pottedplants: "Potted Plants",
  decoration: "Decoration",
};


export const filterOptions = {
  category: [
    { id: "freshflowers", label: "Fresh Flowers" },
    { id: "bouquets", label: "Bouquets" },
    { id: "pottedplants", label: "Potted Plants" },
    { id: "decoration", label: "Decoration" },
  ]
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

