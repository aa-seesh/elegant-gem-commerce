
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-beige-light">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.div 
          className="bg-[url('/images/about-hero.jpg')] bg-cover bg-center py-20 md:py-32 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">Our Story</h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl">
              Crafting timeless elegance since 1992
            </p>
          </div>
        </motion.div>

        {/* Our Story Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Journey</h2>
              <div className="w-16 h-1 bg-gold mx-auto mb-8 rounded-full"></div>
              <p className="text-muted-foreground mb-6">
                Founded in 1992 by master jeweler Elizabeth Morgan, Elegance Jewelry began as a small boutique in downtown Manhattan. 
                What started as a passion project quickly grew into a renowned destination for those seeking extraordinary jewelry pieces 
                that transcend trends and stand the test of time.
              </p>
              <p className="text-muted-foreground">
                Over three decades later, we remain committed to our founding principles: exceptional craftsmanship, ethical sourcing, 
                and creating pieces that tell a unique story. Each Elegance creation is meticulously handcrafted by our team of skilled 
                artisans who combine traditional techniques with innovative design.
              </p>
            </motion.div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16">
              <motion.div 
                className="text-center p-6 bg-white rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-gold">✦</span>
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">Ethical Sourcing</h3>
                <p className="text-muted-foreground">
                  We source our materials responsibly, ensuring that each gemstone and metal meets our strict ethical standards.
                </p>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 bg-white rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-gold">✦</span>
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">Master Craftsmanship</h3>
                <p className="text-muted-foreground">
                  Our artisans bring decades of experience to each piece, combining traditional techniques with modern innovation.
                </p>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 bg-white rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-gold">✦</span>
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">Timeless Design</h3>
                <p className="text-muted-foreground">
                  We create pieces that transcend trends, becoming cherished heirlooms to be passed down through generations.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24 bg-beige">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Meet Our Team</h2>
              <div className="w-16 h-1 bg-gold mx-auto mb-8 rounded-full"></div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our team of dedicated professionals brings passion and expertise to every aspect of our business.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="aspect-square w-48 h-48 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                  <img 
                    src="/placeholder.svg" 
                    alt="Elizabeth Morgan" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h3 className="text-xl font-serif font-bold">Elizabeth Morgan</h3>
                <p className="text-gold mb-2">Founder & Head Designer</p>
                <p className="text-muted-foreground">
                  With over 30 years of experience in jewelry design, Elizabeth leads our creative direction.
                </p>
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="aspect-square w-48 h-48 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                  <img 
                    src="/placeholder.svg" 
                    alt="James Chen" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h3 className="text-xl font-serif font-bold">James Chen</h3>
                <p className="text-gold mb-2">Master Craftsman</p>
                <p className="text-muted-foreground">
                  James brings precision and artistry to each piece with his exceptional technical skills.
                </p>
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="aspect-square w-48 h-48 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                  <img 
                    src="/placeholder.svg" 
                    alt="Sofia Rodriguez" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h3 className="text-xl font-serif font-bold">Sofia Rodriguez</h3>
                <p className="text-gold mb-2">Gemologist</p>
                <p className="text-muted-foreground">
                  With her expert eye, Sofia sources the highest quality gemstones for our collections.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
