import { Emissions } from '@/features/emissions';
import Head from 'next/head';

export default function Home() {
	return (
		<>
			<Head>
				<title>Carbon Emmisions by Week - Logo Text Here</title>
			</Head>
			<main className='h-screen w-screen bg-white'>
				<Emissions />
			</main>
		</>
	);
}
