import supabase from '@/db';
import {
	isAfter,
	isBefore,
	isSameDay,
	subMonths,
	subWeeks
} from 'date-fns';

export interface VentaData {
	cookie: string;
	typeVenta: string;
	cantidad: string;
	precio: number;
	total: number;
	nombre: string;
	fecha: string;
	id: number;
}
export interface VentaData2 {
	cookie: string;
	typeVenta: string;
	cantidad: string;
	precio: number;
	sales: number;
	nombre: string;
	fecha: string;
	id: number;
}

export const fetchData = async () => {
	const { data, error } = await supabase.from('venta').select('*');
	if (error) {
		throw new Error('Error al obtener las ventas');
	}
	return data;
};

export const filterDataByDate = (
	data: any,
	date: string,
	today: Date
): VentaData[] => {
	switch (date) {
		case 'hoy':
			return data.filter((element: any) =>
				isSameDay(new Date(element.fecha), today)
			);

		case 'semana':
			const oneWeekAgo = subWeeks(today, 1);
			return data.filter((element: any) => {
				const fecha = new Date(element.fecha);
				return isAfter(fecha, oneWeekAgo) && isBefore(fecha, today);
			});

		case 'mes':
			const oneMonthAgo = subMonths(today, 1);
			return data.filter((element: any) => {
				const fecha = new Date(element.fecha);
				return isAfter(fecha, oneMonthAgo) && isBefore(fecha, today);
			});

		case 'day':
			return data;
	}

	return data;
};

export const sumTotals = (salesData: VentaData[]): any[] => {
	const totales: Record<string, number> = {};
	const dataReal: any[] = [];

	salesData.forEach(element => {
		const { nombre, total, cookie, fecha } = element;

		const ganancias = salesData.reduce((acc, venta) => {
			if (venta.nombre === nombre) {
				acc += venta.total;
			}
			return acc;
		}, 0);

		if (totales[nombre]) {
			totales[nombre] += total;
		} else {
			totales[nombre] = total;
			dataReal.push({
				name: nombre,
				value: ganancias,
				href: '#',
				fecha,
				nombreIcono: cookie,
				icon: () => (
					<img src={cookie} alt={nombre} className="w-5 mr-2" />
				)
			});
		}
	});
	return dataReal;
};
