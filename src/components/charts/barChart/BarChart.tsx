import {
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
	BarChart as BarChartComp,
	Bar,
	Label,
	TooltipProps,
	ReferenceLine,
	Legend,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, number>) => {
	if (!(active && payload && payload.length && payload[0].value)) return null;

	return (
		<div className='bg-white p-4 rounded-lg shadow-lg'>
			<p>
				<strong>Week:</strong>
				{` ${label}`}
			</p>
			<p>
				<strong>{payload[0].name}:</strong>
				{` ${payload[0].value.toFixed(2)}`}
			</p>
		</div>
	);
};

type Props = {
	data: any[] | undefined;
	xAxisDataKey: string;
	xAxisTitle: string;
	yAxisTitle: string;
	barDataKeys: string[];
	average?: number;
};

const BarChart = ({ data, xAxisDataKey, barDataKeys, xAxisTitle, yAxisTitle, average }: Props) => {
	return (
		<ResponsiveContainer width='100%' height='100%'>
			<BarChartComp data={data} margin={{ top: 5, right: 70, left: 30, bottom: 20 }}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey={xAxisDataKey} interval={3}>
					<Label value={xAxisTitle} position='insideBottom' offset={-20} fill='black' />
				</XAxis>
				<YAxis>
					<Label value={yAxisTitle} position='insideLeft' offset={-30} fill='black' />
				</YAxis>
				<Tooltip content={<CustomTooltip />} />

				<ReferenceLine
					y={150}
					stroke='black'
					strokeWidth={3}
					label={{ value: 'Target', fill: 'black', position: 'insideRight', offset: -58 }}
				/>
				<ReferenceLine
					y={average}
					stroke='black'
					strokeWidth={3}
					label={{ value: 'Average', fill: 'black', position: 'insideRight', offset: -70 }}
				/>

				{barDataKeys.map((barDataKey) => (
					<Bar key={barDataKey} type='monotone' dataKey={barDataKey} fill='#168d16' />
				))}
			</BarChartComp>
		</ResponsiveContainer>
	);
};

export default BarChart;
