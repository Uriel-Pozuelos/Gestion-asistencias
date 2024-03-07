import { useDayStore } from '@/store/dayStore';
import { Card, DonutChart, Title } from '@tremor/react';
import { useEffect, useState } from 'react';
import { filterDataByDate } from '../dashBoard/dashFunctions';

export default function DonutChartUsageExample2() {
	const [valuesChart, setValuesChart] = useState([]);
	const { SelectedDate } = useDayStore(store => ({
		SelectedDate: store.SelectedDate
	}));
	const today = new Date();
	const filtro = SelectedDate();

	useEffect(() => {
		fetch(
			'https://zxlmmgzvgshlknapirjc.supabase.co/rest/v1/perdida?select=*',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4bG1tZ3p2Z3NobGtuYXBpcmpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgyMDU0MDIsImV4cCI6MjAyMzc4MTQwMn0.0ikVxvE22CpkqYN6qMmTdj_mi3Qb6o6EqL3hvaeVvGo`,
					apikey:
						'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4bG1tZ3p2Z3NobGtuYXBpcmpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgyMDU0MDIsImV4cCI6MjAyMzc4MTQwMn0.0ikVxvE22CpkqYN6qMmTdj_mi3Qb6o6EqL3hvaeVvGo'
				}
			}
		)
			.then(res => res.json())
			.then(data => {
				console.log({ data });
				const dataFiltered = filterDataByDate(data, filtro, today);

				// unir los datos en base al nombre de la galleta
				const realData: {
					name: string;
					sales: number;
					date: string;
				}[] = [];

				console.log({ dataFiltered });

				dataFiltered.forEach(item => {
					const name = item.nombre;
					//@ts-ignore
					const sales = item.sales;

					const indexName = realData.findIndex(
						item => item.name === name
					);

					if (indexName === -1) {
						realData.push({
							date: item.fecha,
							name,
							sales
						});
					} else {
						realData[indexName].sales += sales;
					}
				});

				//@ts-ignore
				setValuesChart(dataFiltered);
			});
	}, [filtro]);

	return (
		<>
			<Card className="mx-auto h-full flex flex-col items-center justify-center">
				<Title>Perdida de galletas</Title>
				<DonutChart
					className="mt-6 mx-auto w-64 h-64"
					data={valuesChart}
					category="sales"
					index="nombre"
					colors={[
						'rose',
						'yellow',
						'orange',
						'indigo',
						'blue',
						'emerald',
						'green',
						'pink',
						'purple',
						'violet',
						'cyan',
						'amber',
						'rose',
						'yellow',
						'orange',
						'indigo',
						'blue',
						'emerald',
						'green',
						'pink',
						'purple',
						'violet',
						'cyan',
						'amber',
						'rose',
						'yellow',
						'orange',
						'indigo',
						'blue',
						'emerald',
						'green',
						'pink',
						'purple',
						'violet',
						'cyan',
						'amber',
						'rose',
						'yellow',
						'orange',
						'indigo',
						'blue',
						'emerald',
						'green',
						'pink',
						'purple',
						'violet',
						'cyan',
						'amber',
						'rose',
						'yellow',
						'orange',
						'indigo',
						'blue',
						'emerald',
						'green',
						'pink',
						'purple',
						'violet',
						'cyan',
						'amber',
						'rose',
						'yellow',
						'orange',
						'indigo',
						'blue',
						'emerald',
						'green',
						'pink',
						'purple',
						'violet',
						'cyan',
						'amber',
						'rose',
						'yellow',
						'orange',
						'indigo',
						'blue',
						'emerald',
						'green',
						'pink',
						'purple',
						'violet',
						'cyan',
						'amber',
						'rose',
						'yellow',
						'orange',
						'indigo',
						'blue',
						'emerald',
						'green',
						'pink',
						'purple',
						'violet',
						'cyan',
						'amber'
					]}
				/>
			</Card>
		</>
	);
}
