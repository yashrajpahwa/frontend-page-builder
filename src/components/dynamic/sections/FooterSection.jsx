import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const FooterSection = ({ properties, theme, pageConfig }) => {
  const {
    logo,
    logoText = "DynamicPage",
    description,
    sections = [],
    contactInfo = {},
    socialLinks = [],
    copyright,
    autoGenerate = true,
  } = properties;

  const [generatedSections, setGeneratedSections] = useState([]);

  // Auto-generate footer sections based on page content
  useEffect(() => {
    if (autoGenerate && pageConfig && pageConfig.sections) {
      // Group sections by type
      const sectionsByType = pageConfig.sections.reduce((acc, section) => {
        if (section.type !== "header" && section.type !== "footer") {
          if (!acc[section.type]) acc[section.type] = [];
          acc[section.type].push(section);
        }
        return acc;
      }, {});

      // Create sections for the footer
      const generatedContent = [];

      // Main navigation
      const mainLinks = pageConfig.sections
        .filter(
          (section) =>
            section.type !== "header" &&
            section.type !== "footer" &&
            section.properties.title
        )
        .map((section) => ({
          label: section.properties.title,
          href: `#${section.id}`,
          id: section.id,
        }));

      if (mainLinks.length > 0) {
        generatedContent.push({
          title: "Navigation",
          links: mainLinks,
        });
      }

      // Features section
      const featuresSection = sectionsByType.cardGrid?.find((s) =>
        s.properties.title?.toLowerCase().includes("feature")
      );

      if (featuresSection && featuresSection.properties.cards) {
        generatedContent.push({
          title: "Features",
          links: featuresSection.properties.cards.slice(0, 5).map((card) => ({
            label: card.title,
            href: `#${featuresSection.id}`,
          })),
        });
      }

      setGeneratedSections(generatedContent);
    }
  }, [autoGenerate, pageConfig]);

  // Combined sections (manual + auto-generated)
  const allSections = autoGenerate
    ? [...sections, ...generatedSections]
    : sections;

  // Get current year for copyright
  const currentYear = new Date().getFullYear();

  // Social media icon map
  const socialIcons = {
    facebook: FaFacebook,
    twitter: FaTwitter,
    instagram: FaInstagram,
    linkedin: FaLinkedin,
    youtube: FaYoutube,
    github: FaGithub,
  };

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand column */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              {logo && <img src={logo} alt={logoText} className="h-8 w-auto" />}
              <span className="text-xl font-bold text-white">{logoText}</span>
            </div>

            {description && (
              <p className="text-gray-400 text-sm mb-4">{description}</p>
            )}

            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="flex space-x-4 mt-4">
                {socialLinks.map((link, index) => {
                  const SocialIcon = socialIcons[link.platform] || FaLink;
                  return (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label={link.platform}
                    >
                      <SocialIcon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Link sections */}
          {allSections.map((section, idx) => (
            <div key={idx} className="col-span-1">
              <h3 className="text-white font-medium text-lg mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                      onClick={(e) => {
                        if (link.href.startsWith("#")) {
                          e.preventDefault();
                          const element = document.getElementById(link.id);
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                          }
                        }
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact information */}
          {(contactInfo.email || contactInfo.phone || contactInfo.address) && (
            <div className="col-span-1">
              <h3 className="text-white font-medium text-lg mb-4">
                Contact Us
              </h3>
              <ul className="space-y-3">
                {contactInfo.email && (
                  <li className="flex items-start space-x-3 text-sm">
                    <FaEnvelope className="h-5 w-5 text-gray-400 mt-0.5" />
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-gray-400 hover:text-white"
                    >
                      {contactInfo.email}
                    </a>
                  </li>
                )}

                {contactInfo.phone && (
                  <li className="flex items-start space-x-3 text-sm">
                    <FaPhone className="h-5 w-5 text-gray-400 mt-0.5" />
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-gray-400 hover:text-white"
                    >
                      {contactInfo.phone}
                    </a>
                  </li>
                )}

                {contactInfo.address && (
                  <li className="flex items-start space-x-3 text-sm">
                    <FaMapMarkerAlt className="h-5 w-5 text-gray-400 mt-0.5" />
                    <span className="text-gray-400">{contactInfo.address}</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom bar with copyright */}
        <div className="pt-8 mt-8 border-t border-gray-800 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>
            {copyright
              ? copyright.replace("{year}", currentYear)
              : `© ${currentYear} ${logoText}. All rights reserved.`}
          </p>

          <div className="mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white mr-4">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
