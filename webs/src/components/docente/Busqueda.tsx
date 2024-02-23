'use client';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Alumno, ListaAsistencia } from '@/app/docente/page';
import Link from 'next/link';

// Define the search options
export type busqueda = 'periodo' | 'alumno' | 'grupo' | 'lista';

interface Props {
	listaAsistencia: ListaAsistencia;
}

// Define and export the Busqueda component
function Busqueda({ listaAsistencia }: Props) {
	console.log({ listaAsistencia });
	const [busquedaBy, setBusquedaBy] = useState<busqueda>('periodo');
	const [searchTerm, setSearchTerm] = useState<string>('');
	let matchingAlumnos: Alumno[] = [];

	// Filter the list based on the selected search criteria and search term
	const filteredList = listaAsistencia.lista?.filter(lista => {
		switch (busquedaBy) {
			case 'periodo':
				return (
					listaAsistencia.periodo
						.find(periodo => periodo.clave === lista.clave_periodo)
						?.nombre.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					listaAsistencia.materia
						.find(materia => materia.clave === lista.clave_materia)
						?.nombre.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					listaAsistencia.grupo
						.find(grupo => grupo.clave === lista.clave_grupo)
						?.nombre.toLowerCase()
						.includes(searchTerm.toLowerCase())
				);
			case 'alumno':
				matchingAlumnos = listaAsistencia.alumnos.filter(
					alumno =>
						alumno.persona[0].nombre
							.toLowerCase()
							.includes(searchTerm.toLowerCase()) ||
						alumno.persona[0].apellidoPaterno
							.toLowerCase()
							.includes(searchTerm.toLowerCase()) ||
						alumno.persona[0].apellidoMaterno
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
				);

				// If there are matching alumnos, display their names
				if (matchingAlumnos.length > 0) {
					return matchingAlumnos
						.map(alumno => alumno.persona[0].nombre)
						.join(', ');
				}

				// If no matching alumnos, return false to filter out this item
				return false;

			case 'grupo':
				return listaAsistencia.grupo
					.find(grupo => grupo.clave === lista.clave_grupo)
					?.nombre.toLowerCase()
					.includes(searchTerm.toLowerCase());

			case 'lista':
				// Return the original list as is
				return true;

			default:
				return true;
		}
	});

	// Log the selected search criteria whenever it changes
	useEffect(() => {
		console.log({ busquedaBy });
	}, [busquedaBy]);

	return (
		<>
			<section className="flex flex-row justify-between w-full">
				<Input
					className="w-1/2"
					placeholder="Buscar..."
					onChange={e => setSearchTerm(e.target.value)}
				/>
				<Select
					onValueChange={value => setBusquedaBy(value as busqueda)}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Buscar por..." />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Busqueda</SelectLabel>
							<SelectItem value="periodo">Periodo</SelectItem>
							<SelectItem value="alumno">Alumno</SelectItem>
							<SelectItem value="grupo">Grupo</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</section>
			{/* Display the filtered list */}
			<div className="mt-4">
				{filteredList?.map((filteredItem, index) => (
					<div key={index} className="[text-wrap:balance]">
						<ul>
							{busquedaBy === 'periodo' && (
								<li>
									<Link
										href={`/docente/lista/${filteredItem.clave}?materia=${filteredItem.clave_materia}`}
										className="mb-2 hover:text-blue-500 transition-colors duration-200">
										{' Lista de '}
										{
											listaAsistencia.materia.find(
												materia =>
													materia.clave === filteredItem.clave_materia
											)?.nombre
										}{' '}
										{
											listaAsistencia.grupo.find(
												grupo =>
													grupo.clave === filteredItem.clave_grupo
											)?.nombre
										}{' '}
										{' periodo '}
										{
											listaAsistencia.periodo.find(
												periodo =>
													periodo.clave === filteredItem.clave_periodo
											)?.nombre
										}
									</Link>
								</li>
							)}
							{busquedaBy === 'alumno' && (
								<>
									{matchingAlumnos.map((alumno, alumnoIndex) => (
										<li key={alumnoIndex}>
											<Link
												href={`/docente/lista/${filteredItem.clave}?alumno=${alumno.persona[0].clave}`}
												className="mb-2 hover:text-blue-500 transition-colors duration-200">
												Alumno:{' '}
												<span className="font-bold">
													{alumno.persona[0].nombre}{' '}
													{alumno.persona[0].apellidoPaterno}{' '}
													{alumno.persona[0].apellidoMaterno}{' '}
													{
														listaAsistencia.grupo.find(
															grupo =>
																grupo.clave ===
																filteredItem.clave_grupo
														)?.nombre
													}{' '}
													{' periodo '}
													{
														listaAsistencia.periodo.find(
															periodo =>
																periodo.clave ===
																filteredItem.clave_periodo
														)?.nombre
													}
												</span>
											</Link>
										</li>
									))}
								</>
							)}
							{busquedaBy === 'grupo' && (
								<>
									<Link
										href={`/docente/lista/${filteredItem.clave}`}
										className="mb-2 hover:text-blue-500 transition-colors duration-200">
										{' Lista del grupo '}
										{
											listaAsistencia.materia.find(
												materia =>
													materia.clave === filteredItem.clave_materia
											)?.nombre
										}{' '}
									</Link>
								</>
							)}
						</ul>
					</div>
				))}
			</div>
		</>
	);
}

export default Busqueda;
