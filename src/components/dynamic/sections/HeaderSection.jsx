import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const HeaderSection = ({ properties, theme, pageConfig }) => {
  const {
    logo,
    logoText = "DynamicPage",
    sticky = true,
    transparent = false,
    cta,
    autoGenerate = true,
  } = properties;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [generatedMenu, setGeneratedMenu] = useState([]);

  // Handle scroll effect for sticky header
  useEffect(() => {
    if (sticky) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [sticky]);

  // Auto-generate menu items from page sections
  useEffect(() => {
    if (autoGenerate && pageConfig && pageConfig.sections) {
      const autoMenu = pageConfig.sections
        .filter(
          (section) =>
            section.type !== "header" &&
            section.type !== "footer" &&
            section.properties.title &&
            !["callToAction"].includes(section.type)
        )
        .map((section) => ({
          label: section.properties.title,
          href: `#${section.id}`,
          id: section.id,
        }));

      setGeneratedMenu(autoMenu);
    }
  }, [autoGenerate, pageConfig]);

  // Use only generated menu items
  const allMenuItems = autoGenerate ? generatedMenu : [];

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const getHeaderClasses = () => {
    let classes = "transition-all duration-300 w-full z-50 ";

    if (sticky) {
      classes += "fixed top-0 left-0 right-0 ";

      if (isScrolled) {
        classes += "py-2 bg-white shadow-md ";
      } else {
        classes += "py-4 ";
        if (transparent) {
          classes += "bg-transparent ";
        } else {
          classes += "bg-white ";
        }
      }
    } else {
      classes += "relative py-4 bg-white ";
    }

    return classes;
  };

  const getLinkClasses = (isActive = false) => {
    return `block px-4 py-3 text-lg transition-colors duration-200 hover:bg-gray-100 rounded-md
            ${
              isActive
                ? "font-semibold " + theme.primaryColor.replace("bg-", "text-")
                : "text-gray-700"
            }`;
  };

  const handleMenuItemClick = (e, item) => {
    if (item.href.startsWith("#")) {
      e.preventDefault();
      closeDrawer();
      const element = document.getElementById(item.id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 300); // Wait for drawer to close
      }
    }
  };

  return (
    <header className={getHeaderClasses()}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {logo && <img src={logo} alt={logoText} className="h-8 w-auto" />}
            <span
              className={`text-xl font-bold ${
                isScrolled || !transparent ? "text-gray-900" : "text-white"
              }`}
            >
              {logoText}
            </span>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            className="rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors"
            onClick={toggleDrawer}
            aria-label="Menu"
          >
            <FaBars className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* React Modern Drawer */}
      <Drawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        direction="right"
        size="300px"
        duration={300}
        overlayOpacity={0.5}
        className="overflow-y-auto"
      >
        <div className="h-full flex flex-col">
          {/* Drawer Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold">Menu</h2>
            <button
              onClick={closeDrawer}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <FaTimes className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-grow">
            <div className="py-4">
              <nav className="flex flex-col px-2 space-y-1">
                {allMenuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className={getLinkClasses(item.isActive)}
                    onClick={(e) => handleMenuItemClick(e, item)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {cta && (
                <div className="px-4 py-6 mt-4 border-t">
                  <Link
                    to={cta.href || "#"}
                    className={`block w-full py-3 px-4 text-center rounded-md text-white font-medium shadow-sm
                              ${
                                theme.primaryColor.includes("bg-")
                                  ? theme.primaryColor
                                  : "bg-blue-600"
                              }
                              hover:opacity-90 transition-opacity`}
                    onClick={closeDrawer}
                  >
                    {cta.label}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="px-4 py-6 border-t mt-auto">
            <div className="text-sm text-gray-600">
              <p className="mb-2">
                © {new Date().getFullYear()} {logoText}
              </p>
              <a href="#" className="text-blue-600 hover:underline block py-1">
                Contact Us
              </a>
              <a href="#" className="text-blue-600 hover:underline block py-1">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </Drawer>
    </header>
  );
};

export default HeaderSection;
