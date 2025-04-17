import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Eye, Trash2, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";
import FormTitle from "@/components/Common/FormTitle";
import { AppDispatch, RootState } from "@/store/store";
import {
  getAllUsers,
  updateUserRoles,
  deleteUsers,
  adminCreateUser,
} from "@/store/admin/UserSlice";
import { Role, UsersRole } from "@/store/authSlice";
import { useCustomToast } from "@/hooks/useCustomToast";
import ChezFloraLoader from "@/components/Common/ChezFloraLoader";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { registerFormControls } from "@/config";
import CommonForm from "@/components/Common/Form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AddressData } from "@/components/Shopping-view/AddressCard";
// import { fetchAllAddress } from "@/store/shop/addressSlice";
import { AiOutlinePlus } from "react-icons/ai";
const initialFormData = {
  name: "",
  email: "",
  password: "",
};
const AdminCustomers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, isLoading, isUpdating, pagination } = useSelector(
    (state: RootState) => state.adminUsers
  );
  const { addressList } = useSelector((state: RootState) => state.address);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<UsersRole>(UsersRole.ALL);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { showToast } = useCustomToast();
  const [openCreateUserDialog, setOpenCreateUserDialog] =
    useState<boolean>(false);
  const [formData, setFormData] = useState(initialFormData);
  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!formData.name || !formData.email || !formData.password) {
        showToast({
          message: `All form Fields are required`,
          type: "error",
        });
        return;
      }
      await dispatch(adminCreateUser(formData))
        .unwrap()
        .then((data) => {
          if (data.success) {
            showToast({
              message: data.message,
              type: "success",
            });
          }
        });
    } catch (error: unknown) {
      console.error("Role update failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      showToast({
        message: `Registration failed: ${errorMessage}`,
        type: "error",
      });
    } finally {
      setFormData(initialFormData);
      await dispatch(
        getAllUsers({
          page: pagination.page,
          limit: pagination.limit,
          search: searchTerm,
          role: selectedRole,
        })
      ).unwrap();
    }
  };
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
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
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
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      showToast({
        message: `Delete failed: ${errorMessage}`,
        type: "error",
      });
    }
  };

  // Toggle selection for a single user
  const toggleSelectUser = (userId: string) => {
    setSelectedIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
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
  // const fetchAllUserAddress = (id: string) => {
  //   dispatch(fetchAllAddress(id));
  // };
  if (isLoading || isUpdating) {
    return (
      <div>
        <ChezFloraLoader />
      </div>
    );
  }

  return (
    <>
      <FormTitle
        title="Customer Management 👤️"
        comment="Super Admin have these authorizations on CUSTOMERS"
      />
      <Card>
        <Helmet>
          <title>Customer Management | ChezFlora Admin</title>
          <meta
            name="description"
            content="Manage customer accounts, view order history, and handle user permissions."
          />
          <meta
            property="og:title"
            content="Customer Management | ChezFlora Admin"
          />
          <meta
            property="og:description"
            content="Administer ChezFlora customer accounts and access."
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://www.chezflora.com/admin/customers"
          />
          <meta
            property="og:image"
            content="https://www.chezflora.com/images/admin-customers-preview.jpg"
          />
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
                className="pl-10 pr-4 py-2 border-gray-300 rounded-full w-full"
              />
            </div>
            <Button
              variant="default"
              className="bg-pink-200 hover:bg-pink-300"
              onClick={() => {
                setOpenCreateUserDialog(true);
                setFormData(initialFormData);
              }}
            >
              <AiOutlinePlus /> Add Customer
            </Button>
          </div>
          <Sheet
            open={openCreateUserDialog}
            onOpenChange={() => setOpenCreateUserDialog(false)}
          >
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add New Product</SheetTitle>
              </SheetHeader>
              <CommonForm
                formControls={registerFormControls}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleCreateUser}
                isBnDisabled={isLoading}
                buttonText="continue"
              />
            </SheetContent>
          </Sheet>
          {/* Filters */}
          <div className="mb-4 flex gap-4 items-center">
            <Select
              value={selectedRole}
              onValueChange={(value: UsersRole) => setSelectedRole(value)}
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

          {/* Customers Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox
                    checked={
                      selectedIds.length === users.length && users.length > 0
                    }
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
                  <TableCell>{0}</TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onValueChange={(value: Role) =>
                        handleRoleChange(user.id, value)
                      }
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
                        <Button
                          variant="ghost"
                          size="icon"
                          // onClick={fetchAllUserAddress(user.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Customer Details</DialogTitle>
                          <DialogDescription>
                            Details for {user.name}
                          </DialogDescription>
                        </DialogHeader>

                        {/* Profile Overview */}
                        <Card className="mb-4 p-4 flex items-center space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src="" alt={user.name} />
                            <AvatarFallback>
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-xl font-semibold">
                              {user.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {user.email}
                            </p>
                            <p className="mt-1 text-sm">
                              Role:{" "}
                              <span className="font-medium">{user.role}</span>
                            </p>
                            <p className="text-xs text-gray-400">
                              Joined: {formatDate(user.createdAt)}
                            </p>
                          </div>
                        </Card>

                        {/* Tabbed Details */}
                        <Tabs defaultValue="profile">
                          <TabsList>
                            <TabsTrigger value="profile">Profile</TabsTrigger>
                            <TabsTrigger value="addresses">
                              Addresses
                            </TabsTrigger>
                            <TabsTrigger value="orders">Orders</TabsTrigger>
                          </TabsList>

                          <TabsContent value="profile" className="pt-4">
                            <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                              <dt className="text-sm font-medium text-gray-600">
                                User ID
                              </dt>
                              <dd className="text-sm text-gray-800 break-all">
                                {user.id}
                              </dd>

                              <dt className="text-sm font-medium text-gray-600">
                                Last Updated
                              </dt>
                              <dd className="text-sm text-gray-800">
                                {formatDate(user.updatedAt)}
                              </dd>
                            </dl>
                          </TabsContent>

                          {/* ADDRESSES TAB */}
                          <TabsContent value="addresses" className="pt-4">
                            {addressList && addressList.length > 0 ? (
                              <Accordion type="single" collapsible>
                                {addressList.map((addr: AddressData) => (
                                  <AccordionItem value={addr.id} key={addr.id}>
                                    <AccordionTrigger>
                                      {addr.isDefault
                                        ? "🏠 Primary Address"
                                        : addr.city}
                                      , {addr.postalCode}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <p className="text-sm">
                                        <strong>Address:</strong> {addr.address}
                                      </p>
                                      <p className="text-sm">
                                        <strong>Phone:</strong> {addr.phone}
                                      </p>
                                      {addr.notes && (
                                        <p className="text-sm">
                                          <strong>Notes:</strong> {addr.notes}
                                        </p>
                                      )}
                                    </AccordionContent>
                                  </AccordionItem>
                                ))}
                              </Accordion>
                            ) : (
                              <p className="text-sm text-gray-500">
                                No addresses for this User.
                              </p>
                            )}
                          </TabsContent>

                          {/* ORDERS TAB */}
                          {/* <TabsContent
                            value="orders"
                            className="pt-4 space-y-2"
                          >
                            {user.orders.length > 0 ? (
                              user.orders.map((order) => (
                                <Card key={order.id} className="p-3">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <p className="text-sm font-medium">
                                        Order #{order.id.slice(-6)}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {formatDate(order.orderDate)}
                                      </p>
                                    </div>
                                    <div className="text-sm font-semibold">
                                      ${order.totalAmount.toFixed(2)}
                                    </div>
                                  </div>
                                  <p className="mt-1 text-xs">
                                    Status:{" "}
                                    <span className="capitalize">
                                      {order.orderStatus}
                                    </span>
                                  </p>
                                </Card>
                              ))
                            ) : (
                              <p className="text-sm text-gray-500">
                                No orders placed yet.
                              </p>
                            )}
                          </TabsContent> */}
                        </Tabs>

                        <DialogFooter className="mt-6">
                          <DialogClose asChild>
                            <Button variant="secondary">Close</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    {/* Edit Customer Dialog */}
                    {/* <Dialog>
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
                    </Dialog> */}

                    {/* Delete Customer */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={async () => {
                        try {
                          await dispatch(
                            deleteUsers({ userIds: [user.id] })
                          ).unwrap();
                          showToast({
                            message: "Customer deleted successfully",
                            type: "success",
                          });
                        } catch (error: unknown) {
                          const errorMessage =
                            error instanceof Error
                              ? error.message
                              : "An unknown error occurred";
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
              Page {pagination.page} of{" "}
              {Math.ceil(pagination.total / pagination.limit)}
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
            <Button
              variant="destructive"
              onClick={handleBulkDelete}
              disabled={isUpdating}
            >
              Delete Selected
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default AdminCustomers;
