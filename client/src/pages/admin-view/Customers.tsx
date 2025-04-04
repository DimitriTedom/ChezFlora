import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Eye, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import FormTitle from "@/components/Common/FormTitle";
import { AppDispatch, RootState } from "@/store/store";
import { getAllUsers, updateUserRoles } from "@/store/admin/UserSlice";
// Removed unused User import
import { Role, UsersRole } from "@/store/authSlice"; 
import { useCustomToast } from "@/hooks/useCustomToast";
// import { getAllUsers, updateUserRoles, deleteUsers, selectAdminUsers } from "@/store/admin/adminUserSlice";

// Removed unused initialGetAllUsersParams constant
const AdminCustomers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, isLoading, isUpdating, error, pagination } = useSelector((state:RootState)=>state.adminUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState< UsersRole>(UsersRole.ALL);
  const {showToast} = useCustomToast();
  console.log("We are in this component")
  // Fetch users when component mounts or filters change
  useEffect(() => {
    const fetchUsers = async () => {
     await dispatch(getAllUsers({
      page: pagination.page,
      limit: pagination.limit,
      search: searchTerm,
      role: selectedRole
      }))
      .catch((error) => { // Correctly placed catch block
        console.error("Failed to fetch users:", error)
        showToast({
          message: `Failed to fetch users: ${error.message || error}`,
          type: "error",
        })
      });
    } // End of fetchUsers function
    fetchUsers()
    console.log("fetch users:" ,users)
  }, [dispatch, searchTerm, selectedRole, pagination.page, pagination.limit]); // End of useEffect

  // Correctly defined handleRoleChange function
  const handleRoleChange = async (userId: string, newRole: Role ) => {
    try {
      await dispatch(updateUserRoles({
        userIds: [userId],
        role: newRole
      })).unwrap();
    } catch (error: unknown) { // Changed type from any to unknown
      console.error("Role update failed:", error);
      // Basic error message, could add type checking for more specific messages
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      showToast({ // Added toast on role update failure
        message: `Role update failed: ${errorMessage}`, // Removed duplicate message property
        type: "error",
      })
    }
  };

  // Correctly defined handleBulkDelete function
  const handleBulkDelete = async () => {
    // Implement selection logic first
    console.log("Bulk delete not implemented yet");
    showToast({ // Placeholder toast
      message: "Bulk delete/ban not implemented yet.",
      type: "info",
    })
  };

  console.log(users,"users") // Keep console log for debugging if needed
  return (
    <>
      <FormTitle title="Customer Management 👤️" comment="Super Admin have these authorizations on USERS"/>
      <Card>
        <Helmet>
          <title>Customer Management | ChezFlora Admin</title>
          <meta name="description" content="Manage customer accounts, view order history, and handle user permissions." />
          <meta property="og:title" content="Customer Management | ChezFlora Admin" />
          <meta property="og:description" content="Administer ChezFlora customer accounts and access." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.chezflora.com/admin/users" />
          <meta property="og:image" content="https://www.chezflora.com/images/admin-users-preview.jpg" />
        </Helmet>

        <div className="p-6">
          {/* Search/Filter Bar */}
          <div className="mb-6 flex gap-4">
            <div className="relative grow">

          <SearchIcon className="w-6 h-6 text-black absolute top-2 right-3" />

            <Input 
              placeholder="Search by name/email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-full p-5 border-black"
            />
            </div>
            <Select 
              value={selectedRole} 
              onValueChange={(value:UsersRole) => setSelectedRole(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={UsersRole.ALL}>All Roles</SelectItem>
                <SelectItem value={UsersRole.USER}>Users</SelectItem>
                <SelectItem value={UsersRole.ADMIN}>Admins</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select 
                      value={user.role}
                      onValueChange={(value) => handleRoleChange(user.id, value as Role)}
                      disabled={isUpdating}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* Removed UsersRole.ALL as it's not assignable */}
                        <SelectItem value={Role.USER}>User</SelectItem>
                        <SelectItem value={Role.ADMIN}>Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>{user.updatedAt ? formatDate(user.updatedAt) : 'Never'}</TableCell>
                  <TableCell>
                    <Button variant="ghost">
                      <Eye className="w-4 h-4 mr-2" /> View Activity
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Loading and Error States */}
          {isLoading && <div className="mt-4 text-center">Loading users...</div>}
          {error && <div className="mt-4 text-red-500 text-center">Error: {error}</div>}

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-between items-center">
            <div>
              Showing {users.length} of {pagination.total} users
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={pagination.page === 1 || isLoading}
                onClick={() => dispatch(getAllUsers({
                  page: pagination.page - 1,
                  limit: pagination.limit,
                  search: searchTerm, // Keep filters on pagination
                  role: selectedRole   // Keep filters on pagination
                }))}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                // Disable if loading or if this is the last page (users fetched < limit)
                disabled={isLoading || users.length < pagination.limit} 
                onClick={() => dispatch(getAllUsers({
                  page: pagination.page + 1,
                  limit: pagination.limit,
                  search: searchTerm, // Keep filters on pagination
                  role: selectedRole   // Keep filters on pagination
                }))}
              >
                Next
              </Button>
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline">Export CSV</Button>
            <Button 
              variant="destructive"
              onClick={handleBulkDelete}
              disabled={isUpdating}
            >
              Ban Selected
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}; // Added missing closing brace for the component function

export default AdminCustomers;
