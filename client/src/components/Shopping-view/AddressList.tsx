import { useState } from "react";
import  AddressCard, { AddressData }  from "./AddressCard";

function AddressList() {
  const [addresses, setAddresses] = useState<AddressData[]>([
    {
      address: "123 Flower Street",
      city: "Garden City",
      postalCode: "12345",
      phone: "555-123-4567",
      notes: "Ring doorbell twice",
      isDefault: true,
    },
    // ... more addresses
  ]);

  const handleEdit = (index: number, updatedAddress: AddressData) => {
    const newAddresses = [...addresses];
    newAddresses[index] = updatedAddress;
    setAddresses(newAddresses);
  };

  const handleDelete = (index: number) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  const handleSetDefault = (index: number) => {
    setAddresses(
      addresses.map((addr, i) => ({
        ...addr,
        isDefault: i === index,
      }))
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {addresses.map((address, index) => (
        <AddressCard
          key={index}
          address={address}
          onEdit={(updated) => handleEdit(index, updated)}
          onDelete={() => handleDelete(index)}
          onSetDefault={() => handleSetDefault(index)}
        />
      ))}
    </div>
  );
}
export default AddressList