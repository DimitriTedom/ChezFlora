import { addressFormControls, initalAddressFormData } from "@/config";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FormEvent, useEffect, useState } from "react";
import CommonForm from "../Common/Form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  addAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "@/store/shop/addressSlice";
import AddressCard, { AddressData } from "./AddressCard";
import { useCustomToast } from "@/hooks/useCustomToast";
import axios from "axios";

// Define interface for address form data
interface AddressFormData {
  [key: string]: unknown; // Add index signature
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  notes: string;
}

interface props {
  selectedId: string;
  setCurrentSelectedAddress: (address: AddressData) => void;
}
const Address = ({ selectedId, setCurrentSelectedAddress }: props) => {
  // Use the interface in useState
  const [formData, setFormData] = useState<AddressFormData>(initalAddressFormData);
  const dispatch = useDispatch<AppDispatch>();
  const { showToast } = useCustomToast();
  const [currentEditedId, setCurrentEditedId] = useState('');
  const { user } = useSelector((state: RootState) => state.auth);
  const { addressList } = useSelector((state: RootState) => state.address);
  const handleSubmitAddress = async (e: FormEvent) => {
    e.preventDefault();
    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initalAddressFormData);
      showToast({
        message: "You can't add more than 3 addresses",
        type: "warning",
        duration: 5000,
      });
      return;
    }
    if (!user?.id) {
      console.error("L'ID de l'utilisateur est introuvable.");
      return;
    }

    try {
      if (currentEditedId !== null) {
        const response = await dispatch(
          editAddress({ userId: user.id, addressId: currentEditedId, formData })
        ).unwrap();

        if (response.success) {
          dispatch(fetchAllAddress(user.id));
          setFormData(initalAddressFormData);
          showToast({
            message: "Address updated successfully",
            type: "success",
            duration: 5000,
          });
        }
        setCurrentEditedId('');
      } else {
        const response = await dispatch(
          addAddress({ ...formData, userId: user.id })
        ).unwrap();

        if (response.success) {
          dispatch(fetchAllAddress(user.id));
          setFormData(initalAddressFormData);
          showToast({
            message: "Address Added successfully",
            type: "success",
            duration: 5000,
          });
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {        
        console.error("Erreur lors de la soumission de l'adresse :", error);
        showToast({
          message: error.message || "Error adding address",
          type: "error",
          duration: 5000,
        });
      }
    }
  };
  const isFormValid = () => {
    return Object.keys(initalAddressFormData).every((key) => {
      const value = formData[key];
      // Check if the value is a string and trim it, otherwise treat as invalid
      return typeof value === 'string' && value.trim() !== '';
    });
  };
  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch, user]);

  const handleEdit = (getCurrentAddress: AddressData) => {
    setCurrentEditedId(getCurrentAddress.id);
    setFormData({
      ...formData,
      address: getCurrentAddress.address,
      city: getCurrentAddress.city,
      postalCode: getCurrentAddress.postalCode,
      phone: getCurrentAddress.phone,
      notes: getCurrentAddress.notes,
    });
  };

  const handleDelete = (getCurrentAddress: AddressData) => {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress.id })
    )
      .unwrap()
      .then((data) => {
        if (data.success) {
          showToast({
            message: data.message,
            type: "success",
            duration: 5000,
          });
        }
        dispatch(fetchAllAddress(user?.id));
      })
      .catch((error) => {
        showToast({
          message: error.message,
          type: "error",
          duration: 5000,
        });
      });
  };
  return (
    <Card>
      <div className="mb-3 p-3 grid grid-cols-1 sm:grid-cols-2  gap-3">
        {/* <AddressList/> */}
        {addressList && addressList.length > 0 ? (
          addressList.map((address, index) => (
            <AddressCard
              key={index}
              addressInfo={address}
              handleEditAddress={handleEdit}
              handleDeleteAddress={handleDelete}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
              selectedId={selectedId}
            />
          ))
        ) : (
          <div className="flex justify-center flex-col items-center h-[300px] self-center">
            <img
              src="/NoAddressFound.svg"
              alt="NoAddressFound.svg"
              className="w-[200px]"
            />
            <p className="text-gray-500 text-2xl font-bold text-center">
              No Address Found, Add one.
            </p>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add Address"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Provide the type argument to CommonForm */}
        <CommonForm<AddressFormData>
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmitAddress}
          buttonText={currentEditedId !== null ? "Edit" : "Add"}
          isBnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
