import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useVentaStore } from '@/store/ventaStore';
import { useRef } from 'react';
import { useToast } from './use-toast';
import { useFormState } from '@/store/useFormState';
import Drawagle from '../compra/Drawagle';
import { useCookieStore } from '@/store/cookieStore';
import { cookieData } from '@/lib/const';

interface FormAlmacenProps {
	pathname: string;
}

function FormAlmacen({ pathname }: FormAlmacenProps) {
	const { setListaGalletas } = useVentaStore();
	const InputVallue = useRef<HTMLInputElement>(null);
	const { toast } = useToast();
	const formRef = useRef<HTMLFormElement>(null);
	const { cantidades, isUpdate, idUpdate, setIsUpdate } =
		useFormState();
	const { currentCookie } = useCookieStore();

	const handleSumit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const json = Object.fromEntries(data.entries());

		const nomnbre = cookieData.get(currentCookie)?.nombre;
		const id = cookieData.get(currentCookie)?.id;
		const url = cookieData.get(currentCookie)?.url;
		const jsonTotal = {
			...json,
			nombre: nomnbre,
			cookie: url,
			id: id
		};

		if (!isUpdate) {
			setListaGalletas([
				...useVentaStore.getState().listaGalletas,
				jsonTotal
			]);
			toast({
				title: 'Venta añadida',
				description: 'Se ha añadido una venta a la lista'
			});

			formRef.current?.reset();

			useFormState.setState({
				cantidades: 1
			});
		} else {
			const lista = useVentaStore.getState().listaGalletas;
			lista[idUpdate!] = jsonTotal;
			setListaGalletas(lista);
			setIsUpdate(false);
			toast({
				title: 'Venta actualizada',
				description: 'Se ha actualizado una venta de la lista'
			});
		}
	};

	return (
		<>
			<form
				className="w-full h-full flex flex-col space-y-4 justify-center items-center"
				ref={formRef}
				onSubmit={e => {
					handleSumit(e);
				}}>
				<div className="w-full">
					<Label>
						Cantidad
						<Input
							type="number"
							placeholder="Cantidad"
							name="cantidad"
							min={1}
							ref={InputVallue}
							onChange={e => {
								const value = e.currentTarget.value;
								useFormState.setState({
									cantidades: Number(value)
								});
							}}
							value={cantidades ?? 1}
						/>
					</Label>
				</div>
				<div className="space-x-3 grid grid-columns-2 w-full">
					<div className="col-start-1 w-full">
						{isUpdate ? (
							<Button type="submit">Actualizar </Button>
						) : (
							<Button type="submit">Guardar </Button>
						)}
					</div>
					<div className="col-start-2">
						<Drawagle pathname={pathname}>
							<Button variant={'secondary'} type="button">
								Ver lista
							</Button>
						</Drawagle>
					</div>
				</div>
			</form>
		</>
	);
}

export default FormAlmacen;
