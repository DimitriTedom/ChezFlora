import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Eye, Edit, Trash2, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";
import FormTitle from "@/components/Common/FormTitle";
import { AppDispatch, RootState } from "@/store/store";
import { getAllUsers, updateUserRoles, deleteUsers } from "@/store/admin/UserSlice";
import { Role, UsersRole } from "@/store/authSlice"; 
import { useCustomToast } from "@/hooks/useCustomToast";
import ChezFloraLoader from "@/components/Common/ChezFloraLoader";

const AdminCustomers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, isLoading, isUpdating, error, pagination } = useSelector((state: RootState) => state.adminUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<UsersRole>(UsersRole.ALL);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { showToast } = useCustomToast();

  // Fetch users when component mounts or when filters change
  useEffect(() => {
    const fetchUsers = async () => {
      await dispatch(
        getAllUsers({
          page: pagination.page,
          limit: pagination.limit,
          search: searchTerm,
          role: selectedRole,
        })
      ).catch((error) => {
        console.error("Failed to fetch users:", error);
        showToast({
          message: `Failed to fetch users: ${error.message || error}`,
          type: "error",
        });
      });
    };
    fetchUsers();
  }, []);

  // Handle role change for a single user
  const handleRoleChange = async (userId: string, newRole: Role) => {
    try {
      await dispatch(
        updateUserRoles({
          userIds: [userId],
          role: newRole,
        })
      )
        .unwrap()
        .then((data) => {
          if (data.success) {
            showToast({
              message: `Role updated successfully to ${newRole}`,
              type: "success",
            });
          }
        });
    } catch (error: unknown) {
      console.error("Role update failed:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      showToast({
        message: `Role update failed: ${errorMessage}`,
        type: "error",
      });
    }
  };

  // Handle bulk deletion of selected customers
  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      showToast({
        message: "No customers selected for deletion",
        type: "info",
      });
      return;
    }
    try {
      await dispatch(deleteUsers({ userIds: selectedIds })).unwrap();
      showToast({
        message: "Selected customers deleted successfully",
        type: "success",
      });
      setSelectedIds([]);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      showToast({
        message: `Delete failed: ${errorMessage}`,
        type: "error",
      });
    }
  };

  // Toggle selection for a single user
  const toggleSelectUser = (userId: string) => {
    setSelectedIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  // Select or deselect all users
  const handleSelectAll = () => {
    if (selectedIds.length === users.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(users.map((user) => user.id));
    }
  };

  if (isLoading || isUpdating) {
    return (
      <div>
        <ChezFloraLoader />
      </div>
    );
  }

  return (
    <>
      <FormTitle title="Customer Management 👤️" comment="Super Admin have these authorizations on CUSTOMERS" />
      <Card>
        <Helmet>
          <title>Customer Management | ChezFlora Admin</title>
          <meta name="description" content="Manage customer accounts, view order history, and handle user permissions." />
          <meta property="og:title" content="Customer Management | ChezFlora Admin" />
          <meta property="og:description" content="Administer ChezFlora customer accounts and access." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.chezflora.com/admin/customers" />
          <meta property="og:image" content="https://www.chezflora.com/images/admin-customers-preview.jpg" />
        </Helmet>

        <div className="p-6">
          {/* Top Bar: Search and Add Customer CTA */}
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-1/2">
              <SearchIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <Input
                placeholder="Search by name/email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border-gray-300 rounded-md w-full"
              />
            </div>
            <Button variant="default">
              Add Customer
            </Button>
          </div>

          {/* Filters */}
          <div className="mb-4 flex gap-4 items-center">
            <Select value={selectedRole} onValueChange={(value: UsersRole) => setSelectedRole(value)}>
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

          {/* Customers Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox
                    checked={selectedIds.length === users.length && users.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(user.id)}
                      onCheckedChange={() => toggleSelectUser(user.id)}
                    />
                  </TableCell>
                  <TableCell className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="" alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{user._count?.orders ? user._count.orders : 0}</TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onValueChange={(value: Role) => handleRoleChange(user.id, value)}
                      disabled={isUpdating}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={Role.USER}>User</SelectItem>
                        <SelectItem value={Role.ADMIN}>Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="flex items-center space-x-2">
                    {/* View Details Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Customer Details</DialogTitle>
                          <DialogDescription>
                            Details for {user.name}
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button>Close</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    {/* Edit Customer Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Customer</DialogTitle>
                          <DialogDescription>
                            Edit details for {user.name}
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button>Close</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    {/* Delete Customer */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={async () => {
                        try {
                          await dispatch(deleteUsers({ userIds: [user.id] })).unwrap();
                          showToast({
                            message: "Customer deleted successfully",
                            type: "success",
                          });
                        } catch (error: unknown) {
                          const errorMessage =
                            error instanceof Error ? error.message : "An unknown error occurred";
                          showToast({
                            message: `Delete failed: ${errorMessage}`,
                            type: "error",
                          });
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/* Table Footer */}
            <tfoot>
              <TableRow>
                <TableCell colSpan={6} className="text-sm text-gray-500">
                  Showing {users.length} of {pagination.total} customers
                </TableCell>
              </TableRow>
            </tfoot>
          </Table>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-between items-center">
            <div>
              Page {pagination.page} of {Math.ceil(pagination.total / pagination.limit)}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={pagination.page === 1 || isLoading}
                onClick={() =>
                  dispatch(
                    getAllUsers({
                      page: pagination.page - 1,
                      limit: pagination.limit,
                      search: searchTerm,
                      role: selectedRole,
                    })
                  )
                }
              >
                Previous
              </Button>
              <Button
                variant="outline"
                disabled={isLoading || users.length < pagination.limit}
                onClick={() =>
                  dispatch(
                    getAllUsers({
                      page: pagination.page + 1,
                      limit: pagination.limit,
                      search: searchTerm,
                      role: selectedRole,
                    })
                  )
                }
              >
                Next
              </Button>
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline">Export CSV</Button>
            <Button variant="destructive" onClick={handleBulkDelete} disabled={isUpdating}>
              Delete Selected
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default AdminCustomers;
