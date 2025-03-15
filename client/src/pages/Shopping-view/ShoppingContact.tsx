import { BsLinkedin } from "react-icons/bs"; 
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineTwitter, AiOutlineYoutube } from "react-icons/ai";
import CommonForm from "@/components/Common/Form";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import JoinNewsLetterComponent from "@/components/Shopping-view/contact/JoinNewsLetter";

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
    value: "nc.example@example.com",
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
    platform: 'Facebook',
    url: 'https://facebook.com/chezflora',
    icon: <AiOutlineFacebook size={24} />,
  },
  {
    id: 2,
    platform: 'Twitter',
    url: 'https://twitter.com/chezflora',
    icon: <AiOutlineTwitter size={24} />,
  },
  {
    id: 3,
    platform: 'Instagram',
    url: 'https://instagram.com/chezflora',
    icon: <AiOutlineInstagram size={24} />,
  },
  {
    id: 4,
    platform: 'YouTube',
    url: 'https://youtube.com/chezflora',
    icon: <AiOutlineYoutube size={24} />,
  },
  {
    id:5,
    platform: 'Linkedin',
    url: 'https://linkedin.com/chezflora',
    icon: <BsLinkedin size={24}/>,
  },
];

const ShoppingContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const formControls = [
    {
      name: 'name',
      label: 'Full Name',
      placeholder: 'Enter your name',
      component: 'input',
      type: 'text',
    },
    {
      name: 'email',
      label: 'Email Address',
      placeholder: 'Enter your email',
      component: 'input',
      type: 'email',
    },
    {
      name: 'message',
      label: 'Your Message',
      placeholder: 'Type your message here...',
      component: 'textarea',
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(formData);
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to submit form. Please try again later.');
    } finally {
      setLoading(false);
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
        <meta property="og:title" content="Contact ChezFlora - Floral Experts in Paris" />
        <meta 
          property="og:description" 
          content="Reach our floral design team for weddings, events, or special orders. Studio visits by appointment."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.chezflora.com/contact" />
        <meta property="og:image" content="/assets/og-contact.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="ChezFlora's Parisian floral studio entrance" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact ChezFlora - Floral Design Consultations" />
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

      <div className="flex flex-col md:flex-row items-center gap-4 justify-between p-8">
        {/* Left Side: Contact Information and Form */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">Contact us</h1>

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
          <div className="space-y-4">
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">Message sent successfully!</p>}
            
            <CommonForm
              formControls={formControls}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              buttonText={loading ? 'Sending...' : 'Send message'}
              disabled={loading}
            />
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

      <JoinNewsLetterComponent/>
    </div>
  );
};

export default ShoppingContact;