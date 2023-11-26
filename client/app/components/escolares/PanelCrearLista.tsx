import { Form, useSubmit } from '@remix-run/react';
import { Card, CardContent } from '../ui/card';
import { Label } from '../ui/label';
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
import {
	Docentes,
	Especialidad,
	Grupo,
	Materia,
	Periodo
} from '~/types';
import { FormEvent, useState } from 'react';
import { Calendar } from '../ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Button } from '../ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '../ui/popover';
import { format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';
import { MultiSelect } from '../ui/multipleSelect';
import SelectHour from './SelectHour';
import { useToast } from '../ui/use-toast';

interface PanelCrearListaProps {
	periodos: Periodo[];
	especialidades: Especialidad[];
	materias: Materia[];
	grupos: any[];
	docentes: Docentes[];
}

function PanelCrearLista({
	periodos,
	especialidades,
	materias,
	grupos,
	docentes
}: PanelCrearListaProps) {
	const submmit = useSubmit();
	const [materia, setmateria] = useState<Materia[]>();
	const [grupo, setgrupos] = useState<Grupo[]>();
	const { toast } = useToast();

	const handleChangeEspecialidad = async (clave: number) => {
		const urls = [
			`http://localhost:3000/materias/${clave}`,
			`http://localhost:3000/grupo/${clave}`
		];

		const requests = urls.map(url =>
			fetch(url, {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({
					idEspecialidad: clave
				})
			})
		);

		const responses = await Promise.all(requests);

		const jsons = await Promise.all(
			responses.map(response => response.json())
		);
		console.log(jsons);
		setmateria(jsons[0]);
		setgrupos(jsons[1]);
	};
	const diasDeDescanso: string[] = [];
	const [date, setDate] = useState<Date[] | undefined>();
	const [diasVacaciones, setVacaciones] = useState<
		DateRange | undefined
	>({
		from: new Date(2022, 0, 20),
		to: addDays(new Date(2022, 0, 20), 20)
	});

	const [selected, setSelected] = useState<string[]>([]);
	return (
		<>
			<Card className="mt-4 p-4">
				<CardContent>
					<Form
						className="grid w-full h-full  grid-cols-12  gap-4"
						onSubmit={async e => {
							e.preventDefault();
							const data = new FormData(e.currentTarget);
							data.append('diasDescanso', JSON.stringify(date));
							data.append(
								'diasVacaciones',
								JSON.stringify(diasVacaciones)
							);
							data.append('diasClase', JSON.stringify(selected));
							//sacar de data los item que sean hora-1, hora-2, hora-3, etc
							//y meterlos en un array
							const horas = [];
							for (const [key, value] of data.entries()) {
								if (key.includes('horas')) {
									horas.push(value);
								}
							}

							for (const [key, value] of data.entries()) {
								if (key.includes('horas')) {
									data.delete(key);
								}
							}

							data.append('horas', JSON.stringify(horas));
							const rawData = Object.fromEntries(data.entries());

							const cuerpo = JSON.stringify({
								Docente: rawData.Docente,
								Grupo: rawData.Grupo,
								Especialidad: rawData.Especialidad,
								Materia: rawData.Materia,
								Periodo: rawData.Periodo,
								diasClase: rawData.diasClase,
								diasDescanso: rawData.diasDescanso,
								diasVacaciones: rawData.diasVacaciones,
								horas: rawData.horas
							});

							submmit(cuerpo, {
								method: 'POST',
								action: '/escolares',
								replace: false,
								encType: 'application/json'
							});
							toast({
								title: 'Lista creada',
								description: 'La lista se ha creado correctamente',
								type: 'foreground',
								duration: 5000
							});
						}}>
						<div className="col-span-4">
							<Label>Periodo</Label>
							<Select name="Periodo">
								<SelectTrigger>
									<SelectValue placeholder="Selecciona el periodo" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Periodo</SelectLabel>
										{periodos.map((periodo: Periodo) => {
											return (
												<SelectItem
													key={periodo.clave}
													value={periodo.clave.toString()}>
													{periodo.nombre}
												</SelectItem>
											);
										})}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="col-span-4">
							<Label>Especialidad</Label>
							<Select
								name="Especialidad"
								onValueChange={e => {
									handleChangeEspecialidad(Number(e));
								}}>
								<SelectTrigger>
									<SelectValue placeholder="Selecciona la especialidad" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Especialidad</SelectLabel>
										{especialidades.map(
											(especialidad: Especialidad) => {
												return (
													<SelectItem
														key={especialidad.clave}
														value={especialidad.clave.toString()}>
														{especialidad.nombre}
													</SelectItem>
												);
											}
										)}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>

						<div className="col-span-4">
							<Label>Materia</Label>
							<Select name="Materia">
								<SelectTrigger>
									<SelectValue placeholder="Selecciona la materia" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Materia</SelectLabel>
										{!materia
											? materias.map((materia: Materia) => {
													return (
														<SelectItem
															key={materia.clave}
															value={materia.clave.toString()}>
															{materia.nombre}
														</SelectItem>
													);
											  })
											: materia.map((materia: Materia) => {
													return (
														<SelectItem
															key={materia.clave}
															value={materia.clave.toString()}>
															{materia.nombre}
														</SelectItem>
													);
											  })}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="col-span-4">
							<Label>Grupo</Label>
							<Select name="Grupo">
								<SelectTrigger>
									<SelectValue placeholder="Selecciona el grupo" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Grupo</SelectLabel>
										{!grupo
											? grupos.map((grupo: Grupo) => {
													return (
														<SelectItem
															key={grupo.grupo.clave}
															value={grupo.grupo.clave.toString()}>
															{grupo.grupo.nombre}
														</SelectItem>
													);
											  })
											: grupo.map((grupo: Grupo) => {
													return (
														<SelectItem
															key={grupo.grupo.clave}
															value={grupo.grupo.clave.toString()}>
															{grupo.grupo.nombre}
														</SelectItem>
													);
											  })}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="col-span-4">
							<Label>Docente</Label>
							<Select name="Docente">
								<SelectTrigger>
									<SelectValue placeholder="Selecciona el docente" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Docente</SelectLabel>
										{docentes.map((docente: Docentes) => {
											return (
												<SelectItem
													key={docente.docente.clave}
													value={docente.docente.clave.toString()}>
													{docente.persona.nombre +
														' ' +
														docente.persona.apellidoPaterno +
														' ' +
														docente.persona.apellidoMaterno}
												</SelectItem>
											);
										})}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="col-span-4">
							<Label>Dias de inhábiles</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={'outline'}
										className={cn(
											'w-full justify-start text-left font-normal',
											diasVacaciones && 'text-muted-foreground'
										)}>
										<CalendarIcon className="mr-2 h-4 w-4" />
										{date ? (
											format(date[0], 'PPP', {
												locale: es
											})
										) : (
											<span>Selecciona los dias de descanso</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<Calendar
										mode="multiple"
										selected={date}
										onSelect={setDate}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						</div>
						<div className="col-span-4">
							<Label>Vacaciones</Label>
							<div className={cn('grid gap-2')}>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											id="date"
											variant={'outline'}
											className={cn(
												'w-full justify-start text-left font-normal',
												!date && 'text-muted-foreground'
											)}>
											<CalendarIcon className="mr-2 h-4 w-4" />
											{diasVacaciones?.from ? (
												diasVacaciones.to ? (
													<>
														{format(
															diasVacaciones.from,
															'LLL dd, y',
															{
																locale: es
															}
														)}{' '}
														-{' '}
														{format(diasVacaciones.to, 'LLL dd, y', {
															locale: es
														})}
													</>
												) : (
													format(diasVacaciones.from, 'LLL dd, y', {
														locale: es
													})
												)
											) : (
												<span>Dias de Vacaciones</span>
											)}
										</Button>
									</PopoverTrigger>
									<PopoverContent
										className="w-auto p-0"
										align="start">
										<Calendar
											initialFocus
											mode="range"
											defaultMonth={diasVacaciones?.from}
											selected={diasVacaciones}
											onSelect={setVacaciones}
											numberOfMonths={2}
										/>
									</PopoverContent>
								</Popover>
							</div>
						</div>
						<div className="col-span-4">
							<Label>Dias de clase</Label>
							<MultiSelect
								options={[
									{
										value: 'L',
										label: 'Lunes	'
									},
									{
										value: 'Ma',
										label: 'Martes	'
									},
									{
										value: 'Mi',
										label: 'Miercoles	'
									},
									{
										value: 'J',
										label: 'Jueves	'
									},
									{
										value: 'V',
										label: 'Viernes	'
									},
									{
										value: 'S',
										label: 'Sabado	'
									}
								]}
								selected={selected}
								onChange={setSelected}
								className="w-[560px]"
							/>
						</div>
						{selected.map((item, index) => {
							return (
								<div className="col-span-4" key={index}>
									<Label>Horas de la clase {index + 1}</Label>
									<SelectHour k={index + 1} />
								</div>
							);
						})}
						<div className="col-span-12">
							<div className="flex w-full justify-end">
								<Button
									variant="default"
									type="submit"
									size={'lg'}
									className="bg-[#62B595]">
									Crear
								</Button>
							</div>
						</div>
					</Form>
				</CardContent>
			</Card>
		</>
	);
}

export default PanelCrearLista;
