import { addressFormControls, initalAddressFormData } from "@/config"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { FormEvent, useState } from "react"
import CommonForm from "../Common/Form"
import AddressList from "./AddressList"


const Address = () => {
    const [formData,setFormData] = useState(initalAddressFormData);
    const handleSubmitAddress = (e:FormEvent) =>{
        e.preventDefault()
    }
    const isFormValid = () => {
        return Object.keys(formData).map(key=> formData[key].trim() !== '').every(item => item);
    }
  return (
    <Card>
        <div>Address List
            <AddressList/>
        </div>
        <CardHeader>
            <CardTitle>Add New Address</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
            <CommonForm
                formControls={addressFormControls}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmitAddress}
                buttonText={"Add"}
                isBnDisabled={!isFormValid()}
            />
        </CardContent>
    </Card>

  )
}

export default Address