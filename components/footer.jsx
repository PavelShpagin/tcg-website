import { TiSocialFacebook, TiSocialYoutube } from "react-icons/ti";
import { SlSocialInstagram } from "react-icons/sl";
import { FaXTwitter, FaDiscord } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialIcons = [
    {
      icon: <FaDiscord />,
      href: "https://discord.gg/dNB4AGG7",
      label: "Discord",
    },
    { icon: <FaXTwitter />, href: "https://x.com/casters_tcg", label: "Twitter" },
    {
      icon: <TiSocialYoutube />,
      href: "https://www.youtube.com/@casters_tcg",
      label: "YouTube",
    },
    /*
    {
      icon: <SlSocialInstagram />,
      href: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: <TiSocialFacebook />,
      href: "https://facebook.com",
      label: "Facebook",
    },
    */
  ];

  return (
    <>
      <div className="gray-delimiter z-10 w-full"></div>
      <footer
        className="relative mt-auto py-8 px-4 text-[var(--footer-text)] w-full"
        style={{ backgroundColor: "var(--footer-bg)" }}
      >
        {/* Slick gradient border at the top */}
        <div
          className="absolute -top-px left-0 w-full h-0.5 bg-gradient-to-r"
          style={{
            backgroundImage: `linear-gradient(to right, var(--footer-border-gradient-from), var(--footer-border-gradient-via), var(--footer-border-gradient-to))`,
          }}
        />

        <div className="max-w-7xl mx-auto">
          {/* Social Section */}
          <div className="text-center mb-8">
            <h3 className="text-white font-bold text-xl mb-4">
              Connect With Us
            </h3>
            <div className="flex justify-center gap-6">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="footer-social-icon"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Footer Section */}
          <div className="pt-4">
            <div
              className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 pt-4"
              style={{
                borderTopColor: "var(--footer-divider)",
                borderTopWidth: "1px",
              }}
            >
              <p className="text-sm" style={{ color: "var(--footer-text)" }}>
                Non-Commercial
              </p>
              <span className="text-sm" style={{ color: "var(--footer-text)" }}>
                English (US)
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
