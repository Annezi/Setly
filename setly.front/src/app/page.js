"use client";

import { Header } from "@/app/components/globals/header/Header";
import { Footer } from "@/app/components/globals/footer/Footer";
import WelcomeScreen from "@/app/components/blocks/main/welcome-screen/welcome-screen";
import ThreeSteps from "@/app/components/blocks/main/three-steps/three-steps";
import IdealWay from "@/app/components/blocks/main/ideal-way/ideal-way";
import OurCommunity from "@/app/components/blocks/main/our-community/our-community";
import OurExperience from "@/app/components/blocks/main/our-experience/our-experience";

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
