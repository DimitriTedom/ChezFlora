// AuthRegister.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "@/components/Common/Form";
// import { AiOutlineFacebook, AiOutlineTwitter } from "react-icons/ai";
// import { FcGoogle } from "react-icons/fc";
import FormTitle from "@/components/Common/FormTitle";
import { registerFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { initiateRegistrationUser } from "@/store/authSlice";
import type { AppDispatch } from "@/store/store";
import { useCustomToast } from "@/hooks/useCustomToast";
import { Helmet } from "react-helmet-async";
// Removed unused import: import ChezFloraLoader from "@/components/Common/ChezFloraLoader";

// Define interface for form data and add index signature
interface RegisterFormData extends Record<string, unknown> {
  name: string;
  email: string;
  password: string;
}

// interface SocialButton {
//   content: string;
//   icon: React.ReactNode;
//   to: string;
//   color?: string;
// }

const AuthRegister: React.FC = () => {
  // Use the interface in useState
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useCustomToast();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Vérification basique des champs
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    dispatch(initiateRegistrationUser(formData))
      .unwrap()
      .then((response) => {
        // this response contains a json of succes boolean and succes message
        if (response?.success) {
          showToast({
            message: response.message,
            type: "success",
            subtitle: "Redirecting to Verify OTP page...",
            duration: 3000,
          });
          setTimeout(() => {
            navigate(`/auth/complete/${formData.email}`);
          }, 3000);
        } else {
          console.log("Registration failed: ", response.message);
        }
      })
      .catch((err) => {
        showToast({
          message: err,
          type: "error",
          duration: 5000,
        });
        setError(err || "Registration failed");
      })
      .finally(() => setLoading(false));
  };

  // const socialButtons: SocialButton[] = [
  //   {
  //     content: "Continue with Facebook",
  //     icon: <AiOutlineFacebook color="#3b5998" size={24} />,
  //     to: "/facebook-login",
  //   },
  //   {
  //     content: "Continue with Google",
  //     icon: <FcGoogle size={24} />,
  //     to: "/google-login",
  //   },
  //   {
  //     content: "Continue with Twitter",
  //     icon: <AiOutlineTwitter color="#1da1f2" size={24} />,
  //     to: "/twitter-login",
  //   },
  // ];

  return (
    <div className="flex items-center justify-center mt-32">
      <Helmet>
        {/* Primary SEO Tags */}
        <title>Inscription - Créez votre compte ChezFlora</title>
        <meta
          name="description"
          content="Créez votre compte ChezFlora pour accéder à des services exclusifs : suivi de commandes, offres personnalisées, et conseils décoration floraux."
        />
        <meta
          name="keywords"
          content="inscription, compte client, création compte, fleurs en ligne, décoration événementielle"
        />
        {/* Open Graph Tags (Social Media) */}
        <meta
          property="og:title"
          content="Inscription ChezFlora - Votre compte floral"
        />
        <meta
          property="og:description"
          content="Rejoignez ChezFlora pour une expérience shopping premium : commandes simplifiées, abonnements floraux, et inspirations déco."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.chezflora.com/auth/register"
        />
        <meta
          property="og:image"
          content="https://chez-flora-sigma.vercel.app/flowerGen5.jpg"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        {/* Replace with signup-themed image */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Inscription - ChezFlora" />
        <meta
          name="twitter:description"
          content="Créez votre compte en 1 minute pour profiter de livraison express, promotions exclusives et services de décoration sur mesure."
        />
        <meta name="twitter:image" content="/assets/og-register.jpg" />
        {/* Branding & Technical Tags */}
        <link rel="canonical" href="https://www.chezflora.com/auth/register" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="theme-color" content="#E9F5DB" />{" "}
        {/* Soft green from palette */}
      </Helmet>

      <div className="bg-white p-8 rounded-[40px] shadow-2xl border w-full lg:px-[20rem] lg:py-[3rem] xl:px-[10rem]">
        <div className="mb-[1rem] lg:mb-[2rem]">
          <FormTitle
            title="Sign Up"
            comment="Welcome to our blog magazine Community"
          />
        </div>

        {/* Boutons de connexion via réseaux sociaux */}
        {/*<div className="space-y-3 mb-6">*/}
        {/*  {socialButtons.map((button, index) => (*/}
        {/*    <Link*/}
        {/*      key={index}*/}
        {/*      to={button.to}*/}
        {/*      className="relative flex items-center justify-center space-x-3 w-full py-2 px-6 bg-pink-200 border-[2px] border-gray-300 rounded-full hover:bg-pink-300 transition duration-300"*/}
        {/*    >*/}
        {/*      <div className="absolute left-4">{button.icon}</div>*/}
        {/*      <span className="text-md font-medium text-gray-800">*/}
        {/*        {button.content}*/}
        {/*      </span>*/}
        {/*    </Link>*/}
        {/*  ))}*/}
        {/*</div>*/}

        {/* Séparateur */}
        {/*<div className="relative flex items-center justify-center mb-6">*/}
        {/*  <div className="absolute inset-0 flex items-center">*/}
        {/*    <div className="w-full border-t border-gray-200"></div>*/}
        {/*  </div>*/}
        {/*  <div className="relative flex justify-center text-sm">*/}
        {/*    <span className="bg-white px-2 text-gray-500">OR</span>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/* Formulaire d'inscription */}
        {/* Provide the type argument to CommonForm */}
        <CommonForm<RegisterFormData>
          formControls={registerFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          isBnDisabled={loading}
          buttonText="continue"
        />
        {/* Gestion des erreurs et du chargement */}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

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
