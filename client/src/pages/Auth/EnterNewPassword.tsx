// AuthRegister.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "@/components/Common/Form";
import FormTitle from "@/components/Common/FormTitle";
import { EnterNewPasswordFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { newPassword } from "@/store/authSlice"; // action asynchrone définie dans ton slice
import type { AppDispatch } from "@/store/store";

const AuthNewPassword: React.FC = () => {
  const [formData, setFormData] = useState({
    password: "",
    password1: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log(formData);
    // Vérification basique des champs
    if (!formData.password || !formData.password1) {
      setError("All fields are required");
      setLoading(false);
      return;
    }else if(formData.password !== formData.password1){
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    // console.log('at tr',formData);

    // Dispatch de l'action registerUser (qui doit être définie dans ton slice)
//     dispatch(newPassword({email:'here should be the users email',formData.password}))
//       .unwrap()
//       .then((response) => {
//         if (response?.token) {
//           localStorage.setItem("token", response.token);
//         }
//         navigate("/auth/login");
//       })
//       .catch((err: any) => {
//         setError(err || "Password modification failed");
//       })
//       .finally(() => setLoading(false));
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-[40px] shadow-2xl border w-full lg:px-[20rem] lg:py-[3rem] xl:px-[10rem]">
        <div className="mb-[2rem] lg:mb-[2rem] text-center">
          <FormTitle
            title="Enter New Password"
            comment="Please enter your new password and verify it"
          />
        </div>


        {/* Formulaire d'inscription */}
        <CommonForm
          formControls={EnterNewPasswordFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          buttonText="Continue"
        />

        {/* Gestion des erreurs et du chargement */}
        {error && (
          <p className="text-red-500 text-center mt-2">{error}</p>
        )}
        {loading && (
          <div className="flex justify-center mt-4">
            <svg
              className="animate-spin h-5 w-5 mr-3 text-pink-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 6.627 5.373 12 12 12a7.963 7.963 0 01-7.717-2.709z"
              ></path>
            </svg>
          </div>
        )}

        {/* Lien vers la connexion */}
        <div className="mt-4 text-center">
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-[#F98190] hover:text-pink-700 transition-colors underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthNewPassword