import Hero from "../components/Hero";
import Promotions from "../components/Promotions";
import RoomShowcase from "../components/Roomshowcase";
import Welcome from "../components/Welcome";
import ContactLocation from "../components/Contactlocation";
import Gallery, { GalleryPhoto } from "../components/Gallery";

// ── Room data ────────────────────────────────────────────────────────────────

const singleRoom = {
  id: "single-room",
  type: "Single Room",
  tagline: "Everything you need, nothing you don't.",
  description:
    "The Single Room at DSV Property is a smart, well-appointed space built for the solo traveller. A comfortable single bed, thoughtful amenities, and a calm atmosphere make it the ideal base for both short stays and extended visits in Abu Dhabi. Air conditioning is centrally managed and shared across the floor for a simple, hassle-free experience.",
  rate: 39,
  currency: "$",
  roomSize: "150 sq ft",
  bedSize: "1 Single Bed",
  maxGuests: 1,
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
  photos: ["/images/single-room.jpeg", "/images/single-room-2.jpeg"],
};

const queenRoom = {
  id: "queen-room",
  type: "Queen Room",
  tagline: "A little luxury for two.",
  description:
    "The Queen Room at DSV Property is designed for couples or guests who prefer a little extra space. A plush queen-sized bed dressed in premium linens sits at the heart of the room, surrounded by a warm and welcoming layout. Air conditioning is shared across the floor, and shared bathroom facilities are kept to a high standard of cleanliness at all times.",
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
  photos: ["/images/dsv/queen1.jpeg", "/images/dsv/queen2.jpeg"],
};

const kingRoom = {
  id: "king-room",
  type: "Deluxe King",
  tagline: "Space, serenity & a bed worth staying in.",
  description:
    "Our flagship Deluxe King room at DSV Property offers a grand king-sized bed dressed in premium Egyptian cotton, blackout curtains, and your own private AC controller — so you sleep exactly as you like. Whether here for business or a long-term stay, every detail has been considered. Enjoy the quiet and comfort of a room that truly feels like your own.",
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
    "/images/dsv/king3.jpeg",
    "/images/dsv/king1.jpeg",
    "/images/dsv/king2.jpeg",

    "/images/dsv/king4.jpeg",
    "/images/dsv/king5.jpeg",
    "/images/dsv/king6.jpeg",
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
      "/images/dsv/washroom4.jpeg",
      "/images/dsv/washroom1.jpeg",
      "/images/dsv/washroom.jpeg",
      "/images/dsv/washroom3.jpeg",
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
      "/images/dsv/kitchen1.jpeg",
      "/images/dsv/kitchen2.jpeg",
      "/images/dsv/kitchen3.jpeg",
      "/images/dsv/kitchen4.jpeg",
      "/images/dsv/kitchen5.jpeg",
    ],
  },
];

const galleryPhotos: GalleryPhoto[] = [
  {
    src: "/images/dsv/lobby.jpeg",
    alt: "DSV Property Lobby",
    span: "tall",
  },
  { src: "/images/dsv/king3.jpeg", alt: "Deluxe King Room" },
  { src: "/images/dsv/king4.jpeg", alt: "Deluxe King Room" },
  { src: "/images/dsv/queen1.jpeg", alt: "Queen Room", span: "wide" },
  { src: "/images/dsv/queen2.jpeg", alt: "Queen Room" },
  // { src: "/images/dsv/single1.jpeg", alt: "Single Room" },
  // { src: "/images/dsv/single2.jpeg", alt: "Single Room" },
  { src: "/images/dsv/washroom1.jpeg", alt: "Shared Washroom" },
  { src: "/images/dsv/washroom.jpeg", alt: "Shared Washroom" },
  { src: "/images/dsv/washroom3.jpeg", alt: "Shared Washroom" },
  { src: "/images/dsv/washroom4.jpeg", alt: "Shared Washroom" },
  { src: "/images/dsv/kitchen1.jpeg", alt: "Common Kitchen" },
  { src: "/images/dsv/kitchen2.jpeg", alt: "Common Kitchen" },
  { src: "/images/dsv/kitchen3.jpeg", alt: "Common Kitchen" },
  { src: "/images/dsv/kitchen4.jpeg", alt: "Common Kitchen" },
  { src: "/images/dsv/kitchen5.jpeg", alt: "Common Kitchen" },
];

export default function Home() {
  return (
    <main className="w-dvw overflow-hidden">
      <Hero />
      <Welcome
        hotelName="DSV Property Abu Dhabi"
        image="/images/dsv/king6.jpeg"
      />
      {/* <RoomShowcase
        room={singleRoom}
        badge="Best Value"
        imageRight={false}
        sharedSpaces={sharedSpaces}
      /> */}
      <RoomShowcase
        room={kingRoom}
        badge="Most Popular"
        imageRight={false}
        // sharedSpaces={sharedSpaces}
      />
      <RoomShowcase
        room={queenRoom}
        badge="For Couples"
        imageRight={true}
        sharedSpaces={sharedSpaces}
      />

      <Gallery
        photos={galleryPhotos}
        title="Inside DSV Property"
        subtitle="Every corner, captured."
      />
      <Promotions />
      <ContactLocation
        hotelName="DSV Property Abu Dhabi"
        address="Abu Dhabi, UAE"
        city="Abu Dhabi, UAE"
        mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.3705393028636!2d54.346643374334406!3d24.472615060669312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e675e9ca9f195%3A0x3b34becd8a45c442!2sDSV%20Property!5e0!3m2!1sen!2sae!4v1773824567886!5m2!1sen!2sae"
        directionsUrl="https://maps.app.goo.gl/19dqDTAwJz2H6WAx9"
        phone="+971 54 757 5749"
        whatsapp="+971 54 757 5749"
        email="majestictown.ad@gmail.com"
        receptionHours="Open 24 Hours"
        landmark="Located in Abu Dhabi"
        socials={[
          {
            platform: "instagram",
            url: "https://instagram.com/dsvproperty",
            handle: "@dsvproperty",
          },
          {
            platform: "facebook",
            url: "https://facebook.com/dsvproperty",
            handle: "DSV Property Abu Dhabi",
          },
          {
            platform: "whatsapp",
            url: "https://wa.me/971500000000",
            handle: "Chat with us",
          },
        ]}
      />
    </main>
  );
}
