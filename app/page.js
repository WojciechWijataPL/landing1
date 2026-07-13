import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Comparison from "@/components/Comparison";
import Gallery from "@/components/Gallery";
import RegionTrust from "@/components/RegionTrust";
import Process from "@/components/Process";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import LegalProvider from "@/components/legal/LegalProvider";
import QuoteProvider from "@/components/wizard/QuoteProvider";

export default function Home() {
  return (
    <LegalProvider>
      <QuoteProvider>
        <Navbar />
        <main>
          <Hero />
          <Benefits />
          <Comparison />
          <Gallery />
          <RegionTrust />
          <Process />
          <ContactForm />
        </main>
        <Footer />
      </QuoteProvider>
    </LegalProvider>
  );
}
