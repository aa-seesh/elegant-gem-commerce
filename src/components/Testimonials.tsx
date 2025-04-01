
import React from "react";
import { Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  comment: string;
  rating: number;
  image?: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Emily Johnson",
      location: "New York, USA",
      comment: "The diamond necklace I purchased exceeded all my expectations. The craftsmanship is superb and the attention to detail is evident. It has become my favorite piece of jewelry!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=688&q=80"
    },
    {
      id: "2",
      name: "Michael Thompson",
      location: "London, UK",
      comment: "I bought an engagement ring from Elegance and my fiancée absolutely loves it. The customer service was exceptional and they helped me choose the perfect ring. Highly recommend!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    },
    {
      id: "3",
      name: "Sophia Martinez",
      location: "Paris, France",
      comment: "The earrings I purchased are simply beautiful. They arrived in elegant packaging and look even better in person. Will definitely be a returning customer!",
      rating: 4,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=761&q=80"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-gold fill-gold" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-beige-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">What Our Customers Say</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Discover why our clients choose Elegance for their most precious moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                {testimonial.image && (
                  <div className="mr-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-serif font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
              <div className="flex mb-3">{renderStars(testimonial.rating)}</div>
              <p className="text-sm italic">{`"${testimonial.comment}"`}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
