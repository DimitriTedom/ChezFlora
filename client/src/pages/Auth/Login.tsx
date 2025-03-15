// pages/LoginPage.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "@/components/Common/Form";
// import { Button } from "../ui/button";
import { 
  AiOutlineFacebook,
  AiOutlineTwitter 
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import FormTitle from "@/components/Common/FormTitle";
import { LoginFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/authSlice";
import {Toaster,toast} from 'sonner'
// Interface pour les boutons de réseaux sociaux
interface SocialButton {
  content: string;
  icon: React.ReactNode;
  to: string;
  color?: string;
}

const AuthLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const notify = ()=>{
    toast.success('Login Successfull');
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log(formData);
    try {
      // Exemple de validation basique
      if (!formData.email || !formData.password) {
        throw new Error("All fields are required");
      }
      console.log(formData);
      dispatch(loginUser(formData)).unwrap().then((data)=>{console.log(data)});

    const {user,token} = response.data;
    localStorage.setItem('token',token);
      // Redirection vers une page après connexion
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password",);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Configuration des boutons de réseaux sociaux
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
    <div className=" flex items-center justify-center mt-32">
      <div className="bg-white p-8 rounded-[40px] shadow-2xl border w-full lg:px-[20rem] lg:py-[3rem] xl:px-[10rem]">
      <div className="mb-[1rem] lg:mb-[2rem]">
        <FormTitle title="Sign In" comment="Welcome to our blog magazine Community"/>
        </div> 

        {/* BOUTONS DE CONNEXION AVEC RESEAUX SOCIAUX */}
        <div className="space-y-3 mb-6">
          {socialButtons.map((button, index) => (
            <Link
              key={index}
              to={button.to}
              className="relative flex items-center justify-center space-x-3 w-full py-2 px-6 bg-pink-200 border-[2px] border-gray-300 rounded-full hover:bg-pink-300 transition duration-300"
            >
              <div className="absolute left-4">{button.icon}</div>
              <span className="text-md font-medium text-gray-800">{button.content}</span>
            </Link>
          ))}
        </div>

        {/* SEPARATEUR */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">OR</span>
          </div>
        </div>

        {/* FORMULAIRE DE CONNEXION */}
        <CommonForm
          formControls={LoginFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onClick={notify}
          buttonText="Continue"
        />
        <Toaster/>
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

        {/* LIGNE DE LIEN D'INSCRIPTION */}
        <div className="mt-4 text-center">
          <p className="text-gray-500">
            New user?{" "}
            <Link
              to="/auth/register"
              className="text-[#F98190] hover:text-pink-700 transition-colors underline"
            >
              Create an account
            </Link>
          </p>
            <Link to="/auth/forgot-password" className="text-[#F98190] hover:text-pink-700 transition-colors underline">Forgot password</Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;