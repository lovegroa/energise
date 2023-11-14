import BarChart from '@/components/charts/barChart/BarChart';
import { useGetEmissions } from '../api/getEmissions.api';
import Logo from '@/assets/logo-text-here.png';
import Image from 'next/image';
import Spinner from '@/components/elements/spinner/Spinner';

export const Emissions = () => {
	const { data, error, isLoading } = useGetEmissions();

	let average: number | undefined = undefined;

	if (data) {
		average = data.reduce((acc, datapoint) => acc + datapoint.tCO2e, 0) / data.length;
	}

	return (
		<div className='chart-container'>
			<Image height={150} src={Logo} alt='logo-text-here-logo' />
			<h1>Carbon Emmisions by Week</h1>
			<div className='full'>
				{error ? (
					<p>An error has occoured getting the data</p>
				) : isLoading ? (
					<Spinner />
				) : (
					<BarChart data={data} xAxisDataKey='week' barDataKeys={['tCO2e']} xAxisTitle='Week Number' yAxisTitle='tCO2e' average={average} />
				)}
			</div>
		</div>
	);
};
