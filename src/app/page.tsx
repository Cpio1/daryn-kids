import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Groups } from "@/components/Groups";
import { Activities } from "@/components/Activities";
import { Nutrition } from "@/components/Nutrition";
import { Gallery } from "@/components/Gallery";
import { Documents } from "@/components/Documents";
import { Contacts } from "@/components/Contacts";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getGalleryImages, getHeroMedia } from "@/lib/media";

export default function HomePage() {
  const heroMedia = getHeroMedia();
  const galleryImages = getGalleryImages();

  return (
    <>
      <Header />
      <main id="main">
        <Hero media={heroMedia} />
        <About />
        <Groups />
        <Activities />
        <Nutrition />
        <Gallery images={galleryImages} />
        <Documents />
        <Contacts />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
