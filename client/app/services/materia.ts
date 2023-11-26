import { Materia } from '~/types';

export const getMaterias = async (): Promise<Materia[]> => {
	const response = await fetch('http://localhost:3000/materias');
	const data = await response.json();
	return data as Materia[];
};
