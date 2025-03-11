// AuthRegister.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "@/components/Common/Form";
import { AiOutlineFacebook, AiOutlineTwitter } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import FormTitle from "@/components/Common/FormTitle";
import { registerFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/authSlice"; // action asynchrone définie dans ton slice
import type { AppDispatch } from "@/store/store";
import { useCustomToast } from "../../hooks/useCustomToast";


interface SocialButton {
  content: string;
  icon: React.ReactNode;
  to: string;
  color?: string;
}

const AuthRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showCustomToast } = useCustomToast();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log(formData);
    // Vérification basique des champs
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }
    // console.log('at tr',formData);
    // Dispatch de l'action registerUser (qui doit être définie dans ton slice)
    dispatch(registerUser(formData))
      .unwrap()
      .then((response) => {
        // Par exemple, si la réponse contient un token, on peut le stocker
        if (response?.token) {
          localStorage.setItem("token", response.token);
        }
        navigate("/auth/login");
      })
      .catch((err: any) => {
        setError(err || "Registration failed");
      })
      .finally(() => setLoading(false));
  };

  const socialButtons: SocialButton[] = [
    {
      content: "Continue with Facebook",
      icon: <AiOutlineFacebook color="#3b5998" size={24} />,
      to: "/facebook-login",
    },
    {
      content: "Continue with Google",
      icon: <FcGoogle size={24} />,
      to: "/google-login",
    },
    {
      content: "Continue with Twitter",
      icon: <AiOutlineTwitter color="#1da1f2" size={24} />,
      to: "/twitter-login",
    },
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-[40px] shadow-2xl border w-full lg:px-[20rem] lg:py-[3rem] xl:px-[10rem]">
        <div className="mb-[1rem] lg:mb-[2rem]">
          <FormTitle
            title="Sign Up"
            comment="Welcome to our blog magazine Community"
          />
        </div>

        {/* Boutons de connexion via réseaux sociaux */}
        <div className="space-y-3 mb-6">
          {socialButtons.map((button, index) => (
            <Link
              key={index}
              to={button.to}
              className="relative flex items-center justify-center space-x-3 w-full py-2 px-6 bg-pink-200 border-[2px] border-gray-300 rounded-full hover:bg-pink-300 transition duration-300"
            >
              <div className="absolute left-4">{button.icon}</div>
              <span className="text-md font-medium text-gray-800">
                {button.content}
              </span>
            </Link>
          ))}
        </div>

        {/* Séparateur */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">OR</span>
          </div>
        </div>

        {/* Formulaire d'inscription */}
        <CommonForm
          formControls={registerFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onClick={() => showCustomToast({ message: "Registration succesfull", type: "success" ,subtitle:"You can login now"})}
          buttonText="Continue"
        />
        {/* <Toaster/> */}
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

export default AuthRegister;
