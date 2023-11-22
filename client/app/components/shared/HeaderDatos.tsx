import { Card, CardContent, CardHeader } from '../ui/card';

interface HeaderDatosProps {
	role: string;
	nombre: string;
	matricula: string;
}

function HeaderDatos({ role, nombre, matricula }: HeaderDatosProps) {
	return (
		<Card className="mt-2">
			<CardHeader>
				<h1 className="text-2xl font-bold text-center text-gray-500">
					Datos de {role}
				</h1>
			</CardHeader>
			<CardContent className="grid w-full h-full  grid-cols-12 ">
				<div className="col-span-6">
					<span>Matricula:</span>
				</div>
				<div className="col-span-6">
					<span>{matricula}</span>
				</div>

				<div className="col-span-6">
					<span>Nombre:</span>
				</div>
				<div className="col-span-6">
					<span>{nombre}</span>
				</div>
			</CardContent>
		</Card>
	);
}

export default HeaderDatos;
