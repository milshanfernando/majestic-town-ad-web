"use client";

import PremiumPropertySection from "./PremiumPropertySection";

const properties = [
  {
    name: "Majestic Town",
    subtitle: "Comfortable Guest Living",
    description:
      "Affordable daily stay rooms in Khalidiya with peaceful and clean facilities.",
    location: "Khalidiya, Abu Dhabi",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    mainImage: "/images/kingbed.jpeg",
    gallery: [
      "/images/queen-s.jpeg",
      "/images/single-s.jpeg",
      "/images/washroom-s.jpeg",
      "/images/kitchen-s.jpeg",
    ],
    rooms: [
      {
        title: "Single Room",
        description: "Perfect for solo guests",
        image: "",
      },
      {
        title: "Queen Room",
        description: "Spacious room for couples",
        image: "",
      },
    ],
  },
  {
    name: "Vouge Inn",
    subtitle: "Modern & Elegant Stay",
    description: "Stylish and affordable accommodation with central access.",
    location: "Khalidiya, Abu Dhabi",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    mainImage: "/images/kingbed.jpeg",
    gallery: [
      "/images/single-v-1.jpeg",
      "/images/single-v-2.jpeg",
      "/images/kitchen-v.jpeg",
      "/images/loby-v.jpeg",
    ],
    rooms: [
      {
        title: "Single Room",
        description: "Modern minimal design",
        image: "/images/single-v-1.jpeg",
      },
    ],
  },
  {
    name: "DSV Property",
    subtitle: "Affordable & Clean Living",
    description: "Budget-friendly daily stay with excellent location.",
    location: "Al Khalidiya, Abu Dhabi",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    mainImage: "/images/kingbed.jpeg",
    gallery: [
      "/images/kingbed.jpeg",
      "/images/queen.jpeg",
      "/images/single-d.jpeg",
      "/images/kitchen-d.jpeg",
    ],
    rooms: [
      {
        title: "Single Room",
        description: "Comfortable private room",
        image: "",
      },
      { title: "Queen Room", description: "Spacious and relaxing", image: "" },
      {
        title: "King Room",
        description: "Extra comfort premium setup",
        image: "",
      },
    ],
  },
];

const PropertySection = () => (
  <section className="w-full bg-[#0e0d0b]">
    {properties.map((prop, index) => (
      <PremiumPropertySection key={prop.name} property={prop} index={index} />
    ))}
  </section>
);

export default PropertySection;
