import { db } from './db';
import * as schema from './schema';
import { randomUUID } from 'node:crypto';

// Insertar personas en la tabla 'persona'
await db.insert(schema.persona).values([
	{
		nombre: 'Jorge',
		apellidoMaterno: 'Gonzalez',
		apellidoPaterno: 'Perez',
		estatus: 'activo',
		role: 'alumno',
		public_id: randomUUID(),
		matricula: '12345',
		password: await Bun.password.hash('12345')
	},
	{
		nombre: 'Maria',
		apellidoMaterno: 'Rodriguez',
		apellidoPaterno: 'Lopez',
		estatus: 'activo',
		role: 'docente',
		public_id: randomUUID(),
		matricula: '12346',
		password: await Bun.password.hash('12346')
	},
	{
		nombre: 'Pedro',
		apellidoMaterno: 'Martinez',
		apellidoPaterno: 'Gomez',
		estatus: 'activo',
		role: 'directivo',
		public_id: randomUUID(),
		matricula: '12347',
		password: await Bun.password.hash('12347')
	},
	{
		nombre: 'Ana',
		apellidoMaterno: 'Hernandez',
		apellidoPaterno: 'Diaz',
		estatus: 'activo',
		role: 'padre',
		public_id: randomUUID(),
		matricula: '12348',
		password: await Bun.password.hash('12348')
	},
	{
		nombre: 'Carlos',
		apellidoMaterno: 'Fernandez',
		apellidoPaterno: 'Gutierrez',
		estatus: 'activo',
		role: 'escolares',
		public_id: randomUUID(),
		matricula: '12349',
		password: await Bun.password.hash('12349')
	}
]);

//agregar 3 roles de persona y unirlo a 3 docentes
await db.insert(schema.persona).values([
	{
		nombre: 'Jorge',
		apellidoMaterno: 'Gonzalez',
		apellidoPaterno: 'Perez',
		estatus: 'activo',
		role: 'docente',
		matricula: '21345',
		password: await Bun.password.hash('21345'),
		public_id: randomUUID()
	},
	{
		nombre: 'Maria',
		apellidoMaterno: 'Rodriguez',
		apellidoPaterno: 'Lopez',
		estatus: 'activo',
		role: 'docente',
		matricula: '21346',
		password: await Bun.password.hash('21346'),
		public_id: randomUUID()
	},
	{
		nombre: 'Pedro',
		apellidoMaterno: 'Martinez',
		apellidoPaterno: 'Gomez',
		estatus: 'activo',
		role: 'docente',
		matricula: '21347',
		password: await Bun.password.hash('21347'),
		public_id: randomUUID()
	}
]);

await db.insert(schema.docente).values([
	{
		clave_persona: 2
	},
	{
		clave_persona: 6
	},
	{
		clave_persona: 8
	}
]);

await db.insert(schema.alumno).values([
	{
		clave_persona: 1
	}
]);

await db.insert(schema.escolares).values([
	{
		clave_persona: 5
	}
]);

await db.insert(schema.especialidad).values([
	{
		nombre: 'Ingeniería en Sistemas Computacionales'
	},
	{
		nombre: 'Enfermería'
	},
	{
		nombre: 'Ingeniería en Gestión Empresarial'
	}
]);

await db.insert(schema.periodo).values([
	{
		nombre: 'Semestre 1',
		fecha_inicio: '2023-01-01',
		fecha_fin: '2023-06-30'
	},
	{
		nombre: 'Semestre 2',
		fecha_inicio: '2023-07-01',
		fecha_fin: '2023-12-31'
	}
]);

await db.insert(schema.grupo).values([
	{
		clave_especialidad: 1,
		nombre: 'Grupo 1'
	},
	{
		clave_especialidad: 1,
		nombre: 'Grupo 2'
	},
	{
		clave_especialidad: 1,
		nombre: 'Grupo 3'
	},
	{
		clave_especialidad: 2,
		nombre: 'Grupo 1'
	},
	{
		clave_especialidad: 2,
		nombre: 'Grupo 2'
	},
	{
		clave_especialidad: 2,
		nombre: 'Grupo 3'
	},
	{
		clave_especialidad: 3,
		nombre: 'Grupo 1'
	},
	{
		clave_especialidad: 3,
		nombre: 'Grupo 2'
	},
	{
		clave_especialidad: 3,
		nombre: 'Grupo 3'
	}
]);

