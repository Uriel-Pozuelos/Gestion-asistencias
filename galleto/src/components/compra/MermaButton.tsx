import { Button } from '../ui/button';
import { useVentaStore } from '@/store/ventaStore';
import { useToast } from '../ui/use-toast';
import { useFormState } from '@/store/useFormState';
import supabase from '@/db';

function MermaButton() {
	const { listaGalletas } = useVentaStore();
	const { setCantidad } = useVentaStore();
	const { toast } = useToast();

	const handleGalletas2 = async () => {
		try {
			await Promise.all(
				listaGalletas.map(async galleta => {
					console.log(galleta);
					try {
						let { data: g, error } = await supabase
							.from('galletas')
							.select('*')
							.eq('id', galleta.id);

						if (error) {
							throw new Error(
								`Ocurrió un error al obtener la galleta ${galleta.nombre}`
							);
						}

						if (!g || g.length === 0) {
							throw new Error(
								`No se encontró ninguna galleta con el ID: ${galleta.id}`
							);
						}

						if (g[0].stock) {
							g[0].stock -= Number(galleta.cantidad);
						}

						const { data: dataResponseUpdate, error: errorUpdate } =
							await supabase
								.from('galletas')
								.update(g[0])
								.eq('id', galleta.id);

						if (errorUpdate) {
							throw new Error(
								`Ocurrió un error al actualizar la galleta ${g[0].nombre}`
							);
						}

						let perdida = {
							id: '',
							fecha: '',
							cantidad: '',
							sales: 0
						};
						//@ts-ignore
						g[0].fecha = new Date().toISOString();
						//@ts-ignore
						g[0].cantidad = String(Number(galleta.cantidad));
						//@ts-ignore
						g[0].sales = Number(galleta.cantidad);
						//@ts-ignore
						delete g[0].precio;
						//@ts-ignore
						delete g[0].stock;
						//@ts-ignore
						delete g[0].id;
						//@ts-ignore
						g[0].cookie = galleta.cookie;

						const { data: dataResponse, error: errorResponse } =
							await supabase.from('perdida').insert([g[0]]);

						if (errorResponse) {
							throw new Error(
								`Ocurrió un error al insertar la perdida de la galleta ${g[0].nombre}`
							);
						} else {
							useVentaStore.setState({ listaGalletas: [] });
							useFormState.setState({
								cantidades: null,
								typeVentas: null,
								idUpdate: -1
							});

							toast({
								title: 'Merma',
								description: 'Se ha registrado la merma',
								variant: 'default'
							});
						}
					} catch (error) {
						toast({
							title: 'Error',
							//@ts-ignore
							description: error.message,
							variant: 'destructive'
						});
					}
				})
			);
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Ocurrió un error al actualizar las galletas',
				variant: 'destructive'
			});
		}
	};

	return (
		<Button
			className="w-1/2 ml-2"
			variant={'secondary'}
			type="button"
			disabled={listaGalletas.length === 0}
			onClick={handleGalletas2}>
			Merma
		</Button>
	);
}

export default MermaButton;
