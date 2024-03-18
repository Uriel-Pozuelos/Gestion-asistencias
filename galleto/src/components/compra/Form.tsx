import { Label } from '@/components/ui/label';
import {
	RadioGroup,
	RadioGroupItem
} from '@/components/ui/radio-group';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Drawagle from './Drawagle';
import { useVentaStore } from '@/store/ventaStore';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '../ui/select';
import { useCookieStore } from '@/store/cookieStore';
import { useFormState } from '@/store/useFormState';
import { useEffect, useRef, useState } from 'react';
import { cookieData } from '@/lib/const';
import { useToast } from '../ui/use-toast';

export function RadioGroupForm() {
	const { currentCookie } = useCookieStore();
	const {
		cantidades,
		typeVentas,
		isUpdate,
		idUpdate,
		setIsUpdate,
		setTypeVentas,
		precios,
		setPrecios
	} = useFormState();
	const { setListaGalletas, listaGalletas } = useVentaStore();
	const [kilo, setKilo] = useState('kilo');

	const formRef = useRef<HTMLFormElement>(null);
	const InputPrecio = useRef<HTMLInputElement>(null);
	const InputVallue = useRef<HTMLInputElement>(null);
	const { toast } = useToast();
	const handleSumit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = new FormData(e.currentTarget);
		const json = Object.fromEntries(data.entries());

		const precio = cookieData.get(currentCookie)?.precio;
		const precioxgramo = cookieData.get(currentCookie)?.precioxgramo;
		const preciobolsa = cookieData.get(currentCookie)?.precioBolsa;
		const precioCaja = cookieData.get(currentCookie)?.precioCaja;
		const precioCaja2 =
			Number(cookieData.get(currentCookie)?.precioCaja) * 0.5;
		const id = cookieData.get(currentCookie)?.id;
		const nomnbre = cookieData.get(currentCookie)?.nombre;
		let total;
		let cantidad;

		// Calcular el total de la venta
		switch (json.typeVenta) {
			case 'caja':
				total =
					json.caja === 'kilo'
						? Number(precioCaja) * 0.5
						: precioCaja2 * 0.5;
				// total =
				// 	json.caja === '1/2kilo'
				// 		? Number(precioCaja) * 0.5
				// 		: (Number(precioCaja) * 1);

				cantidad = json.caja === 'kilo' ? 30 : 15;
				break;
			case 'dinero':
				total = Number(precio);
				//cuando es dinero calcular la cantidad en base al precio
				json.cantidad = (Number(json.cantidad) /
					Number(precio)) as any;

				break;
			case 'pieza':
				total = Number(precio) * Number(json.cantidad);
				cantidad = String(json.cantidad);
				break;
			case 'granel':
				total = Number(precioxgramo) * Number(json.cantidad);
				//calcular la cantidad en base a los gramos
				cantidad = String(Number(json.cantidad) / 1000);
				break;
			case 'bolsa':
				total = Number(preciobolsa) * Number(json.cantidad);
				cantidad = String(Number(json.cantidad) * 12);
				break;
			default:
				total = precio! * Number(json.cantidad);

				break;
		}
		let jsonTotal;
		if (json.cantidad) {
			jsonTotal = {
				...json,
				total,
				precio,
				nombre: nomnbre,
				id
			};
		} else {
			jsonTotal = {
				...json,
				total,
				precio,
				nombre: nomnbre,
				id,
				cantidad: String(cantidad)
			};
		}

		if (!isUpdate) {
			// console.log('añadir');
			console.log(jsonTotal);
			setListaGalletas([
				...useVentaStore.getState().listaGalletas,
				jsonTotal
			]);
			toast({
				title: 'Venta añadida',
				description: 'Se ha añadido una venta a la lista'
			});

			console.log(listaGalletas);
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

		// Limpiar el formulario
		formRef.current?.reset();

		// Limpiar el store de form
		useFormState.setState({
			cantidades: null,
			typeVentas: null,
			idUpdate: -1
		});
		useCookieStore.setState({
			currentCookie: '/oreo.webp'
		});
	};

	const handlePrecio = () => {
		const value = InputPrecio.current?.value;
		const precio = cookieData.get(currentCookie)?.precio;
		const precioxgramo = cookieData.get(currentCookie)?.precioxgramo;
		const preciobolsa = cookieData.get(currentCookie)?.precioBolsa;
		const precioCaja =
			Number(cookieData.get(currentCookie)?.precioCaja) * 0.5;

		switch (typeVentas) {
			case 'caja':
				// setPrecios(
				// 	value === '1/2kilo'
				// 		? Number(precioCaja2)/2
				// 		: Number(precioCaja)
				// );
				console.log(value);
				if (kilo === 'kilo') {
					setPrecios(Number(precioCaja) * 1);
				} else {
					setPrecios(Number(precioCaja) * 0.5);
				}
				break;
			case 'dinero':
				setPrecios(Number(InputVallue.current?.value));
				break;
			case 'pieza':
				setPrecios(
					Number(InputVallue.current?.value) * Number(precio)
				);
				break;
			case 'granel':
				setPrecios(
					Number(precioxgramo) * Number(InputVallue.current?.value)
				);
				break;
			case 'bolsa':
				setPrecios(
					Number(preciobolsa) * Number(InputVallue.current?.value)
				);
				break;
			default:
				setPrecios(
					Number(InputVallue.current?.value) * Number(precio)
				);
				break;
		}
	};

	useEffect(() => {
		handlePrecio();
	}, [typeVentas, cantidades, kilo]);
	return (
		<>
			<form
				ref={formRef}
				className="w-full h-full flex flex-col space-y-4 justify-center items-center md:items-start sm:items-start"
				onSubmit={handleSumit}>
				<input name="cookie" type="hidden" value={currentCookie} />
				<RadioGroup
					className="lg:flex lg:flex-row lg:justify-start lg:items-center lg:space-x-1 lg:w-full lg:gap-1 lg:text-[1rem] sm:w-full sm:flex sm:flex-col sm:cols-2 sm:ml-1 md:grid md:grid-cols-2 md:gap-4 md:items-center md:justify-center md:space-x-0 md:space-y-0 md:text-[1.3rem] "
					defaultValue="granel"
					name="typeVenta"
					value={typeVentas ?? 'pieza'}
					onValueChange={value => {
						setTypeVentas(value as any);
					}}>
					<div className="flex items-center space-x-1 md:justify-start lg:justify-start">
						<RadioGroupItem value="bolsa" id="bolsa " />
						<Label htmlFor="bolsa">Bolsa</Label>
					</div>
					<div className="flex items-center space-x-1 ">
						<RadioGroupItem value="granel" id="granel" />
						<Label htmlFor="granel">Gramaje</Label>
					</div>
					<div className="flex items-center lg:justify-center sm:justify-start md:justify-start">
						<RadioGroupItem
							value="pieza"
							className="sm:mr-2 md:ml-0 lg:ml-0"
							id="pieza"
						/>
						<Label className="md:ml-0 lg:ml-0" htmlFor="pieza">
							Piezas
						</Label>
					</div>
					<div className="flex items-center space-x-1">
						<RadioGroupItem value="dinero" id="dinero" />
						<Label htmlFor="dinero">Dinero</Label>
					</div>
					<div className="flex items-center space-x-1 md:col-span-2 md:justify-start ">
						<RadioGroupItem value="caja" id="caja" />
						<Label htmlFor="caja">Caja</Label>
					</div>
				</RadioGroup>
				<div className="w-full sm:min-w-[120px]  sm:justify-start ">
					{typeVentas === 'caja' ? (
						<>
							<Label>
								Cantidad
								<Select
									name="caja"
									onValueChange={e => {
										console.log({
											e
										});
										setKilo(e);
									}}>
									<SelectTrigger
										value={kilo}
										className="w-full border-orange-400">
										<SelectValue placeholder="Selecciona la caja" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Selecciona la caja</SelectLabel>
											<SelectItem value="kilo">Un kilo</SelectItem>
											<SelectItem value="1/2kilo">
												Medio kilo
											</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</Label>
						</>
					) : (
						<>
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
						</>
					)}
				</div>
				<div className="lg:w-full md:w-full sm:min-w-[120px] ">
					<Label>
						Precio
						<Input
							type="number"
							placeholder="Precio"
							name="precioVenta"
							readOnly
							ref={InputPrecio}
							value={precios ?? cookieData.get(currentCookie)?.precio}
						/>
					</Label>
				</div>

				<div className="lg:grid lg:grid-rows-1 lg:grid-cols-2 lg:w-full lg:space-x-4 sm:grid sm:grid-cols-1 md:flex md:w-full sm:space-y-2 md:space-y-0">
					{isUpdate ? (
						<Button className="" type="submit">
							Actualizar{' '}
						</Button>
					) : (
						<Button type="submit">Añadir </Button>
					)}
					<Drawagle>
						<Button
							className="lg:ml-4 lg:col-start-2 md:ml-4 md:space-x-2 sm:w-full md:w-full"
							variant={'secondary'}
							type="button">
							Ver lista
						</Button>
					</Drawagle>
				</div>
			</form>
		</>
	);
}