await db.insert(schema.materia).values([
	{
		clave_especialidad: 1,
		clave_periodo: 1,
		nombre: 'Matemáticas'
	},
	{
		clave_especialidad: 1,
		clave_periodo: 1,
		nombre: 'Programación'
	},
	{
		clave_especialidad: 1,
		clave_periodo: 1,
		nombre: 'Física'
	},
	{
		clave_especialidad: 2,
		clave_periodo: 1,
		nombre: 'Anatomía'
	},
	{
		clave_especialidad: 2,
		clave_periodo: 1,
		nombre: 'Química'
	},
	{
		clave_especialidad: 2,
		clave_periodo: 1,
		nombre: 'Biología'
	},
	{
		clave_especialidad: 3,
		clave_periodo: 1,
		nombre: 'Administración'
	},
	{
		clave_especialidad: 3,
		clave_periodo: 1,
		nombre: 'Contabilidad'
	},
	{
		clave_especialidad: 3,
		clave_periodo: 1,
		nombre: 'Economía'
	}
]);

//insetar varios personas y unirlos a varios alumnos
await db.insert(schema.persona).values([
	{
		nombre: 'Carlos',
		apellidoMaterno: 'Fernandez',
		apellidoPaterno: 'Gutierrez',
		estatus: 'activo',
		role: 'alumno',
		matricula: '12349',
		password: await Bun.password.hash('12349'),
		public_id: randomUUID()
	},
	{
		nombre: 'angel',
		apellidoMaterno: 'Fernandez',
		apellidoPaterno: 'Gutierrez',
		estatus: 'activo',
		role: 'alumno',
		matricula: '12350',
		password: await Bun.password.hash('12350'),
		public_id: randomUUID()
	},
	{
		nombre: 'uriel',
		apellidoMaterno: 'Fernandez',
		apellidoPaterno: 'Gutierrez',
		estatus: 'activo',
		role: 'alumno',
		matricula: '12351',
		password: await Bun.password.hash('12351'),
		public_id: randomUUID()
	},
	{
		nombre: 'diana',
		apellidoMaterno: 'Fernandez',
		apellidoPaterno: 'Gutierrez',
		estatus: 'activo',
		role: 'alumno',
		matricula: '12352',
		password: await Bun.password.hash('12352'),
		public_id: randomUUID()
	},
	{
		nombre: 'Liz',
		apellidoMaterno: 'Fernandez',
		apellidoPaterno: 'Gutierrez',
		estatus: 'activo',
		role: 'alumno',
		matricula: '12353',
		password: await Bun.password.hash('12353'),
		public_id: randomUUID()
	}
]);

await db.insert(schema.alumno).values([
	{
		clave_persona: 9
	},
	{
		clave_persona: 10
	},
	{
		clave_persona: 11
	},
	{
		clave_persona: 12
	},
	{
		clave_persona: 13
	}
]);

await db.insert(schema.grupo_alumno).values([
	{
		clave_grupo: 1,
		clave_alumno: 1
	},
	{
		clave_grupo: 1,
		clave_alumno: 2
	},
	{
		clave_grupo: 1,
		clave_alumno: 3
	},
	{
		clave_grupo: 4,
		clave_alumno: 4
	},
	{
		clave_grupo: 4,
		clave_alumno: 5
	},
	{
		clave_grupo: 4,
		clave_alumno: 1
	}
]);

// // Insertar en la tabla 'asistencia'
// await db.insert(schema.asistencia).values({
// 	fecha: '2023-11-16',
// 	asistencia: '{"asistencia": "presente"}',
// 	clave_persona: 1
// });

// // Insertar en la tabla 'alumno'
// await db.insert(schema.alumno).values({
// 	matricula: '12345',
// 	materia: 'Matemáticas',
// 	clave_materia: 'Materia1',
// 	periodo: 'Periodo1',
// 	grupo: 'Grupo1',
// 	clave_persona: 1
// });

// // Insertar en la tabla 'padre'
// await db.insert(schema.padre).values({
// 	clave_persona: 4,
// 	clave_alumno: 1
// });

// // Insertar en la tabla 'directivo'
// await db.insert(schema.directivo).values({
// 	clave_persona: 3
// });

// // Insertar en la tabla 'docente'
// await db.insert(schema.docente).values({
// 	clave_persona: 2
// });

// // Insertar en la tabla 'materias'
// await db.insert(schema.materia).values({
// 	clave_especialidad: 1,
// 	clave_periodo: 1,
// 	nombre: 'Matemáticas'
// });

// // Insertar en la tabla 'especialidad'
// await db.insert(schema.especialidad).values({
// 	nombre: 'Ingeniería'
// });

// // Insertar en la tabla 'periodo'
// await db.insert(schema.periodo).values({
// 	nombre: 'Semestre 1',
// 	fecha_inicio: '2023-01-01',
// 	fecha_fin: '2023-06-30'
// });

// // Insertar en la tabla 'grupo'
// await db.insert(schema.grupo).values({
// 	nombre: 'Grupo 1',
// 	clave_periodo: 1
// });

// // Insertar en la tabla 'materias_grupo'
// await db.insert(schema.materias_grupo).values({
// 	clave_grupo: 1,
// 	horas: 3.5
// });
