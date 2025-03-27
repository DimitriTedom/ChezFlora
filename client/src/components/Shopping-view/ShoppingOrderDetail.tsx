import React from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const ShoppingOrderDetail = () => {
  return (
    <DialogContent className="sm-max-x-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground font-medium">
              Order ID
            </p>
            <Label className="text-sm font-medium">#123456</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground font-medium">
              Order Date
            </p>
            <Label className="text-sm font-medium">27/03/2025</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground font-medium">
              Order Status
            </p>
            <Label className="text-sm font-medium">PENDING</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground font-medium">
              Order Price
            </p>
            <Label className="text-sm font-medium">$500</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium text-sm text-muted-foreground">
              Order Details
            </div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>Product One</span>
                <span>$100</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium text-sm">Shipping Info</div>
            <div className="grid gap-0.5 text-gray-400">
              <span>John Doe</span>
              <span>Address</span>
              <span>City</span>
              <span>Postal Code</span>
              <span>Phone</span>
              <span>Notes</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default ShoppingOrderDetail;
