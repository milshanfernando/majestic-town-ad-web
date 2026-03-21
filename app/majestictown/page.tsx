import Hero from "../components/Hero";
import Promotions from "../components/Promotions";
import RoomShowcase from "../components/Roomshowcase";
import Welcome from "../components/Welcome";
import ContactLocation from "../components/Contactlocation";
import Gallery, { GalleryPhoto } from "../components/Gallery";

// ── Room data ────────────────────────────────────────────────────────────────

const superiorSingle = {
  id: "superior-single",
  type: "Superior Single",
  tagline: "Your own space, your own comfort.",
  description:
    "The Superior Single room is designed for the solo traveller who values independence and comfort. Enjoy your own private space with a cosy single bed dressed in premium cotton linens. This room comes with its own in-room AC controller, giving you full control over your comfort. Ideal for business travellers or anyone looking for a quiet, personal retreat in the heart of Abu Dhabi.",
  rate: 49,
  currency: "$",
  roomSize: "160 sq ft",
  bedSize: "1 Single Bed",
  maxGuests: 1,
  checkIn: "2:00 PM",
  checkOut: "11:00 AM",
  facilities: [
    { label: "Free Wi-Fi", icon: null },
    { label: "Private AC Controller", icon: null },
    { label: "Smart TV", icon: null },
    { label: "Work Desk", icon: null },
    { label: "Wardrobe", icon: null },
    { label: "Electric Kettle", icon: null },
    { label: "In-Room Safe", icon: null },
  ],
  photos: [
    "/images/majestictown/single_room.jpeg",
    "/images/majestictown/single_room4.jpeg",
    "/images/majestictown/single_room2.jpeg",
  ],
};

const deluxeSingle = {
  id: "deluxe-single",
  type: "Deluxe Single",
  tagline: "Smart comfort for the savvy solo traveller.",
  description:
    "Our Deluxe Single room offers a welcoming and well-appointed space for the solo guest. With a comfortable single bed and thoughtfully curated amenities, it's everything you need without the extras you don't. Air conditioning is centrally managed and shared across the floor, keeping things simple and cost-effective. A great choice for short stays and budget-conscious travellers.",
  rate: 100,
  currency: "AED",
  roomSize: "150 sq ft",
  bedSize: "1 Single Bed",
  maxGuests: 1,
  checkIn: "2:00 PM",
  checkOut: "11:00 AM",
  facilities: [
    { label: "Free Wi-Fi", icon: null },
    { label: "Shared AC", icon: null },
    // { label: "Smart TV", icon: null },
    { label: "Work Desk", icon: null },
    { label: "Wardrobe", icon: null },
    // { label: "Electric Kettle", icon: null },
    { label: "In-Room Safe", icon: null },
  ],
  photos: [
    "/images/deluxe/deluxe-single1.jpeg",
    "/images/deluxe/deluxe-single2.jpeg",
  ],
};

const queenRoom = {
  id: "queen-room",
  type: "Queen Room",
  tagline: "A little luxury for two.",
  description:
    "Our Queen Room is the perfect choice for couples seeking comfort and togetherness. Sink into a plush queen-sized bed dressed in soft premium linens, and enjoy a space designed with romance and relaxation in mind. The room features a spacious layout, warm lighting, and a shared bathroom conveniently located nearby — all in the heart of Abu Dhabi.",
  rate: 69,
  currency: "$",
  roomSize: "240 sq ft",
  bedSize: "1 Queen Bed",
  maxGuests: 2,
  checkIn: "2:00 PM",
  checkOut: "11:00 AM",
  facilities: [
    { label: "Free Wi-Fi", icon: null },
    { label: "Shared AC", icon: null },
    { label: "Smart TV", icon: null },
    { label: "Work Desk", icon: null },
    { label: "Wardrobe", icon: null },
    { label: "Electric Kettle", icon: null },
    { label: "In-Room Safe", icon: null },
  ],
  photos: [
    "/images/majestictown/queen_room.jpeg",
    "/images/majestictown/queen_room2.jpeg",
    "/images/majestictown/queen_room3.jpeg",
  ],
};

const kingRoom = {
  id: "king-room",
  type: "Superior King",
  tagline: "Space, serenity & a bed worth staying in.",
  description:
    "Our signature Superior King room offers a plush king-sized bed dressed in premium Egyptian cotton, blackout curtains, and your own private AC controller — so you sleep exactly as you like. Thoughtfully designed with the modern traveller in mind, whether you're here for business or leisure. The room overlooks our quiet inner courtyard, ensuring a restful night in the heart of Abu Dhabi.",
  rate: 89,
  currency: "$",
  roomSize: "320 sq ft",
  bedSize: "1 King Bed",
  maxGuests: 2,
  checkIn: "2:00 PM",
  checkOut: "11:00 AM",
  facilities: [
    { label: "Free Wi-Fi", icon: null },
    { label: "Private AC Controller", icon: null },
    { label: "Smart TV", icon: null },
    { label: "Work Desk", icon: null },
    { label: "Wardrobe", icon: null },
    { label: "Electric Kettle", icon: null },
    { label: "In-Room Safe", icon: null },
  ],
  photos: [
    "/images/majestictown/superior-king.jpeg",
    "/images/majestictown/superior-king2.jpeg",
    "/images/majestictown/superior-king3.jpeg",
    "/images/majestictown/superior-king4.jpeg",
  ],
};

