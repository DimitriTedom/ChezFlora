import { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import AvatarCustom from "../Common/Avatar.custom"

const AdminHeader = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return ( 
    <header className="flex items-center justify-between p-4 bg-background">

    <AvatarCustom user={user}/>
    </header>
  )
}

export default AdminHeader