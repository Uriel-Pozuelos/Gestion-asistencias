import { CalendarDays, FileSpreadsheet, LogOut } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ExitAndRedirectToLogin } from '@/actions/login/exit';

function Nav({ role, path }: { role: string; path: string }) {
	console.log({ role, path });
	if (role === 'docente') {
		return (
			<>
				<nav className="text-white">
					<ul className="flex flex-col w-full justify-start items-start">
						<li className="flex items-center rounded-md hover:bg-blue-950  transition-colors duration-200 flex-row">
							<Link
								href="/docente"
								className="w-full flex items-center">
								<CalendarDays size={24} className="my-4" />{' '}
								<span>Revisar listas</span>
							</Link>
						</li>
						<li className="flex items-center rounded-md hover:bg-blue-950  transition-colors duration-200">
							<form action={ExitAndRedirectToLogin}>
								<Button className="flex items-center bg-transparent hover:bg-transparent m-0 p-0">
									<LogOut size={24} className="my-4" /> Cerrar sesión
								</Button>
							</form>
						</li>
					</ul>
				</nav>
			</>
		);
	}
	if (role === 'alumno') {
		return (
			<>
				<nav className="text-white">
					<ul>
						<li className="flex items-center rounded-md hover:bg-blue-950  transition-colors duration-200">
							<form action={ExitAndRedirectToLogin}>
								<Button className="flex items-center bg-transparent hover:bg-transparent">
									<LogOut size={24} className="my-4 mr-2" /> Cerrar
									sesión
								</Button>
							</form>
						</li>
						<li className="flex items-center rounded-md hover:bg-blue-950  transition-colors duration-200">
							<Link href="/alumno">
								<CalendarDays size={24} className="my-4 mr-2" />{' '}
								<span>Revisar listas</span>
							</Link>
						</li>
					</ul>
				</nav>
			</>
		);
	}

	if (role === 'escolares') {
		return (
			<>
				<nav className="text-white">
					<ul className="flex flex-col w-full justify-start items-start">
						<li className="flex items-center rounded-md hover:bg-blue-950 transition-colors duration-200 w-full">
							<Link
								href="/escolares"
								className="w-full flex items-center">
								<FileSpreadsheet size={24} className="my-4 mr-2" />
								<span>Crear lista</span>
							</Link>
						</li>
						<li className="flex items-center rounded-md hover:bg-blue-950  transition-colors duration-200 flex-row">
							<Link
								href="/escolares/lista"
								className="w-full flex items-center">
								<CalendarDays size={24} className="my-4" />{' '}
								<span>Revisar listas</span>
							</Link>
						</li>
						<li className="flex items-center rounded-md hover:bg-blue-950  transition-colors duration-200">
							<form action={ExitAndRedirectToLogin}>
								<Button className="flex items-center bg-transparent hover:bg-transparent m-0 p-0">
									<LogOut size={24} className="my-4" /> Cerrar sesión
								</Button>
							</form>
						</li>
					</ul>
				</nav>
			</>
		);
	}

	return (
		<>
			<nav></nav>
		</>
	);
}

export default Nav;
