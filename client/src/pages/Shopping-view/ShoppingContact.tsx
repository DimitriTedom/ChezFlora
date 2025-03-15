import { Helmet } from "react-helmet-async"

const ShoppingContact = () => {
  return (
    <div className="mt-32">
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

      <div>
        
      </div>
    </div>
  )
}

export default ShoppingContact