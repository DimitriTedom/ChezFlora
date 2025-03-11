import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "@/components/Common/Form";

import FormTitle from "@/components/Common/FormTitle";
import { ForgotPasswordFormControls } from "@/config";


const AuthLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log(formData);
    try {
      if (!formData.email) {
        throw new Error("Email is required");
      }

      // Logique de soumission (ex : appel API)
      // Simule une requête asynchrone
      await new Promise((resolve) => setTimeout(resolve, 1500));

      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password",);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className=" flex items-center justify-center flex-col text-center">
      <div className="bg-white p-8 rounded-[40px] shadow-2xl border w-full lg:px-[20rem] lg:py-[3rem] xl:px-[10rem]">
      <div className="mb-[1rem] lg:mb-[2rem]">
        <FormTitle title="Forgot password" comment="We will sent password intruction to your email"/>
        </div> 


        {/* FORMULAIRE DE CONNEXION */}
        <CommonForm
          formControls={ForgotPasswordFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          buttonText="Continue"
        />

        {/* GESTION DES ERREURS ET CHARGEMENT */}
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

        <div className="mt-4 text-center">
          <p className="text-gray-500">
            Go back for{" "}
            <Link
              to="/auth/login"
              className="text-[#F98190] hover:text-pink-700 transition-colors underline"
            >
              Sign in
            </Link>
            /
            <Link to="/auth/register" className="text-[#F98190] hover:text-pink-700 transition-colors underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;