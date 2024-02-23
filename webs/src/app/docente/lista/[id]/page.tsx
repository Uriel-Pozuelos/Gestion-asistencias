import Usuario from '@/Layout/Usuario';
import Tabla from '@/components/escolares/Tabla';
import HeaderDatos from '@/components/shared/HeaderDatos';
import { obtenerFechasHabiles } from '@/lib/dias';
import { Alumno, Listas } from '@/types/listas';
import { getJWT } from '../../page';

const getListasByID = async (id: string) => {
	const response = await fetch(`http://localhost:3001/lista/${id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ clave: String(id) })
	});
	const data = await response.json();
	return data as Promise<Listas>;
};

async function page({ params }: { params: { id: string } }) {
	const listas = await getListasByID(params.id);
	let fechas: {
		fecha: string;
		horasClase: number;
		keys: string;
		estado: string;
		alumnos: Alumno[];
	}[] = [];

	let alumnos: Alumno[] = [];
	let resp = await fetch('http://localhost:3001/relleno/v2', {
		cache: 'no-store'
	});
	const asistencia = (await resp.json()) as Record<string, string>;

	const { fecha_inicio, fecha_fin } = listas.periodo[0];
	let { dias_descanso, dias_Vacaciones } = listas.lista[0];
	dias_descanso = dias_descanso.replace(/'/g, '"');
	dias_Vacaciones = dias_Vacaciones.replace(/'/g, '"');

	// convertir el objeto de dias vacaciones a un array string
	const diasVacacionesArray = Object.keys(
		JSON.parse(dias_Vacaciones)
	).map(key => {
		return JSON.parse(dias_Vacaciones)[key];
	});

	//el array de diasClase convertir 'L' a 'Monday', 'Ma' a 'Tuesday' etc
	const diasClaseArray = JSON.parse(
		listas.lista[0].dias_clase.replace(/'/g, '"')
	).map((dia: string) => {
		switch (dia) {
			case 'L':
				return 'Monday';
			case 'Ma':
				return 'Tuesday';
			case 'Mi':
				return 'Wednesday';
			case 'J':
				return 'Thursday';
			case 'V':
				return 'Friday';
			case 'S':
				return 'Saturday';
			case 'D':
				return 'Sunday';
			default:
				return dia;
		}
	});

	const fechaHabiles = obtenerFechasHabiles({
		diasClase: diasClaseArray,
		diasDescanso: JSON.parse(dias_descanso.replace(/'/g, '"')),
		diasVacaciones: diasVacacionesArray,
		fechaInicio: fecha_inicio.toString(),
		fechaFin: fecha_fin.toString(),
		horasClase: JSON.parse(
			listas.lista[0].horas_clase.replace(/'/g, '"')
		)
	});

	fechaHabiles.id = listas.lista[0].clave;
	fechas = fechaHabiles.fechasHabiles as any;
	let route = getJWT();
	const usuario = JSON.parse(route!.user).escolares;
	const rol = JSON.parse(route!.user).persona.role;
	const nombre = JSON.parse(route!.user).persona.nombre;
	const matricula = JSON.parse(route!.user).persona.matricula;

	return (
		<>
			<Usuario role="docente">
				<HeaderDatos
					role={rol}
					nombre={nombre}
					matricula={matricula}
				/>

				<Tabla
					fechas={fechas.map(fecha => fecha.fecha)}
					alumnos={listas.alumnos}
					idLista={params.id}
					calificaciones={asistencia}
					claveMateria={listas.lista[0].clave_materia}
					role="docente"
				/>
			</Usuario>
		</>
	);
}

export default page;
