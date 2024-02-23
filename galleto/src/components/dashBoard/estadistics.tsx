import { Card, Grid, Metric, Text, Col } from '@tremor/react';
import { CardTremor } from '../ui/card-tremor';
import { useEffect, useState } from 'react';
import { useDayStore } from '@/store/dayStore';
import { filterDataByDate, type VentaData } from './dashFunctions';
import { CircleDollarSign } from 'lucide-react';

import supabase from '@/db';
const stadistic = [
	{
		title: 'Perdida',
		metric: '0.5'
	},
	{
		title: 'Galleta mas vendida',
		metric: '0.5'
	},
	{
		title: 'Ganancia',
		metric: '0.5'
	}
];
const getVentas = async () => {
	const { data, error } = await supabase.from('venta').select('*');
	if (error) {
		throw new Error('Error al obtener las ventas');
	}
	return data;
};
async function getInventario() {
	const { data, error } = await supabase.from('galletas').select('*');
	if (error) {
		return error;
	}
	return data;
}

function Estadistics() {
	const { SelectedDate } = useDayStore(store => ({
		SelectedDate: store.SelectedDate
	}));
	const today = new Date();
	const filtro = SelectedDate();
	const [Stadistics, setStadistics] = useState(stadistic);

	const infoVentas: {
		nombre: string;
		ganancias: number;
		cantidad: number;
	}[] = [];

	useEffect(() => {
		const fetchData = async () => {
			try {
				let maxName = {
					title: '',
					sales: 0
				};

				// Consulta a la tabla 'perdida' en Supabase
				const { data: perdidas, error: perdidasError } =
					await supabase
						.from('perdida')
						.select('*')
						.order('sales', { ascending: false })
						.limit(1)
						.single();

				if (perdidasError) {
					console.error(
						'Error al obtener las pérdidas:',
						perdidasError.message
					);
					return;
				}

				const { data: inventario, error: inventarioError } =
					await supabase.from('galletas').select('*');

				if (inventarioError) {
					console.error(
						'Error al obtener el inventario:',
						inventarioError.message
					);
					return;
				}

				const dataFiltered = filterDataByDate(
					perdidas,
					filtro,
					today
				);

				// Tomar el valor con mayor pérdida y el nombre de la galleta
				//@ts-ignore
				const max = dataFiltered[0]?.sales || 0;
				const maxNames = dataFiltered[0]?.nombre || 'Ninguna';

				if (dataFiltered.length > 0) {
					maxName = {
						title: `Pérdida de ${maxNames}`,
						sales: max
					};
				} else {
					maxName = { title: 'No hay pérdidas', sales: 0 };
				}

				const galletaAgotada = inventario.find(
					item => item.stock != null && item.stock <= 10
				) || { nombre: 'Ninguna' };

				let ganancias = 0;
				const ventas = await getVentas();

				const dataFiltered2 = filterDataByDate(ventas, filtro, today);
				ganancias = dataFiltered2.reduce(
					(acc, venta) => acc + venta.total,
					0
				);

				const infoVentas = inventario.map(item => ({
					nombre: item.nombre,
					ganancias: ganancias,
					cantidad: item.stock
				}));

				setStadistics([
					{
						title: 'Ganancias',
						metric: `$ ${ganancias} MXN`
					},
					{
						title: `${maxName.title}`,
						metric: `${maxName.sales}`
					},
					{
						title: 'Galleta por agotarse o agotada',
						metric: `${galletaAgotada.nombre}`
					}
				]);
			} catch (error) {
				console.error('Error:', error);
			}
		};

		fetchData();
	}, [SelectedDate]);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-1 ">
			<div className="col-start-1 col-span-12 md:col-start-1 md:col-span-12 ">
				<div className="flex flex-row md:flex-row md:flex">
					<Grid
						numItemsSm={3}
						numItemsLg={3}
						numItemsMd={3}
						className="w-full gap-4">
						{Stadistics.map(item => (
							<Card key={item.title}>
								<Text>{item.title}</Text>
								<Metric>{item.metric}</Metric>
							</Card>
						))}
					</Grid>
				</div>
			</div>
		</div>
	);
}

export default Estadistics;
