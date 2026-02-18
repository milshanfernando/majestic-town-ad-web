"use client";

import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14">
        {/* Left Side – Image */}
        {/* Left Side – Two Images */}
        <div className="relative w-full h-[500px] flex items-center justify-center">
          {/* King Room (Main Image) */}
          <div className="relative w-[80%] h-[400px] lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/kingbed.jpg"
              alt="King Room"
              fill
              className="object-cover"
            />
          </div>

          {/* Single Room (Floating Image) */}
          <div className="absolute bottom-0 right-0 w-[55%] h-[250px] lg:h-[300px] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
            <Image
              src="/images/singlebed.jpg"
              alt="Single Room"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Side – Content */}
        <div>
          <p className="uppercase tracking-[4px] text-amber-500 text-xs sm:text-sm mb-4">
            About Our Properties
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6 leading-tight">
            Modern & Affordable
            <span className="block font-semibold">
              Guest Living in Abu Dhabi
            </span>
          </h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            We proudly operate three well-maintained guest house properties in
            Abu Dhabi, offering clean, comfortable, and affordable accommodation
            for daily stays.
          </p>

          {/* Property List */}
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-semibold text-lg">Majestic Town</h3>
              <p className="text-gray-600 text-sm">
                Located in Khalidiya, near Etisalat Building.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Vouge Inn</h3>
              <p className="text-gray-600 text-sm">
                Located in Khalidiya, near Etisalat Building.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">DSV Property</h3>
              <p className="text-gray-600 text-sm">
                Near Shining Tower, Al Khalidiya.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-amber-500 text-lg">✔</span>
              <span className="text-gray-700 text-sm">Prime Location</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-amber-500 text-lg">✔</span>
              <span className="text-gray-700 text-sm">Daily Housekeeping</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-amber-500 text-lg">✔</span>
              <span className="text-gray-700 text-sm">High-Speed WiFi</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-amber-500 text-lg">✔</span>
              <span className="text-gray-700 text-sm">
                Affordable Daily Rates
              </span>
            </div>
          </div>

          {/* Room Types */}
          <div>
            <h4 className="font-semibold mb-3">Room Types Available:</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Single Rooms, Queen Rooms, and King Rooms with clean shared
              washrooms and kitchen facilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
