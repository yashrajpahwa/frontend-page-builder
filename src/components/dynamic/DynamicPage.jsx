import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import { useRecoilState } from "recoil";
import { loadingState } from "../../recoil/atoms";
import Loading from "../common/Loading";

// Component renderers
import HeroSection from "./sections/HeroSection";
import CardGridSection from "./sections/CardGridSection";
import TextWithImageSection from "./sections/TextWithImageSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import CallToActionSection from "./sections/CallToActionSection";
import SpeakersSection from "./sections/SpeakersSection";
import PartnersSection from "./sections/PartnersSection";
import GallerySection from "./sections/GallerySection";
import HeaderSection from "./sections/HeaderSection";
import FooterSection from "./sections/FooterSection";
import TimelineSection from "./sections/TimelineSection";
import FreestyleSection from "./sections/FreestyleSection";

// Import default config
import defaultConfig from "../../data/pageConfig.json";

const DynamicPage = () => {
  const { pageId } = useParams();
  const [pageConfig, setPageConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [headerConfig, setHeaderConfig] = useState(null);
  const [footerConfig, setFooterConfig] = useState(null);

  useEffect(() => {
    const fetchPageConfig = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be a fetch request to get the page config
        // For now, we'll use the default config with a simulated delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        const configData = defaultConfig;
        setPageConfig(configData);

        // Find header and footer configurations or use defaults
        const headerSection = configData.sections.find(
          (s) => s.type === "header"
        );
        const footerSection = configData.sections.find(
          (s) => s.type === "footer"
        );

        // Set default header if none is provided
        if (!headerSection) {
          setHeaderConfig({
            id: "auto-header",
            type: "header",
            properties: {
              logoText: configData.title || "Dynamic Page",
              autoGenerate: true,
              sticky: true,
              transparent: configData.sections[0]?.type === "hero",
            },
          });
        } else {
          setHeaderConfig(headerSection);
        }

        // Set default footer if none is provided
        if (!footerSection) {
          setFooterConfig({
            id: "auto-footer",
            type: "footer",
            properties: {
              logoText: configData.title || "Dynamic Page",
              description:
                "A dynamic page built with a flexible, component-based architecture.",
              autoGenerate: true,
              socialLinks: [
                { platform: "twitter", url: "https://twitter.com" },
                { platform: "linkedin", url: "https://linkedin.com" },
                { platform: "github", url: "https://github.com" },
              ],
              contactInfo: {
                email: "info@example.com",
              },
            },
          });
        } else {
          setFooterConfig(footerSection);
        }
      } catch (error) {
        console.error("Error fetching page config:", error);
        toast.error("Failed to load page configuration");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPageConfig();
  }, [pageId]);

  if (isLoading) {
    return <Loading message="Loading page content..." />;
  }

  if (!pageConfig) {
    return <div className="p-8 text-center">No page configuration found.</div>;
  }

  // Determine theme classes based on config
  const getThemeClasses = (theme) => {
    const themeClasses = {
      primary: {
        blue: "text-blue-700 border-blue-500 bg-blue-500",
        green: "text-green-700 border-green-500 bg-green-500",
        purple: "text-purple-700 border-purple-500 bg-purple-500",
        red: "text-red-700 border-red-500 bg-red-500",
        yellow: "text-yellow-700 border-yellow-500 bg-yellow-500",
      },
      secondary: {
        gray: "text-gray-600",
        slate: "text-slate-600",
        zinc: "text-zinc-600",
      },
      accent: {
        yellow: "text-yellow-500 bg-yellow-100",
        orange: "text-orange-500 bg-orange-100",
        pink: "text-pink-500 bg-pink-100",
        teal: "text-teal-500 bg-teal-100",
      },
      background: {
        light: "bg-white text-gray-900",
        dark: "bg-gray-900 text-white",
        neutral: "bg-gray-100 text-gray-900",
      },
      fontFamily: {
        sans: "font-sans",
        serif: "font-serif",
        mono: "font-mono",
      },
    };

    return {
      primaryColor:
        themeClasses.primary[theme.primary] || themeClasses.primary.blue,
      secondaryColor:
        themeClasses.secondary[theme.secondary] || themeClasses.secondary.gray,
      accentColor:
        themeClasses.accent[theme.accent] || themeClasses.accent.yellow,
      background:
        themeClasses.background[theme.background] ||
        themeClasses.background.light,
      fontFamily:
        themeClasses.fontFamily[theme.fontFamily] ||
        themeClasses.fontFamily.sans,
    };
  };

  const themeClasses = getThemeClasses(pageConfig.theme);

  // Render the appropriate component based on section type
  const renderSection = (section) => {
    const { type, properties, id } = section;

    const sectionComponents = {
      hero: HeroSection,
      cardGrid: CardGridSection,
      textWithImage: TextWithImageSection,
      testimonials: TestimonialsSection,
      callToAction: CallToActionSection,
      speakers: SpeakersSection,
      partners: PartnersSection,
      mediaPartners: PartnersSection,
      gallery: GallerySection,
      header: HeaderSection,
      footer: FooterSection,
      timeline: TimelineSection,
      freestyle: FreestyleSection,
    };

    const SectionComponent = sectionComponents[type];

    if (!SectionComponent) {
      return (
        <div key={id} className="p-4 border border-red-300 bg-red-50 rounded">
          Unknown section type: {type}
        </div>
      );
    }

    // For media partners, pass the "media" type
    if (type === "mediaPartners") {
      return (
        <SectionComponent
          key={id}
          properties={{ ...properties, type: "media" }}
          theme={themeClasses}
        />
      );
    }

    // For header and footer, pass the entire page config
    if (type === "header" || type === "footer") {
      return (
        <SectionComponent
          key={id}
          properties={properties}
          theme={themeClasses}
          pageConfig={pageConfig}
        />
      );
    }

    return (
      <div id={id} key={id}>
        <SectionComponent
          key={id}
          properties={properties}
          theme={themeClasses}
        />
      </div>
    );
  };

  // Filter out header and footer from main content sections
  const contentSections = pageConfig.sections.filter(
    (section) => section.type !== "header" && section.type !== "footer"
  );

  return (
    <div
      className={`dynamic-page ${themeClasses.background} ${themeClasses.fontFamily}`}
    >
      {/* Render Header */}
      {headerConfig && renderSection(headerConfig)}

      {/* Main Content */}
      <main className={headerConfig?.properties?.sticky ? "pt-16" : ""}>
        {contentSections.map(renderSection)}
      </main>

      {/* Render Footer */}
      {footerConfig && renderSection(footerConfig)}
    </div>
  );
};

export default DynamicPage;
