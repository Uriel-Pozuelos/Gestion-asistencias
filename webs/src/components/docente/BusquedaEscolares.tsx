'use client';
import { ListaAsistencia } from '@/app/docente/lista/page';
import { Suspense, useEffect, useState } from 'react';
import { busqueda } from './Busqueda';
import Link from 'next/link';
import { Input } from '../ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '../ui/select';

export interface ListoAsistencia {
	lista: Lista[];
	docentePersona: Array<DocentePersona[]>;
	materia: Array<Especialidad[]>;
	periodo: Array<Periodo[]>;
	grupo: Array<Grupo[]>;
	alumnos: Array<Alumno[]>;
	especialidad: Array<Especialidad[]>;
}

export interface Alumno {
	alumno: Docente[];
	persona: Persona[];
}

export interface Docente {
	clave: number;
	clave_persona: number;
}

export interface Persona {
	clave: number;
	nombre: string;
	apellidoMaterno: string;
	apellidoPaterno: ApellidoPaterno;
	estatus: Estatus;
	role: Role;
	public_id: string;
	password: string;
	matricula?: string;
}

export enum ApellidoPaterno {
	Diaz = 'Diaz',
	Gutierrez = 'Gutierrez',
	Lopez = 'Lopez',
	Perez = 'Perez'
}

export enum Estatus {
	Activo = 'activo'
}

export enum Role {
	Alumno = 'alumno',
	Docente = 'docente'
}

export interface DocentePersona {
	docente: Docente;
	persona: Persona;
}

export interface Especialidad {
	clave: number;
	nombre: string;
	clave_periodo: number | null;
	clave_especialidad?: number;
}

export interface Grupo {
	clave: number;
	nombre: string;
	clave_especialidad: number;
	id_alumno: null;
	id_maestro: null;
	clave_periodo: null;
}

export interface Lista {
	clave: number;
	clave_docente: number;
	clave_especialidad: number;
	clave_materia: number;
	dias_descanso: string;
	dias_Vacaciones: string;
	horas_clase: string;
	dias_clase: string;
	horario_clase: string;
	clave_periodo: number;
	clave_grupo: number;
}

export interface Periodo {
	clave: number;
	nombre: string;
	fecha_inicio: Date;
	fecha_fin: Date;
	infoPeriodo: null;
}

interface BusquedaEscolaresProps {
	listas: ListoAsistencia;
}

async function getListaById(id: string) {
	const response = (await fetch(`http://localhost:3001/lista/3`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ clave: String(id) })
	}).then(res => res.json())) as Promise<ListaAsistencia>;

	return response;
}

function BusquedaEscolares({ listas }: BusquedaEscolaresProps) {
	const [listasA, setListasA] = useState<ListaAsistencia[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const promesas = listas.lista.map(async lista => {
					const listaAsistencia = await getListaById(
						String(lista.clave)
					);
					return listaAsistencia;
				});

				const result = await Promise.all(promesas);
				setListasA(result);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, [listas.lista]);
	useEffect(() => {
		console.log({ listasA });
	}, [listasA]);

	const [busquedaBy, setBusquedaBy] = useState('periodo');

	return (
		<div>
			<h1>Busqueda Escolares</h1>
			<section className="flex flex-row justify-between w-full">
				<Select
					onValueChange={value => setBusquedaBy(value as busqueda)}>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Buscar por..." />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Busqueda</SelectLabel>
							<SelectItem value="alumno">Alumno</SelectItem>
							<SelectItem value="grupo">Grupo</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</section>
			<section>
				<Suspense fallback={<p>Loading feed...</p>}>
					{busquedaBy === 'periodo'
						? listasA.map(lista => (
								<div key={lista.lista[0].clave}>
									<h2>Lista {lista.lista[0].clave}</h2>
									<Link
										href={`/escolares/lista/${lista.lista[0].clave}`}>
										{' '}
										Grupo
										{
											lista.grupo.find(
												grupo =>
													grupo.clave === lista.lista[0].clave_grupo
											)?.nombre
										}
									</Link>
								</div>
						  ))
						: listasA.map(lista => (
								<ul key={lista.lista[0].clave}>
									{lista.alumnos.map(alumno => (
										<li key={alumno.persona[0].clave}>
											<Link
												href={`/escolares/lista/${lista.lista[0].clave}?alumno=${alumno.persona[0].clave}`}>
												{alumno.persona[0].nombre}{' '}
												{alumno.persona[0].apellidoPaterno}{' '}
												{alumno.persona[0].apellidoMaterno}
												{'Materia: '}
												{
													lista.materia.find(
														materia =>
															materia.clave ===
															lista.lista[0].clave_materia
													)?.nombre
												}
											</Link>
										</li>
									))}
								</ul>
						  ))}
				</Suspense>
			</section>
		</div>
	);
}

export default BusquedaEscolares;
