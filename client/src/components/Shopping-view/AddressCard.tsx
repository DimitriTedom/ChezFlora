import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

export interface AddressData {
  id: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  notes: string;
  isDefault?: boolean;
}

interface AddressCardProps {
  addressInfo: AddressData;
  handleDeleteAddress: (address: AddressData) => void;
  handleEditAddress: (address: AddressData) => void;
  setCurrentSelectedAddress?: (address: AddressData) => void;
  selectedId?: string;
}

 function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}: AddressCardProps) {
  return (
    <Card
      onClick={() => { // Corrected onClick handler
        if (setCurrentSelectedAddress) {
          setCurrentSelectedAddress(addressInfo);
        }
      }}
      className={`w-full max-w-md relative transition-all cursor-pointer ${ // Added cursor-pointer for better UX
        selectedId === addressInfo.id
          ? "border-2 border-primary shadow-lg"
          : "border border-gray-200"
      }`}
    >
      {selectedId === addressInfo.id && (
        <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
          Default
        </Badge>
      )}

      <CardHeader>
        <CardTitle className="text-lg">{addressInfo.address}</CardTitle>
        <Separator />
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-muted-foreground">City</Label>
            <p>{addressInfo.city}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Postal Code</Label>
            <p>{addressInfo.postalCode}</p>
          </div>
        </div>

        <div>
          <Label className="text-muted-foreground">Phone</Label>
          <p>{addressInfo.phone}</p>
        </div>

        {addressInfo.notes && (
          <div>
            <Label className="text-muted-foreground">Delivery Notes</Label>
            <p className="text-sm">{addressInfo.notes}</p>
          </div>
        )}
      </CardContent>


      <Separator />
      <CardFooter className="p-4 flex justify-between self-end">
        <Button
          variant="outline"
          onClick={(e) => {
            e.stopPropagation(); // Keep stopPropagation to prevent card click when editing
            handleEditAddress(addressInfo);
          }}
          className="gap-2"
        >
          <Edit2 className="h-4 w-4" /> Edit
        </Button>
        <Button
          variant="outline"
          onClick={(e) => {
            e.stopPropagation(); // Keep stopPropagation to prevent card click when deleting
            handleDeleteAddress(addressInfo);
          }}
          className="gap-2 text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
