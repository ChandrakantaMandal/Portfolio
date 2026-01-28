import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPhone,
  FaMapMarkerAlt,
  FaSpinner,
} from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";
import emailjs from "@emailjs/browser";
import AnimatedSection from "../components/AnimatedSection";

const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};
const isEmailJSConfigured = () => {
  return (
    EMAILJS_CONFIG.serviceId &&
    EMAILJS_CONFIG.templateId &&
    EMAILJS_CONFIG.publicKey
  );
};

const contactInfo = [
  {
    icon: <FaEnvelope />,
    label: "Email",
    value: "chandrakanta@example.com",
    link: "mailto:chandrakanta@example.com",
    color: "#3de58f",
  },
  {
    icon: <FaPhone />,
    label: "Phone",
    value: "+1 (555) 123-4567",
    link: "tel:+15551234567",
    color: "#3de58f",
  },
  {
    icon: <FaMapMarkerAlt />,
    label: "Location",
    value: "Cuttack,Odisha",
    link: "#",
    color: "#3de58f",
  },
];

const socialLinks = [
  {
    icon: <FaGithub />,
    label: "GitHub",
    link: "https://github.com/ChandrakantaMandal",
    color: "#333",
  },
  {
    icon: <FaLinkedin />,
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/chandrakanta-mandal",
    color: "#0077b5",
  },
  {
    icon: <FaTwitter />,
    label: "Twitter",
    link: "https://twitter.com/yourusername",
    color: "#1da1f2",
  },
  {
    icon: <FaEnvelope />,
    label: "Email",
    link: "chandrakantamandal28@gmail.com",
    color: "#3de58f",
  },
];

