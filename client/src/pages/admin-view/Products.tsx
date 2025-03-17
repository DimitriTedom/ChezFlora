import { AiOutlinePlus } from "react-icons/ai"; 
import { Button } from "@/components/ui/button";
import { Fragment } from "react/jsx-runtime";

const AdminProducts = () => {
  return (
    <Fragment>
      <div className="w-full mb-5 flex justify-end">
        <Button className="bg-pink-200 hover:bg-pink-300"><AiOutlinePlus/> Add New Product</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"> </div>
    </Fragment>
  );
};

export default AdminProducts;
