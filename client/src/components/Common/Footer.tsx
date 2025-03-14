import SocialIcons from "./Contact/SocialIcons";
import Logo from "./Logo";
import FooterSubComponent from "../Footer/FooterSubComponent";
import { SnowDevCard } from "../Footer/SnowDevCard";
import TitleComponent from "../Footer/title.Component";
import JoinNewsLetter from "../Shopping-view/JoinNewsLetter";

const Footer = () => {
  return (
    <div className="w-[100%] bg-Maron flex flex-col">
      <div className="flex flex-col lg:items-center px-4 py-6 gap-4 lg:justify-between lg:flex-row lg:px-[6rem] lg:py-[5rem]">
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="lg:max-w-[12rem]">
              Votre spécialiste en fleurs et décoration florale depuis 2016.
              Nous proposons des compositions uniques, un service personnalisé
              et des conseils experts pour tous vos évènements.
            </p>
          </div>
          <SocialIcons />
        </div>

        <div className="flex gap-8 self-start">
          <FooterSubComponent
            title="Navigation"
            title1="Home"
            title2="Store"
            title3="Services"
            title4="Blog"
            title5="Contact"
            to1="/shop/home"
            to2="/shop/store"
            to3="/shop/services"
            to4="/shop/blog"
            to5="/shop/contact"
          />
          <FooterSubComponent
            title="Contact"
            title1="123 street, France"
            title2="7500 Paris, France"
            title3="Tel: +33 1 23 45 67 89"
            title4="contact@chezflora.com"
            to1="#"
            to2="#"
            to3="#"
            to4="#"
          />
        </div>
        {/* Join our newsletter */}
        <section className="self-start relative max-h-[300px]">
          <TitleComponent title="Join our Newsletter" />
          <JoinNewsLetter />
          <div className="absolute hidden lg:block right-0">
            <img
              src="/motifflower3.png"
              alt="motif flower 3"
              className="object-contain max-h-[28rem]"
            />
          </div>
        </section>
      </div>
      <div className="border-t-2 border-t-black flex items-center justify-center py-5">
        <h1 className="text-[1rem] font-semibold lg:text-xl text-center">
          © All copyrights reserved. Designed, coded and deployed by{" "}
          <SnowDevCard />
        </h1>
      </div>
    </div>
  );
};

export default Footer;
