import axios from 'axios';
import { useQuery } from 'react-query';

type DataPoint = {
	week: number;
	tCO2e: number;
};

const parseEmissionsData = (data: string): DataPoint[] => {
	const rows = data.split('\n');

	// last row of data is potentially empty so needs to be removed
	if (rows[rows.length - 1].length !== 2) rows.pop();

	return rows.reduce<DataPoint[]>((acc, row, index) => {
		const cells = row.split(',');
		if (cells.length !== 2) throw new Error('Length of colums in CSV is incorrect');

		if (!index) {
			// check the header of the CSV
			if (cells[0] !== 'Week') throw new Error('Invalid header in CSV');
			if (cells[1] !== 'tCO2e') throw new Error('Invalid header in CSV');
			return acc;
		}

		let [week, tCO2e] = cells.map((cell) => Number(cell));

		if (!Number.isInteger(week)) throw new Error('Invalid week number in CSV');
		if (Number.isNaN(tCO2e)) throw new Error('Invalid tCO2e number in CSV');

		acc.push({
			week,
			tCO2e,
		});

		return acc;
	}, []);
};

const convertCumulativeToWeekly = (data: DataPoint[]): DataPoint[] => {
	return data.map((datapoint, index) => ({
		...datapoint,
		tCO2e: index ? datapoint.tCO2e - data[index - 1].tCO2e : datapoint.tCO2e,
	}));
};

const getEmissions = async (): Promise<DataPoint[]> => {
	const { data } = await axios.get<unknown>('https://raw.githubusercontent.com/EnergiseLtd/dev-technical-exercise/main/anon_carbon_data.csv');
	if (!data) {
		throw new Error('Invalid response from url');
	}

	if (typeof data !== 'string') {
		throw new Error('Invalid datatype returned from url');
	}

	return convertCumulativeToWeekly(parseEmissionsData(data));
};

export const useGetEmissions = () => {
	return useQuery({
		queryKey: ['emissions'],
		queryFn: () => getEmissions(),
	});
};
