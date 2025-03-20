import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "@/components/Common/Form";
import FormTitle from "@/components/Common/FormTitle";
import { ForgotPasswordFormControls } from "@/config";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useCustomToast } from "@/hooks/useCustomToast";
import { checkUser } from "@/store/authSlice";

const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { showToast } = useCustomToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (!formData.email) {
        throw new Error("Email is required");
      }
      dispatch(checkUser(formData.email))
        .unwrap()
        .then((data) => {
          console.log(data);
          if (data?.success) {
            showToast({
              message: data.message,
              subtitle:"Redirecting to Enter OPTP...",
              type: "info",
              duration: 5000,
            });
            navigate(`/auth/verify-otp/${formData.email}`);
          }
        });
    } catch (error) {
      setError("Invalid email or password");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" flex items-center justify-center flex-col text-center mt-32">
      <Helmet>
        <title>Forgot Password - Reset Your ChezFlora Account</title>
        <meta
          name="description"
          content="Reset your ChezFlora account password securely. Follow simple steps to regain access to your account and continue shopping."
        />
        <meta
          name="keywords"
          content="forgot password, reset password, chezflora account recovery, floral services"
        />
        <meta
          property="og:title"
          content="Forgot Password - ChezFlora Account Recovery"
        />
        <meta
          property="og:description"
          content="Securely reset your ChezFlora password and regain access to your account for seamless shopping and order management."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.chezflora.com/auth/forgot-password"
        />
        <meta property="og:image" content="/assets/og-forgot-password.jpg" />{" "}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Forgot Password - ChezFlora Account Recovery"
        />
        <meta
          name="twitter:description"
          content="Reset your password securely and regain access to your ChezFlora account for uninterrupted floral shopping and services."
        />
        <meta name="twitter:image" content="/assets/og-forgot-password.jpg" />
        <link
          rel="canonical"
          href="https://www.chezflora.com/auth/forgot-password"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="theme-color" content="#E9F5DB" />{" "}

      </Helmet>
      <div className="bg-white p-8 rounded-[40px] shadow-2xl border w-full lg:px-[20rem] lg:py-[3rem] xl:px-[10rem]">
        <div className="mb-[1rem] lg:mb-[2rem]">
          <FormTitle
            title="Forgot password"
            comment="We will sent password intruction to your email"
          />
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
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
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
            <Link
              to="/auth/register"
              className="text-[#F98190] hover:text-pink-700 transition-colors underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
