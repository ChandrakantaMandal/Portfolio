import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const { colors } = useTheme();


  const handleMobileNavClick = (href) => {
    const element = document.getElementById(href.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.log("Element not found for:", href);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 w-full backdrop-blur-sm shadow-md z-50 transition-colors duration-300"
      style={{
        backgroundColor: colors.navbar,
        color: colors.text.primary,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <motion.h1
          className="text-2xl font-extrabold text-[#3de58f] cursor-pointer"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Next DEV
        </motion.h1>
        <AnimatePresence>
          {showAdminLogin && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-2 p-4 bg-white rounded shadow-lg"
              style={{ backgroundColor: colors.navbar }}
            >
              <AdminLogin />
            </motion.div>
          )}
        </AnimatePresence>
        <ul className="hidden md:flex space-x-10 mr-8">
          {navLinks.map((link, index) => (
            <motion.li
              key={link.name}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <button
                onClick={() => {
                  const element = document.getElementById(
                    link.href.replace("#", "")
                  );
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  } else {
                    console.log("Element not found for:", link.href);
                  }
                }}
                className="transition duration-300 relative font-medium"
                style={{
                  color:
                    activeSection === link.href.replace("#", "")
                      ? colors.accent
                      : colors.text.secondary,
                }}
                onMouseEnter={(e) => (e.target.style.color = colors.accent)}
                onMouseLeave={(e) => {
                  e.target.style.color =
                    activeSection === link.href.replace("#", "")
                      ? colors.accent
                      : colors.text.secondary;
                }}
              >
                {link.name}
                {activeSection === link.href.replace("#", "") && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#3de58f]"
                    layoutId="activeSection"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </motion.li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <div className="mr-4">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-2xl transition duration-300"
            style={{ color: colors.text.secondary }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={(e) => (e.target.style.color = colors.accent)}
            onMouseLeave={(e) => (e.target.style.color = colors.text.secondary)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t transition-colors duration-300"
            style={{
              backgroundColor: colors.primary,
              borderColor: colors.border,
            }}
          >
            <ul className="py-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleMobileNavClick(link.href)}
                    className="block w-full text-left px-6 py-3 transition duration-300"
                    style={{
                      color:
                        activeSection === link.href.replace("#", "")
                          ? colors.accent
                          : colors.text.secondary,
                      backgroundColor:
                        activeSection === link.href.replace("#", "")
                          ? colors.secondary
                          : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = colors.accent;
                      e.target.style.backgroundColor = colors.secondary;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color =
                        activeSection === link.href.replace("#", "")
                          ? colors.accent
                          : colors.text.secondary;
                      e.target.style.backgroundColor =
                        activeSection === link.href.replace("#", "")
                          ? colors.secondary
                          : "transparent";
                    }}
                  >
                    {link.name}
                  </button>
                </motion.li>
              ))}

              {/* Theme Toggle in Mobile Menu */}
              <motion.li
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="px-6 py-3 border-t"
                style={{ borderColor: colors.border }}
              >
                <div className="flex items-center justify-between">
                  <span
                    style={{ color: colors.text.secondary }}
                    className="text-sm"
                  >
                    Theme
                  </span>
                  <ThemeToggle />
                </div>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
