import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Send,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/7688460/pexels-photo-7688460.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Contact us"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-light mb-6">
            Get in Touch
          </span>
          <h1 className="text-5xl md:text-6xl font-light mb-4">
            We'd Love to <span className="font-medium">Hear From You</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions? We're here to help. Send us a message and we'll
            respond within 24 hours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Contact Form */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-light text-gray-900 mb-2">
                Send us a <span className="font-medium">Message</span>
              </h2>
              <p className="text-gray-500">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group"
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle size={20} className="text-green-400" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <Send
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-light text-gray-900 mb-2">
                Contact <span className="font-medium">Information</span>
              </h2>
              <p className="text-gray-500">
                Here's how you can reach us. We're always happy to help.
              </p>
            </div>

            <div className="space-y-6 mb-8">
              {/* Visit Us */}
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center">
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Visit Us</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    123 Fashion Street, Style District
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>

              {/* Call Us */}
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center">
                  <Phone size={22} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Call Us</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    +1 (555) 123-4567
                    <br />
                    <span className="text-xs text-gray-500">
                      Mon-Fri: 9AM - 6PM EST
                    </span>
                  </p>
                </div>
              </div>

              {/* Email Us */}
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center">
                  <Mail size={22} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Email Us</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    support@aarunya.com
                    <br />
                    sales@aarunya.com
                  </p>
                </div>
              </div>
            </div>

            {/* Store Hours */}
            <div className="bg-gray-900 text-white rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Clock size={24} className="text-gray-400" />
                <h3 className="text-xl font-medium">Store Hours</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                  <span className="text-gray-400">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                  <span className="text-gray-400">Saturday</span>
                  <span className="font-medium">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Sunday</span>
                  <span className="font-medium">11:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="font-medium text-gray-900 mb-4">
                Connect With Us
              </h3>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors group"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors group"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors group"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-light text-gray-900 text-center mb-8">
            Find Us <span className="font-medium">Here</span>
          </h2>
          <div className="h-[400px] bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Store Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
