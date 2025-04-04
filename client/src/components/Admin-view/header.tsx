import { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import AdminAvatarCustom from "./AdminAvatarCustom";

const AdminHeader = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return ( 
    <header className="flex items-center justify-between p-4 bg-background">

    <AdminAvatarCustom user={user}/>
    </header>
  )
}

export default AdminHeader