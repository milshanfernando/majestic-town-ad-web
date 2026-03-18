import Hero from "../components/Hero";
import Promotions from "../components/Promotions";
import RoomShowcase from "../components/Roomshowcase";
import Welcome from "../components/Welcome";
import ContactLocation from "../components/Contactlocation";
import Gallery, { GalleryPhoto } from "../components/Gallery";

// ── Room data ────────────────────────────────────────────────────────────────
const deluxeKing = {
  id: "deluxe-king",
  type: "Deluxe King",
  tagline: "Space, serenity & a bed worth staying in.",
  description:
    "Our signature Deluxe King room offers a plush king-sized bed dressed in premium Egyptian cotton, blackout curtains, and a private ensuite bathroom. Thoughtfully designed with the modern traveller in mind — whether you're here for business or leisure, every detail is taken care of. The room overlooks our quiet inner courtyard, ensuring a restful night in the heart of Abu Dhabi.",
  rate: 89,
  currency: "$",
  roomSize: "320 sq ft",
  bedSize: "1 King Bed",
  maxGuests: 2,
  checkIn: "2:00 PM",
  checkOut: "11:00 AM",
  facilities: [
    { label: "Free Wi-Fi", icon: null },
    { label: "Air Conditioning", icon: null },
    { label: "Smart TV", icon: null },
    { label: "Work Desk", icon: null },
    { label: "Wardrobe", icon: null },
    { label: "Electric Kettle", icon: null },
    { label: "In-Room Safe", icon: null },
  ],
  photos: ["/images/single-v-2.jpeg", "/images/kingbed.jpeg"],
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
      "/images/bathroom.jpeg", // ← replace with your actual bathroom photos
      "/images/bathroom-2.jpeg",
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
      "/images/kitchen.jpeg", // ← replace with your actual kitchen photos
      "/images/kitchen-2.jpeg",
    ],
  },
];

const galleryPhotos: GalleryPhoto[] = [
  {
    src: "/images/12.jpeg",
    alt: "Superior Single Room",
    span: "tall",
  },
  { src: "/images/1.jpeg", alt: "Deluxe Single Room" },
  { src: "/images/2.jpeg", alt: "Queen Room" },
  { src: "/images/3.jpeg", alt: "Deluxe King Room", span: "wide" },
  { src: "/images/4.jpeg", alt: "Shared Bathroom" },
  { src: "/images/5.jpeg", alt: "Common Kitchen", span: "tall" },
  { src: "/images/6.jpeg", alt: "Room Interior" },
  { src: "/images/7.jpeg", alt: "Bathroom Facilities" },
  { src: "/images/8.jpeg", alt: "Kitchen Facilities" },
  { src: "/images/9.jpeg", alt: "Superior Single — Detail" },
  {
    src: "/images/10.jpeg",
    alt: "Deluxe Single — Detail",
    span: "wide",
  },
  { src: "/images/11.jpeg", alt: "Queen Room — Detail" },
];

export default function Home() {
  return (
    <main className="w-dvw overflow-hidden">
      <Hero />
      <Welcome
        hotelName="Vouge Inn Abu Dhabi"
        image="/images/single-v-2.jpeg"
      />
      <RoomShowcase
        room={deluxeKing}
        badge="Most Popular"
        imageRight={false}
        sharedSpaces={sharedSpaces}
      />
      <Gallery
        photos={galleryPhotos}
        title="Inside Vouge Inn"
        subtitle="Every corner, captured."
      />
      <Promotions />
      <ContactLocation
        hotelName="Vogue Inn Abu Dhabi"
        address="12 Dawhat Al Hamra St, Al Hisn - W4"
        city="Abu Dhabi, UAE"
        mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.1740708990565!2d54.35727207433463!3d24.47942486040078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e666daf037d95%3A0x2d0daa2decd9484f!2sVogue%20Inn%20Abu%20Dhabi!5e0!3m2!1sen!2sae!4v1773817321062!5m2!1sen!2sae"
        directionsUrl="https://www.google.com/maps/dir/?api=1&destination=Vogue+Inn+Abu+Dhabi,+12+Dawhat+Al+Hamra+St,+Al+Hisn,+Abu+Dhabi"
        phone="+971 54 757 5749"
        whatsapp="+971 54 757 5749"
        email="majestictown.ad@gmail.com"
        receptionHours="Open 24 Hours"
        landmark="5 min drive to Abu Dhabi Corniche · Near Abu Dhabi Mall"
        socials={[
          {
            platform: "instagram",
            url: "https://instagram.com/vogueinn",
            handle: "@vogueinn",
          },
          {
            platform: "facebook",
            url: "https://facebook.com/vogueinn",
            handle: "Vogue Inn",
          },
          {
            platform: "whatsapp",
            url: "https://wa.me/971501234567",
            handle: "Chat with us",
          },
        ]}
      />
    </main>
  );
}
