import dynamic from "next/dynamic";
import { LandingHeader } from "@/app/components/globals/landing-header/landing-header";
import { Footer } from "@/app/components/globals/footer/Footer";
import WelcomeScreen from "@/app/components/blocks/main/welcome-screen/welcome-screen";
import ScrollReveal from "@/app/components/globals/scroll-reveal/scroll-reveal";

function SectionFallback({ minHeight }) {
  return (
    <div style={{ minHeight, borderRadius: 16 }} aria-busy="true" aria-label="Загрузка секции">
      <div style={{ height: 32, width: "40%", marginBottom: 16 }} />
      <div style={{ height: minHeight - 48 }} />
    </div>
  );
}

const ThreeSteps = dynamic(
  () => import("@/app/components/blocks/main/three-steps/three-steps"),
  { loading: () => <SectionFallback minHeight={280} /> }
);
const IdealWay = dynamic(
  () => import("@/app/components/blocks/main/ideal-way/ideal-way"),
  { loading: () => <SectionFallback minHeight={280} /> }
);

export default function LandingPage() {
  return (
    <div className="container main-page-reveal">
      <ScrollReveal delay={0}>
        <LandingHeader />
      </ScrollReveal>
      <ScrollReveal delay={40}>
        <WelcomeScreen />
      </ScrollReveal>
      <ScrollReveal delay={90}>
        <ThreeSteps />
      </ScrollReveal>
      <ScrollReveal delay={140}>
        <IdealWay />
      </ScrollReveal>
      <ScrollReveal delay={190}>
        <Footer />
      </ScrollReveal>
    </div>
  );
}
