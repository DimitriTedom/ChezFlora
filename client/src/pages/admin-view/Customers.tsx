import FormTitle from "@/components/Common/FormTitle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { Eye } from "lucide-react";
import { Helmet } from "react-helmet-async";

const AdminCustomers = () => {
  return (
    <>
    <FormTitle title="Customer Management 👤️" comment="Super Admin have these authorizations on USERS"/>
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
          content="https://www.chezflora.com/admin/users"
        />
        <meta
          property="og:image"
          content="https://www.chezflora.com/images/admin-users-preview.jpg"
        />
      </Helmet>
      <div className="p-6">      
      {/* Search/Filter Bar */}
      <div className="mb-6 flex gap-4">
        <Input placeholder="Search by name/email..." />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="USER">Users</SelectItem>
            <SelectItem value="ADMIN">Admins</SelectItem>
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
        {/* <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Select 
                  value={user.role}
                  onValueChange={(value) => handleRoleUpdate(user.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{formatDate(user.createdAt)}</TableCell>
              <TableCell>{formatDate(user.lastLogin)}</TableCell>
              <TableCell>
                <Button variant="ghost" onClick={() => handleImpersonate(user.id)}>
                  <Eye className="w-4 h-4 mr-2" /> View Activity
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody> */}
      </Table>

      {/* Bulk Actions */}
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline">Export CSV</Button>
        <Button variant="destructive">Ban Selected</Button>
      </div>
    </div>
    </Card>
    </>
  );
};

export default AdminCustomers;
