import { useState } from "react";
import FormTitle from "@/components/Common/FormTitle";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

const AuthEnterOtp: React.FC = () => {
  const [otp, setOtp] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("Code OTP saisi :", otp);
      //  la logique pour valider l'OTP (API, etc.)
      
    } catch (error: any) {
      setError(error.message || "OTP verification failed");
      console.error("OTP error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-[40px] shadow-2xl border w-full lg:px-[20rem] lg:py-[3rem] xl:px-[10rem]">
        <div className="mb-[1rem] lg:mb-[2rem]">
          <FormTitle title="Enter OTP" comment="Please enter the OTP sent to your email"/>
        </div> 

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          {/* OTP Input */}
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} className="p-5 lg:p-8 border-pink-200"/>
              <InputOTPSeparator />
              <InputOTPSlot index={1} className="p-5 lg:p-8 border-pink-200"/>
              <InputOTPSeparator />
              <InputOTPSlot index={2} className="p-5 lg:p-8 border-pink-200"/>
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} className="p-5 lg:p-8 border-pink-200"/>
              <InputOTPSeparator />
              <InputOTPSlot index={4} className="p-5 lg:p-8 border-pink-200" />
              <InputOTPSeparator />
              <InputOTPSlot index={5} className="p-5 lg:p-8 border-pink-200"/>
            </InputOTPGroup>
          </InputOTP>
          
          {/* Bouton de vérification */}
          <Button
            type="submit"
            className="mt-4 w-full p-6 font-semibold text-white bg-pink-300 hover:bg-pink-400 rounded-full text-[1.3rem]"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </form>

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
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 6.627 5.373 12 12 12a7.963 7.963 0 01-7.717-2.709z"
              ></path>
            </svg>
          </div>
        )}

        {/* Message de rappel */}
        <div className="text-center mt-2">
          If you do not receive the email, check the junk mail (Spam) in your email.
        </div>

        {/* Lien pour renvoyer le code OTP */}
        <div className="text-[#F98190] hover:text-pink-700 transition-colors underline text-center mt-2 cursor-pointer">
          Resend OTP
        </div>
      </div>
    </div>
  );
};

export default AuthEnterOtp;
