import dynamic from "next/dynamic";
import { LandingHeader } from "@/app/components/globals/landing-header/landing-header";
import { Footer } from "@/app/components/globals/footer/Footer";
import WelcomeScreen from "@/app/components/blocks/main/welcome-screen/welcome-screen";

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
    <div className="container">
      <LandingHeader />
      <WelcomeScreen />
      <ThreeSteps />
      <IdealWay />
      <Footer />
    </div>
  );
}
