import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Badge } from "../ui/badge";

export interface AddressData {
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  notes?: string;
  isDefault?: boolean;
}

interface AddressCardProps {
  address: AddressData;
  onEdit?: (updatedAddress: AddressData) => void;
  onDelete?: () => void;
  onSetDefault?: () => void;
  editable?: boolean;
}

 function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
  editable = true,
}: AddressCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<AddressData>({ ...address });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit?.(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...address });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="w-full max-w-md relative">
      {address.isDefault && (
        <Badge className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
          Default
        </Badge>
      )}
      
      <CardHeader>
        <CardTitle className="text-lg">
          {isEditing ? (
            <Input
              name="address"
              value={editData.address}
              onChange={handleChange}
              placeholder="Street address"
            />
          ) : (
            address.address
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>City</Label>
            {isEditing ? (
              <Input
                name="city"
                value={editData.city}
                onChange={handleChange}
                placeholder="City"
              />
            ) : (
              <p>{address.city}</p>
            )}
          </div>
          <div>
            <Label>Postal Code</Label>
            {isEditing ? (
              <Input
                name="postalCode"
                value={editData.postalCode}
                onChange={handleChange}
                placeholder="Postal code"
              />
            ) : (
              <p>{address.postalCode}</p>
            )}
          </div>
        </div>

        <div>
          <Label>Phone</Label>
          {isEditing ? (
            <Input
              name="phone"
              value={editData.phone}
              onChange={handleChange}
              placeholder="Phone number"
            />
          ) : (
            <p>{address.phone}</p>
          )}
        </div>

        {address.notes && (
          <div>
            <Label>Delivery Notes</Label>
            {isEditing ? (
              <Input
                name="notes"
                value={editData.notes || ''}
                onChange={handleChange}
                placeholder="Delivery instructions"
              />
            ) : (
              <p className="text-sm text-muted-foreground">{address.notes}</p>
            )}
          </div>
        )}
      </CardContent>

      {editable && (
        <CardFooter className="flex justify-between gap-2 flex-wrap">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel} size="sm">
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button onClick={handleSave} size="sm">
                <Check className="mr-2 h-4 w-4" /> Save
              </Button>
            </>
          ) : (
            <>
              <div className="space-x-2">
                <Button variant="outline" onClick={handleEdit} size="sm">
                  <Edit2 className="mr-2 h-4 w-4" /> Edit
                </Button>
                {onDelete && (
                  <Button
                    variant="outline"
                    onClick={onDelete}
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                )}
              </div>
              {onSetDefault && !address.isDefault && (
                <Button
                  variant="ghost"
                  onClick={onSetDefault}
                  size="sm"
                  className="text-primary"
                >
                  Set as Default
                </Button>
              )}
            </>
          )}
        </CardFooter>
      )}
    </Card>
  );
}

export default AddressCard