// ── Shared spaces data ───────────────────────────────────────────────────────
const sharedSpaces = [
  {
    name: "Shared Washrooms",
    description:
      "Our clean, spacious washrooms are shared between a small number of guests — never more than 6 per bathroom. Hot water is available 24/7, and each shower stall has a privacy lock. Towels and basic toiletries are replenished daily.",
    capacity: "Max 6 guests per bathroom",
    features: [
      "Hot water 24/7",
      "Private shower stalls",
      "Daily cleaning",
      "Towels provided",
      "Toiletries included",
      "Hair dryer available",
    ],
    photos: [
      "/images/majestictown/washroom-1.jpeg",
      "/images/majestictown/washroom-2.jpeg",
      "/images/majestictown/washroom-3.jpeg",
    ],
  },
  {
    name: "Common Kitchen",
    description:
      "A fully equipped communal kitchen available to all guests around the clock. Cook your own meals, store groceries in your labelled shelf, and enjoy a proper home-cooked breakfast before your day begins. Cooking equipment and basic condiments are always stocked.",
    capacity: "Open to all guests · 24 hr access",
    features: [
      "Full-size fridge",
      "Gas hob & oven",
      "Microwave",
      "Cooking utensils",
      "Labelled storage shelf",
      "Tea & coffee station",
      "Dining area",
      "Daily cleaning",
    ],
    photos: [
      "/images/23.jpeg",
      "/images/majestictown/kitchen2.jpeg",
      "/images/majestictown/kitchen-m.jpeg",
      "/images/majestictown/kitchen1.jpeg",
      "/images/majestictown/kitchen-d.jpeg",
    ],
  },
];

// ── Gallery photos ────────────────────────────────────────────────────────────
// span: "tall" = 2 rows tall, "wide" = 2 cols wide, omit for normal
const galleryPhotos: GalleryPhoto[] = [
  { src: "/images/majestictown/balcony.jpeg", alt: "Majestic Town Balcony" },
  { src: "/images/majestictown/hall.jpeg", alt: "Majestic Town Hallway" },
  {
    src: "/images/majestictown/single_room.jpeg",
    alt: "Majestic Town Single Room",
  },
  {
    src: "/images/majestictown/queen_room.jpeg",
    alt: "Majestic Town Queen Room",
  },
  {
    src: "/images/majestictown/superior-king.jpeg",
    alt: "Majestic Town Superior King Room",
  },
  {
    src: "/images/majestictown/superior-king2.jpeg",
    alt: "Majestic Town Superior King Room",
  },
  {
    src: "/images/majestictown/queen_room3.jpeg",
    alt: "Majestic Town Queen Room",
    span: "tall",
  },
  {
    src: "/images/majestictown/single_room4.jpeg",
    alt: "Majestic Town Single Room",
  },
  {
    src: "/images/majestictown/single_room2.jpeg",
    alt: "Majestic Town Single Room",
  },
  {
    src: "/images/majestictown/queen_room2.jpeg",
    alt: "Majestic Town Queen Room",
  },
];

export default function Home() {
  return (
    <main className="w-dvw overflow-hidden">
      <Hero />
      <Welcome hotelName="Majestic Town Abu Dhabi" image="/images/12.jpeg" />
      <RoomShowcase
        room={superiorSingle}
        badge="Private AC"
        imageRight={false}
        // sharedSpaces={sharedSpaces}
      />
      <RoomShowcase
        room={deluxeSingle}
        badge="Best Value"
        imageRight={true}
        // sharedSpaces={sharedSpaces}
      />
      <RoomShowcase
        room={queenRoom}
        badge="For Couples"
        imageRight={false}
        // sharedSpaces={sharedSpaces}
      />
      <RoomShowcase
        room={kingRoom}
        badge="Most Popular"
        imageRight={true}
        sharedSpaces={sharedSpaces}
      />
      <Gallery
        photos={galleryPhotos}
        title="Inside Majestic Town"
        subtitle="Every corner, captured."
      />
      <Promotions />
      <ContactLocation
        hotelName="Majestic Town Abu Dhabi"
        address="12 Dawhat Al Hamra St, Al Hisn - W4"
        city="Abu Dhabi, UAE"
        mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.1726829915465!2d54.35719387433475!3d24.479472960398727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e672dd76321c1%3A0xa3f9add3638088c5!2sMajestic%20Town%20Guest%20House!5e0!3m2!1sen!2sae!4v1773819962995!5m2!1sen!2sae"
        directionsUrl="https://maps.app.goo.gl/ww8A2UKvo8GKknMJA"
        phone="+971 54 757 5749"
        whatsapp="+971 54 757 5749"
        email="majestictown.ad@gmail.com"
        receptionHours="Open 24 Hours"
        landmark="5 min drive to Abu Dhabi Corniche · Near Abu Dhabi Mall"
        socials={[
          {
            platform: "instagram",
            url: "https://instagram.com/majestictown",
            handle: "@majestictown",
          },
          {
            platform: "facebook",
            url: "https://facebook.com/majestictown",
            handle: "Majestic Town Abu Dhabi",
          },
          {
            platform: "whatsapp",
            url: "https://wa.me/971547575749",
            handle: "Chat with us",
          },
        ]}
      />
    </main>
  );
}
