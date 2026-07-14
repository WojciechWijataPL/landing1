import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Comparison from "@/components/Comparison";
import SavingsCalculator from "@/components/SavingsCalculator";
import Gallery from "@/components/Gallery";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Faq from "@/components/Faq";
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
          <SavingsCalculator />
          <Gallery />
          <WhyUs />
          <Process />
          <Faq />
          <ContactForm />
        </main>
        <Footer />
      </QuoteProvider>
    </LegalProvider>
  );
}
