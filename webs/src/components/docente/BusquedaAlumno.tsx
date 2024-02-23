'use client';

import { InfoAlumno } from '@/types/alumno';
import { useState } from 'react';
import { Input } from '../ui/input';
import Link from 'next/link';

interface BusquedaAlumnoProps {
	info: InfoAlumno;
}

function BusquedaAlumno({ info }: BusquedaAlumnoProps) {
	const [searchTerm, setSearchTerm] = useState<string>('');

	const filteredList = info.materia.filter(materia => {
		return (
			materia.nombre
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) &&
			info.lista
				.flat()
				// @ts-ignore
				.map(item => item.clave_grupo)
				.includes(materia.clave)
		);
	});

	// console.log({ ids: props.info.lista[0][0].clave });
	// @ts-ignore
	let ids = info.lista.flat().map(item => item.clave);
	let idMateria = info.materia.map(item => item.clave);
	// console.log({ c: info.lista.flat() });
	// console.log({ ids });
	// console.log({ filteredItems: filteredList });
	// console.log({ info });

	return (
		<>
			<section className="flex flex-row justify-between w-full">
				<Input
					className="w-1/2"
					placeholder="Buscar..."
					onChange={e => setSearchTerm(e.target.value)}
				/>
			</section>
			<section>Grupo {info.grupo[0].nombre}</section>
			<div className="mt-4">
				{filteredList?.map((filteredItem, index) => (
					<div key={index} className="[text-wrap:balance]">
						<ul>
							<li>
								<Link
									// @ts-ignore
									href={`/alumno/${ids[index]}?alumno=${info.clave_persona}`}
									className="mb-2 hover:text-blue-500 transition-colors duration-200">
									{' Lista de '}
									{filteredItem.nombre}
								</Link>
							</li>
						</ul>
					</div>
				))}
			</div>
		</>
	);
}

export default BusquedaAlumno;
