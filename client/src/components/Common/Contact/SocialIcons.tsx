import React, { FC, memo } from 'react';
import { FaTelegramPlane, FaLinkedinIn } from 'react-icons/fa';
import { AiOutlineTwitter } from 'react-icons/ai';
import { BsWhatsapp } from 'react-icons/bs';

interface SocialLink {
  href: string;
  ariaLabel: string;
  Icon: React.ComponentType;
}

const socialLinks: SocialLink[] = [
  {
    href: 'https://t.me/SnowDev5',
    ariaLabel: 'Telegram',
    Icon: FaTelegramPlane,
  },
  {
    href: 'https://wa.me/695760594',
    ariaLabel: 'WhatsApp',
    Icon: BsWhatsapp,
  },
  {
    href: 'https://www.linkedin.com/in/tedom-tafotsi-dimitri-wilfried-b70502298/',
    ariaLabel: 'LinkedIn',
    Icon: FaLinkedinIn,
  },
  {
    href: 'https://twitter.com/chezflora',
    ariaLabel: 'Twitter',
    Icon: AiOutlineTwitter,
  },
];

const SocialIcons: FC = () => (
  <div className="w-full flex items-center space-x-5">
    {socialLinks.map(({ href, ariaLabel, Icon }) => (
      <a
        key={ariaLabel}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className="bg-orange-400 hover:bg-orange-500 rounded-full w-8 h-8 lg:w-12 lg:h-12 xl:w-14 xl:h-14 flex items-center justify-center text-pink-600"
      >
        <Icon />
      </a>
    ))}
  </div>
);

export default memo(SocialIcons);
