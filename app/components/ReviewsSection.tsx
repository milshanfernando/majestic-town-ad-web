"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const properties = [
  {
    name: "DSV Property",
    mapQuery: "DSV Property Abu Dhabi",
    link: "https://maps.app.goo.gl/ewkmPdg6afF2z5Pt9",
  },
  {
    name: "Majestic Town",
    mapQuery: "Majestic Town Abu Dhabi",
    link: "https://www.google.com/maps",
  },
  {
    name: "Vouge Inn",
    mapQuery: "Vouge Inn Abu Dhabi",
    link: "https://www.google.com/maps",
  },
];

const ReviewsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.from(".review-card", {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
          opacity: 0,
          y: 60,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        });
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="w-full bg-gradient-to-b from-white to-gray-50 py-24 px-6"
    >
      <div className="max-w-7xl mx-auto text-center mb-16">
        <p className="uppercase tracking-[4px] text-amber-500 text-xs sm:text-sm mb-3">
          Guest Reviews
        </p>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light">
          Real Reviews From Our Guests
          <span className="block font-semibold">Google Verified Feedback</span>
        </h2>
      </div>

      <div className="max-w-5xl mx-auto grid gap-6 lg:grid-cols-3">
        {properties.map((property, index) => (
          <div
            key={index}
            className="review-card bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
              <h3 className="font-semibold text-lg text-gray-800">
                {property.name}
              </h3>

              <a
                href={property.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-500 text-sm font-medium hover:underline"
              >
                View →
              </a>
            </div>

            {/* Iframe */}
            <div className="w-full h-[350px]">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  property.mapQuery,
                )}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;

// "use client";

// import { useRef } from "react";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { AiFillStar } from "react-icons/ai";

// gsap.registerPlugin(ScrollTrigger);

// // Sample Google reviews data (replace with your real reviews)
// const reviews = [
//   {
//     name: "John D.",
//     rating: 5,
//     text: "Amazing stay! Clean rooms, friendly staff, and perfect location near Etisalat building.",
//     location: "Majestic Town",
//   },
//   {
//     name: "Aisha K.",
//     rating: 5,
//     text: "The Queen Room was spacious and comfortable. Highly recommend Vouge Inn for daily stays.",
//     location: "Vouge Inn",
//   },
//   {
//     name: "Mohammed R.",
//     rating: 4,
//     text: "DSV Property is well-maintained and quiet. Shared kitchen was convenient. Will stay again.",
//     location: "DSV Property",
//   },
// ];

// const ReviewsSection = () => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useGSAP(
//     () => {
//       const ctx = gsap.context(() => {
//         gsap.from(".review-card", {
//           scrollTrigger: {
//             trigger: ".reviews-wrapper",
//             start: "top 85%",
//           },
//           opacity: 0,
//           y: 50,
//           duration: 1,
//           stagger: 0.2,
//           ease: "power3.out",
//         });
//       }, containerRef);

//       return () => ctx.revert();
//     },
//     { scope: containerRef },
//   );

//   return (
//     <section ref={containerRef} className="w-full bg-white py-20 px-6">
//       <div className="max-w-7xl mx-auto text-center mb-12">
//         <p className="uppercase tracking-[4px] text-amber-500 text-xs sm:text-sm mb-2">
//           Guest Reviews
//         </p>
//         <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light">
//           What Our Guests Say
//           <span className="block font-semibold">
//             Real Feedback from Google Reviews
//           </span>
//         </h2>
//       </div>

//       <div className="reviews-wrapper grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
//         {reviews.map((review, index) => (
//           <div
//             key={index}
//             className="review-card bg-gray-50 rounded-3xl shadow-lg p-6 flex flex-col"
//           >
//             {/* Star Rating */}
//             <div className="flex mb-3">
//               {Array.from({ length: review.rating }).map((_, i) => (
//                 <AiFillStar key={i} className="text-amber-500 text-lg" />
//               ))}
//               {Array.from({ length: 5 - review.rating }).map((_, i) => (
//                 <AiFillStar key={i} className="text-gray-300 text-lg" />
//               ))}
//             </div>

//             {/* Review Text */}
//             <p className="text-gray-700 mb-4 flex-1">{review.text}</p>

//             {/* Guest Name & Location */}
//             <p className="text-gray-900 font-semibold">{review.name}</p>
//             <p className="text-gray-500 text-sm">{review.location}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ReviewsSection;
