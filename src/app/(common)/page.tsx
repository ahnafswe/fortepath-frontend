import { CallToAction } from "@/components/home/CallToAction";
import { Categories } from "@/components/home/Categories";
import { Features } from "@/components/home/Features";
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { Trust } from "@/components/home/Trust";
import { Stats } from "@/components/home/Stats";
import { FAQ } from "@/components/home/FAQ";
import { Benefits } from "@/components/home/Benefits";
import { Mission } from "@/components/home/Mission";

export default function Home() {
	return (
		<main className="px-6 md:px-12 lg:px-24 xl:px-48 2xl:px-80 py-16 md:py-28 overflow-x-hidden">
			<Hero />
			<Features />
			<Stats />
			<Categories />
			<Benefits />
			<Trust />
			<FAQ />
			<Process />
			<Mission />
			<CallToAction />
		</main>
	);
}
