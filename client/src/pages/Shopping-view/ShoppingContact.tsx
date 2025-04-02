import { BsLinkedin } from "react-icons/bs";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineYoutube,
} from "react-icons/ai";
import CommonForm from "@/components/Common/Form";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import JoinNewsLetterComponent from "@/components/Shopping-view/contact/JoinNewsLetter";
import { contactFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { ContactFormData, sendContactIssue } from "@/store/shop/ContactSlice";
import { useCustomToast } from "@/hooks/useCustomToast";

// Configuration objects
const contactInfo = [
  {
    id: 1,
    label: "Location",
    value: "Yaoundé, +UYV 0000",
    icon: "📍",
  },
  {
    id: 2,
    label: "Email",
    value: "dimitritedom@gmail.com",
    icon: "💌",
  },
  {
    id: 3,
    label: "Phone",
    value: "+(237) 695 76 05 94",
    icon: "📞",
  },
];

const socialLinks = [
  {
    id: 1,
    platform: "Facebook",
    url: "https://facebook.com/chezflora",
    icon: <AiOutlineFacebook size={24} />,
  },
  {
    id: 2,
    platform: "Twitter",
    url: "https://x.com/DimitriTedom",
    icon: <AiOutlineTwitter size={24} />,
  },
  {
    id: 3,
    platform: "Instagram",
    url: "https://instagram.com/chezflora",
    icon: <AiOutlineInstagram size={24} />,
  },
  {
    id: 4,
    platform: "YouTube",
    url: "https://youtube.com/chezflora",
    icon: <AiOutlineYoutube size={24} />,
  },
  {
    id: 5,
    platform: "Linkedin",
    url: "https://www.linkedin.com/in/tedom-tafotsi-dimitri-wilfried-b70502298/",
    icon: <BsLinkedin size={24} />,
  },
];

const ShoppingContact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const {showToast} = useCustomToast()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setIsSubmitting(true);

    try {
      dispatch(sendContactIssue(formData)).unwrap().then((data) => {
        console.log(data);
        if (data.success) {
          showToast({
            type: "success",
            message: data.message,
            duration:2000,
          })
        }
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        subject: "",
        message: "",
      });
    } catch (error:any) {
      showToast({
        type: "error",
        message: error.message,
        duration:2000,
      })
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-32 overflow-x-hidden">
      <Helmet>
        {/* Primary SEO Tags */}
        <title>ChezFlora - Contact Us | Floral Consultation & Support</title>
        <meta
          name="description"
          content="Get in touch with ChezFlora's team for floral consultations, event planning, or customer support. Visit our Paris studio or contact us online."
        />
        <meta
          name="keywords"
          content="floral consultation, contact florist, event planning inquiry, Paris flower studio, customer support"
        />
        <link rel="canonical" href="https://www.chezflora.com/contact" />

        {/* Open Graph (Facebook) Tags */}
        <meta
          property="og:title"
          content="Contact ChezFlora - Floral Experts in Paris"
        />
        <meta
          property="og:description"
          content="Reach our floral design team for weddings, events, or special orders. Studio visits by appointment."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.chezflora.com/contact" />
        <meta property="og:image" content="/assets/og-contact.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="ChezFlora's Parisian floral studio entrance"
        />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Contact ChezFlora - Floral Design Consultations"
        />
        <meta
          name="twitter:description"
          content="Schedule consultations or ask about our sustainable floral arrangements. We serve Paris and Île-de-France region."
        />
        <meta name="twitter:image" content="/assets/og-contact.jpg" />

        {/* Other Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta name="author" content="ChezFlora Team" />
      </Helmet>

      <div className="flex flex-col md:flex-row items-center gap-4 xl:gap-12 justify-between p-8">
        {/* Left Side: Contact Information and Form */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">Contact us📬️</h1>
          <p className="text-gray-600 mb-4">
                Have questions? Fill out the form below and we'll get back to
                you within 24 hours.
              </p>
          {/* Contact Information */}
          <div className="space-y-4 mb-8">
            {contactInfo.map((info) => (
              <div key={info.id} className="flex items-center space-x-2">
                <span className="text-xl text-gray-500">{info.icon}</span>
                <div>
                  <p className="text-sm text-gray-500">{info.label}</p>
                  <p className="text-gray-700">{info.value}</p>
                </div>
              </div>
            ))}

            <div className="flex space-x-2 items-center">
              {socialLinks.map(({ id, url, icon }) => (
                <a
                  key={id}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Form Section */}
          <div className=" mx-auto">

            <CommonForm
              formControls={contactFormControls}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              buttonText="Send Message"
              isBnDisabled={isSubmitting}
            />

            <p className="mt-4 text-sm text-gray-500 text-center">
              We respect your privacy. Your information will not be shared with
              third parties.
            </p>
          </div>
        </div>

        {/* Right Side: Illustration */}
        <div className="w-full md:w-1/2">
          <img
            src="/contact4.jpg"
            alt="Contact Illustration"
            className="w-full rounded-lg shadow-md md:h-96 lg:h-full object-cover"
          />
        </div>
      </div>

      <JoinNewsLetterComponent />
    </div>
  );
};

export default ShoppingContact;
