import Elysia, { t } from 'elysia';
import { Relleno } from '../../model/relleno';
import { rellenoDTO, rellenoPutDTO } from '../../dto/Materia';

const relleno = new Elysia({ prefix: '/relleno' });

relleno.get(':id', ({ params: { id } }) => {
	return new Relleno().getRellenoByLista(Number(id));
});

relleno.post(
	'',
	async ({ body }) => {
		try {
			const { clave_lista, asistencia } = body;
			console.log('insertar relleno', {
				clave_lista: Number(clave_lista),
				asistencia: asistencia
			});
			return await new Relleno().insertarRelleno({
				clave_lista: Number(clave_lista),
				asistencia: asistencia
			});
		} catch (error) {
			console.log(error);
			return { error: error };
		}
	},
	{
		body: rellenoDTO
	}
);

relleno.put(
	'',
	async ({ body }) => {
		const { clave_lista, asistencia, clave } = body;
		return await new Relleno().overWriteRelleno({
			clave_lista: Number(clave_lista),
			asistencia: asistencia,
			clave: Number(clave)
		});
	},
	{
		body: rellenoPutDTO
	}
);

relleno.delete('', async () => {
	return await new Relleno().deleteAllRelleno();
});

relleno.post(
	'/v2',
	async ({ body }) => {
		console.log('insertar relleno v2', body);
		return await new Relleno().insertarRellenoV2(body);
	},
	{
		body: t.Object({
			clave_lista: t.Number(),
			estado: t.String(),
			key: t.String()
		})
	}
);

relleno.get('/v2', async () => {
	//por cada resgistro hacer un hacer un objeto con {key:estado}
	const registro = await new Relleno().getRellenoV2();

	const objeto = registro.map(item => {
		//@ts-ignore
		return { [item.key]: item.estado };
	});

	//convertir objeto en un Record<string, string>

	const record = objeto.reduce((acc, item) => {
		//@ts-ignore
		return { ...acc, ...item };
	});

	return record;
});

relleno.delete('/v2', () => {
	return new Relleno().deleteV2AllRelleno();
});

export default relleno;
