import { GameCard } from "@/components/GameCard";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";

const games = [
  { title: "Apex Legends", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80", products: 13, price: "$6.99" },
  { title: "Arc Raiders", image: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0a?w=800&q=80", products: 23, price: "$4.99" },
  { title: "Battlefield 6", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80", products: 11, price: "$7.99" },
  { title: "Black Ops 7", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80", products: 20, price: "$4.99" },
  { title: "Counter Strike 2", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80", products: 13, price: "$3.99" },
  { title: "DayZ", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80", products: 9, price: "$6.99" },
  { title: "DMA", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", products: 16, price: "$37.99" },
  { title: "Escape from Tarkov", image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80", products: 31, price: "$2.49" },
  { title: "Fortnite", image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80", products: 19, price: "$5.99" },
  { title: "HWID Spoofer", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80", products: 13, price: "$4.99" },
  { title: "Marvel Rivals", image: "https://images.unsplash.com/photo-1612287230217-8c7c6c170b90?w=800&q=80", products: 7, price: "$4.99" },
  { title: "PUBG", image: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=800&q=80", products: 8, price: "$5.99" },
  { title: "Rainbow Six Siege", image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&q=80", products: 29, price: "$5.99" },
  { title: "Rocket League", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80", products: 4, price: "$5.99" },
  { title: "Rust", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80", products: 31, price: "$6.99" },
  { title: "Valorant", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80", products: 11, price: "$4.99" },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section className="relative z-10 px-6 pb-24 max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-extrabold mb-2">Our Products</h2>
          <p className="text-nv-text-muted">Browse our extensive collection of premium game enhancements</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game, i) => (
            <GameCard key={game.title} {...game} delay={i * 0.05} />
          ))}
        </div>
      </section>
      <FeaturesSection />
    </>
  );
}