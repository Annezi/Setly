import dynamic from "next/dynamic";
import { Header } from "@/app/components/globals/header/Header";
import { Footer } from "@/app/components/globals/footer/Footer";
import WelcomeScreen from "@/app/components/blocks/main/welcome-screen/welcome-screen";

export const metadata = {
  title: "Setly - чекпланы для планирования путешествий",
  description:
    "Мы разработали чек-планы, которые позволяют быстро спланировать путешествие и сосредоточиться на том, что действительно важно. Скажи «пока» тревоге при планировании путешествий.",
  alternates: {
    canonical: "https://setly.space",
  },
};

const ThreeSteps = dynamic(
  () => import("@/app/components/blocks/main/three-steps/three-steps"),
  { loading: () => <div style={{ minHeight: 280 }} aria-hidden /> }
);
const IdealWay = dynamic(
  () => import("@/app/components/blocks/main/ideal-way/ideal-way"),
  { loading: () => <div style={{ minHeight: 280 }} aria-hidden /> }
);
const OurCommunity = dynamic(
  () => import("@/app/components/blocks/main/our-community/our-community"),
  { loading: () => <div style={{ minHeight: 360 }} aria-hidden /> }
);
const OurExperience = dynamic(
  () => import("@/app/components/blocks/main/our-experience/our-experience"),
  { loading: () => <div style={{ minHeight: 320 }} aria-hidden /> }
);

export default function MainPage() {
	return (
		<>
			<div className="container">
				<Header />
				<WelcomeScreen />
				<ThreeSteps />
				<IdealWay />
				<OurCommunity />
				<OurExperience />
				<Footer />
			</div>
		</>
	);
}
