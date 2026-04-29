import dynamic from "next/dynamic";
import { Header } from "@/app/components/globals/header/Header";
import { Footer } from "@/app/components/globals/footer/Footer";
import WelcomeScreen from "@/app/components/blocks/main/welcome-screen/welcome-screen";
import ScrollReveal from "@/app/components/globals/scroll-reveal/scroll-reveal";
import { shareMetadataBundle } from "@/app/lib/og-helpers";

function SectionFallback({ minHeight }) {
  return (
    <div style={{ minHeight, borderRadius: 16 }} aria-busy="true" aria-label="Загрузка секции">
      <div style={{ height: 32, width: "40%", marginBottom: 16 }} />
      <div style={{ height: minHeight - 48 }} />
    </div>
  );
}

export const metadata = shareMetadataBundle({
  fullTitle: true,
  segmentTitle: "Setly - чекпланы для планирования путешествий",
  description:
    "Мы разработали чек-планы, которые позволяют быстро спланировать путешествие и сосредоточиться на том, что действительно важно. Скажи «пока» тревоге при планировании путешествий.",
  path: "/",
});

const ThreeSteps = dynamic(
	() => import("@/app/components/blocks/main/three-steps/three-steps"),
	{ loading: () => <SectionFallback minHeight={280} /> }
);
const IdealWay = dynamic(
	() => import("@/app/components/blocks/main/ideal-way/ideal-way"),
	{ loading: () => <SectionFallback minHeight={280} /> }
);
const OurCommunity = dynamic(
	() => import("@/app/components/blocks/main/our-community/our-community"),
	{ loading: () => <SectionFallback minHeight={360} /> }
);
const OurExperience = dynamic(
	() => import("@/app/components/blocks/main/our-experience/our-experience"),
	{ loading: () => <SectionFallback minHeight={320} /> }
);

export default function MainPage() {
	return (
		<>
			<div className="container main-page-reveal">
				<Header />
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
					<OurCommunity />
				</ScrollReveal>
				<ScrollReveal delay={240}>
					<OurExperience />
				</ScrollReveal>
				<ScrollReveal delay={280}>
					<Footer />
				</ScrollReveal>
			</div>
		</>
	);
}
