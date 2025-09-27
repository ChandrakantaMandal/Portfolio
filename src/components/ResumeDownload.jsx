import { motion } from "framer-motion";
import { FaDownload, FaFilePdf } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

const ResumeDownload = ({ 
  variant = "primary", // primary, secondary, navbar
  className = "",
  showIcon = true,
  showText = true,
  text = "Download Resume",
  fileName = "Chandrakanta_Mandal_Resume.pdf"
}) => {
  const { colors } = useTheme();

  const handleDownload = () => {
    // Track download event (optional analytics)
    try {
      if (window.gtag) {
        window.gtag('event', 'resume_download', {
          event_category: 'engagement',
          event_label: 'Resume Downloaded'
        });
      }
    } catch (error) {
      console.log('Analytics not available');
    }

    // Create download link
    const link = document.createElement('a');
    link.href = '/assets/resume.pdf'; // This should be in your public/assets folder
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: colors.accent,
          color: colors.primary,
          padding: "12px 24px",
          fontSize: "16px",
          fontWeight: "600",
          borderRadius: "8px",
          border: "none",
          boxShadow: `0 4px 12px ${colors.accent}30`
        };
      case "secondary":
        return {
          backgroundColor: "transparent",
          color: colors.accent,
          padding: "10px 20px",
          fontSize: "14px",
          fontWeight: "500",
          borderRadius: "6px",
          border: `2px solid ${colors.accent}`,
        };
      case "navbar":
        return {
          backgroundColor: colors.accent,
          color: colors.primary,
          padding: "8px 16px",
          fontSize: "14px",
          fontWeight: "500",
          borderRadius: "6px",
          border: "none",
        };
      default:
        return {
          backgroundColor: colors.accent,
          color: colors.primary,
          padding: "10px 20px",
          fontSize: "14px",
          fontWeight: "500",
          borderRadius: "6px",
          border: "none",
        };
    }
  };

  return (
    <motion.button
      onClick={handleDownload}
      className={`flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 ${className}`}
      style={getVariantStyles()}
      whileHover={{ 
        scale: 1.05,
        boxShadow: variant === "primary" ? `0 6px 20px ${colors.accent}40` : undefined
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      title={`Download ${fileName}`}
    >
      {showIcon && (
        <motion.span
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 10 }}
          transition={{ duration: 0.2 }}
        >
          <FaDownload />
        </motion.span>
      )}
      {showText && <span>{text}</span>}
      
      {/* Optional PDF icon */}
      {variant === "secondary" && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-red-500"
        >
          <FaFilePdf />
        </motion.span>
      )}
    </motion.button>
  );
};

export default ResumeDownload;