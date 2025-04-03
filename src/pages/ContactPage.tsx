
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeContainer, SlideUp } from "@/components/ui/fade-container";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll get back to you soon!",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[40vh] flex items-center justify-center">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="Contact Us" 
              className="w-full h-full object-cover object-center brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Get In Touch</h1>
              <p className="text-white/90 md:text-lg">
                We'd love to hear from you. Reach out for inquiries, appointments, or special requests.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Contact Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <FadeContainer>
              <div className="bg-beige-light p-8 rounded-lg">
                <h2 className="text-3xl font-serif font-bold mb-6">Contact Information</h2>
                <Separator animated className="mb-8 bg-gold" />
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gold/10 p-3 rounded-full">
                      <MapPin className="text-gold h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Visit Our Boutique</h3>
                      <p className="text-muted-foreground">
                        123 Elegance Avenue<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                      <p className="mt-2 text-sm">
                        <span className="font-medium">Hours:</span> Monday-Saturday, 10am-7pm
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-gold/10 p-3 rounded-full">
                      <Phone className="text-gold h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-muted-foreground">+1 (212) 555-6789</p>
                      <p className="mt-2 text-sm">
                        <span className="font-medium">Customer Service:</span> Monday-Friday, 9am-6pm
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-gold/10 p-3 rounded-full">
                      <Mail className="text-gold h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground">info@elegancejewelry.com</p>
                      <p className="text-muted-foreground">support@elegancejewelry.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h3 className="font-serif text-xl mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    {["Facebook", "Instagram", "Twitter", "Pinterest"].map((social) => (
                      <a 
                        key={social} 
                        href="#" 
                        className="bg-white hover:bg-gold/10 transition-colors duration-300 px-4 py-2 rounded-md text-sm"
                      >
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </FadeContainer>
            
            {/* Contact Form */}
            <SlideUp delay={0.2}>
              <div className="bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                    <Input 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      animated
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      animated
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                    <Input 
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      animated
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[120px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:border-gold"
                      placeholder="Type your message here..."
                      required
                    />
                  </div>
                  
                  <ShimmerButton 
                    type="submit" 
                    variant="gold" 
                    size="lg" 
                    className="w-full font-medium"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </ShimmerButton>
                </form>
                
                <div className="mt-8 text-center text-sm text-muted-foreground">
                  <p>
                    By submitting this form, you agree to our {" "}
                    <a href="/privacy-policy" className="text-gold hover:underline">Privacy Policy</a>
                  </p>
                </div>
              </div>
            </SlideUp>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mt-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[400px] w-full bg-gray-200"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96708.34194156103!2d-74.03927100759714!3d40.759040329405195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2588f046ee661%3A0xa0b3281fcecc08c!2sManhattan%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1680468736458!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Elegance Jewelry Location"
            />
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