const Contact = () => {
  const { colors } = useTheme();
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  // Initialize EmailJS
  useEffect(() => {
    if (isEmailJSConfigured()) {
      emailjs.init(EMAILJS_CONFIG.publicKey);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      if (!isEmailJSConfigured()) {
        throw new Error(
          "EmailJS is not configured. Please check your environment variables."
        );
      }

      const result = await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        formRef.current,
        EMAILJS_CONFIG.publicKey
      );

      console.log("Email sent successfully:", result);
      setSubmitStatus("success");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error("Email sending failed:", error);

      if (error.text && error.text.includes("template ID not found")) {
        setSubmitStatus("template_error");
      } else if (
        error.message &&
        error.message.includes("EmailJS is not configured")
      ) {
        setSubmitStatus("config_error");
      } else {
        setSubmitStatus("error");
      }

      setTimeout(() => {
        setSubmitStatus(null);
      }, 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="max-w-7xl mx-auto">

        <AnimatedSection animation="fadeIn" className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: colors.text.primary }}
          >
            Get In <span className="text-[#3de58f]">Touch</span>
          </h2>
          <p
            className="text-xl max-w-3xl mx-auto"
            style={{ color: colors.text.muted }}
          >
            Have a project in mind or want to collaborate? I'd love to hear from
            you. Let's create something amazing together!
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
     
          <AnimatedSection animation="slideLeft" className="space-y-8">
            <div>
              <h3
                className="text-2xl font-bold mb-6"
                style={{ color: colors.text.primary }}
              >
                Let's Connect
              </h3>
              <p className="text-lg mb-8" style={{ color: colors.text.muted }}>
                I'm always open to discussing new opportunities, creative
                projects, or just having a friendly chat about technology and
                development.
              </p>
            </div>

            
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.link}
                  className="flex items-center p-4 rounded-xl transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: colors.card }}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                    style={{ backgroundColor: `${colors.accent}20` }}
                  >
                    <span style={{ color: colors.accent }} className="text-xl">
                      {info.icon}
                    </span>
                  </div>
                  <div>
                    <h4
                      className="font-semibold"
                      style={{ color: colors.text.primary }}
                    >
                      {info.label}
                    </h4>
                    <p style={{ color: colors.text.muted }}>{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

         
            <div>
              <h4
                className="text-lg font-semibold mb-4"
                style={{ color: colors.text.primary }}
              >
                Follow Me
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{ backgroundColor: colors.card }}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: social.color,
                      color: "#fff",
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    title={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </AnimatedSection>

       
          <AnimatedSection animation="slideRight">
            <div
              className="p-8 rounded-2xl shadow-xl"
              style={{ backgroundColor: colors.card }}
            >
              <h3
                className="text-2xl font-bold mb-6"
                style={{ color: colors.text.primary }}
              >
                Send Message
              </h3>

           
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-lg flex items-center gap-3"
                  style={{ backgroundColor: "#10b98120", color: "#10b981" }}
                >
                  <FaCheckCircle />
                  <span>
                    Message sent successfully! I'll get back to you soon.
                  </span>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-lg flex items-center gap-3"
                  style={{ backgroundColor: "#ef444420", color: "#ef4444" }}
                >
                  <FaExclamationTriangle />
                  <span>
                    Failed to send message. Please try again or contact me
                    directly.
                  </span>
                </motion.div>
              )}

              {submitStatus === "template_error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-lg flex items-center gap-3"
                  style={{ backgroundColor: "#f59e0b20", color: "#f59e0b" }}
                >
                  <FaExclamationTriangle />
                  <span>
                    Email service configuration issue. Please contact me
                    directly at{" "}
                    <a
                      href="mailto:chandrakantamandal28@gmail.com"
                      className="underline"
                    >
                      chandrakantamandal28@gmail.com
                    </a>
                  </span>
                </motion.div>
              )}

              {submitStatus === "config_error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-lg flex items-center gap-3"
                  style={{ backgroundColor: "#f59e0b20", color: "#f59e0b" }}
                >
                  <FaExclamationTriangle />
                  <span>
                    Email service is not configured. Please reach out directly
                    at{" "}
                    <a
                      href="mailto:chandrakantamandal28@gmail.com"
                      className="underline"
                    >
                      chandrakantamandal28@gmail.com
                    </a>
                  </span>
                </motion.div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: colors.text.primary }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-all duration-200"
                    style={{
                      backgroundColor: colors.secondary,
                      color: colors.text.primary,
                      borderColor: errors.name ? "#ef4444" : colors.border,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.accent;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.name
                        ? "#ef4444"
                        : colors.border;
                    }}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm" style={{ color: "#ef4444" }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: colors.text.primary }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-all duration-200"
                    style={{
                      backgroundColor: colors.secondary,
                      color: colors.text.primary,
                      borderColor: errors.email ? "#ef4444" : colors.border,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.accent;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.email
                        ? "#ef4444"
                        : colors.border;
                    }}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm" style={{ color: "#ef4444" }}>
                      {errors.email}
                    </p>
                  )}
                </div>

              
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: colors.text.primary }}
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-all duration-200"
                    style={{
                      backgroundColor: colors.secondary,
                      color: colors.text.primary,
                      borderColor: errors.subject ? "#ef4444" : colors.border,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.accent;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.subject
                        ? "#ef4444"
                        : colors.border;
                    }}
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm" style={{ color: "#ef4444" }}>
                      {errors.subject}
                    </p>
                  )}
                </div>

               
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: colors.text.primary }}
                  >
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg border-2 outline-none resize-none transition-all duration-200"
                    style={{
                      backgroundColor: colors.secondary,
                      color: colors.text.primary,
                      borderColor: errors.message ? "#ef4444" : colors.border,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.accent;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.message
                        ? "#ef4444"
                        : colors.border;
                    }}
                    placeholder="Tell me about your project or just say hello!"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm" style={{ color: "#ef4444" }}>
                      {errors.message}
                    </p>
                  )}
                  <p
                    className="mt-1 text-xs"
                    style={{ color: colors.text.muted }}
                  >
                    {formData.message.length}/500 characters
                  </p>
                </div>

               
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: colors.accent,
                    color: colors.primary,
                  }}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>

              <p
                className="mt-4 text-sm text-center"
                style={{ color: colors.text.muted }}
              >
                * Required fields. Your information is safe and will never be
                shared.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
