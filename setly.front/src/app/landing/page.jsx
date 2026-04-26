import dynamic from "next/dynamic";
import { LandingHeader } from "@/app/components/globals/landing-header/landing-header";
import { Footer } from "@/app/components/globals/footer/Footer";
import WelcomeScreen from "@/app/components/blocks/main/welcome-screen/welcome-screen";
import ScrollReveal from "@/app/components/globals/scroll-reveal/scroll-reveal";

const ThreeSteps = dynamic(
  () => import("@/app/components/blocks/main/three-steps/three-steps"),
  { loading: () => <div style={{ minHeight: 280 }} aria-hidden /> }
);
const IdealWay = dynamic(
  () => import("@/app/components/blocks/main/ideal-way/ideal-way"),
  { loading: () => <div style={{ minHeight: 280 }} aria-hidden /> }
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
