import * as React from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';

const Table = React.forwardRef<
	HTMLTableElement,
	React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
	<table
		id="table_inventario_export"
		ref={ref}
		className={cn('w-full text-sm', className)}
		{...props}
	/>
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<thead
		ref={ref}
		className={cn('[&_tr]:border-b text-[1.2rem]', className)}
		{...props}
	/>
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<tbody
		ref={ref}
		className={cn('[&_tr:last-child]:border-0', className)}
		{...props}
	/>
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<tfoot
		ref={ref}
		className={cn(
			'border-t font-md [&>tr]:last:border-b-0',
			className
		)}
		{...props}
	/>
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<
	HTMLTableRowElement,
	React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
	<tr
		ref={ref}
		className={cn(
			'border-b-[2px] border-primary transition-colors hover:bg-muted/30 data-[state=selected]:bg-muted',
			className
		)}
		{...props}
	/>
));
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
	HTMLTableCellElement,
	React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
	<th
		ref={ref}
		className={cn(
			'h-12 px-4 text-left align-middle font-bold text-[#824000]  [&:has([role=checkbox])]:pr-0',
			className
		)}
		{...props}
	/>
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
	HTMLTableCellElement,
	React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
	<td
		ref={ref}
		className={cn(
			'p-4 text-[#1C2C02] font-medium align-middle  [&:has([role=checkbox])]:pr-0',
			className
		)}
		{...props}
	/>
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
	HTMLTableCaptionElement,
	React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
	<caption
		ref={ref}
		className={cn('mt-4 text-sm text-muted-foreground', className)}
		{...props}
	/>
));
TableCaption.displayName = 'TableCaption';

const handleExport = () => {
	// Fecha y formato
	const dateNow = new Date();
	const dateFormat = format(dateNow, 'yyyy-MM-dd HH:mm');

	// Crear un nuevo documento PDF
	const doc = new jsPDF();

	// Obtener la tabla por su ID o cualquier otro selector
	// const table = document.getElementById('historial_facturacion');

	// Generar el PDF a partir de la tabla y su print
	autoTable(doc, { html: '#historial_facturacion' });
	doc.autoPrint();

	// Generar PDF personalizado
	doc.save(`historial_facturacion-` + dateFormat + '.pdf');
};

export default handleExport;

const ButtonExp = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
	<button
		ref={ref}
		onClick={handleExport}
		className={cn(
			'bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded',
			className
		)}
		{...props}
	/>
));
ButtonExp.displayName = 'ButtonExp';

export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
	ButtonExp
};
