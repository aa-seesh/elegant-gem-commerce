
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeIn, SlideUp } from "@/components/ui/fade-container";
import { Separator } from "@/components/ui/separator";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
          >
            <img 
              src="https://images.unsplash.com/photo-1583937443566-6fe1a1c6e400?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="Jewelry workshop" 
              className="w-full h-full object-cover object-center brightness-75"
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our Story
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Separator animated className="max-w-[120px] mx-auto bg-white/50 mt-6" />
            </motion.div>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1618403088890-3d9ff6f4c8b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                alt="Jewelry craftsmanship" 
                className="rounded-lg shadow-lg"
              />
            </motion.div>
            <div>
              <SlideUp>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Crafting Elegance Since 1985</h2>
                <p className="text-muted-foreground mb-6">
                  Founded in 1985 by master goldsmith Elizabeth Harlow, Elegance began as a small atelier in the heart of Paris. 
                  With a passion for creating timeless pieces that celebrate the beauty of precious metals and gemstones, 
                  Elizabeth's vision quickly gained recognition for its distinctive designs and impeccable craftsmanship.
                </p>
                <p className="text-muted-foreground mb-6">
                  Over the decades, Elegance has grown into a renowned jewelry house, but we've never forgotten our roots. 
                  Each piece is still crafted with the same dedication to quality and artistry that Elizabeth instilled 
                  from the very beginning.
                </p>
                <div className="flex items-center space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                    alt="Elizabeth Harlow" 
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-serif font-medium">Elizabeth Harlow</h4>
                    <p className="text-sm text-gold">Founder & Creative Director</p>
                  </div>
                </div>
              </SlideUp>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-beige-light py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <FadeIn>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Values</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  At Elegance, our values guide every decision we make and every piece we create.
                </p>
                <div className="mt-4">
                  <Separator animated className="max-w-[120px] mx-auto bg-gold" />
                </div>
              </FadeIn>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: "Craftsmanship",
                  description: "Each piece is meticulously handcrafted by our skilled artisans, ensuring the highest quality and attention to detail.",
                  icon: "✨"
                },
                {
                  title: "Sustainability",
                  description: "We source our materials ethically and are committed to responsible practices throughout our supply chain.",
                  icon: "🌱"
                },
                {
                  title: "Timelessness",
                  description: "We create pieces that transcend trends, designed to be cherished for generations.",
                  icon: "⏱️"
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  className="bg-white p-8 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-serif font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Craftsmanship Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <SlideUp>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Our Craftsmanship</h2>
                <p className="text-muted-foreground mb-6">
                  Every Elegance piece begins as a concept in our design studio, where our creative team 
                  sketches and refines ideas until they capture the perfect balance of beauty and wearability.
                </p>
                <p className="text-muted-foreground mb-6">
                  From there, our master jewelers bring these designs to life through a meticulous process 
                  that combines traditional techniques with modern innovation. From casting to stone setting, 
                  each step is performed with precision and care.
                </p>
                <p className="text-muted-foreground">
                  Before a piece receives the Elegance mark, it undergoes rigorous quality control to ensure 
                  it meets our exacting standards. Only then is it ready to become part of someone's personal story.
                </p>
              </SlideUp>
            </div>
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1617038260897-43a7195d1de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                alt="Jewelry making process" 
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
