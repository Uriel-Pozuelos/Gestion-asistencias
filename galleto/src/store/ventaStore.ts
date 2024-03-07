import { create } from 'zustand';

interface VentaStore {
	typeVenta: 'bolsa' | 'granel' | 'pieza' | 'dinero' | 'caja';
	setTypeVenta: (
		typeVenta: 'bolsa' | 'granel' | 'pieza' | 'dinero' | 'caja'
	) => void;
	cantidad: number;
	setCantidad: (cantidad: number) => void;
	precio: number;
	setPrecio: (precio: number) => void;
	total: number;
	setTotal: (total: number) => void;
	listaGalletas: any[];
	setListaGalletas: (listaGalletas: any[]) => void;
	id?: number;
	setId?: (id: number) => void;
	lastListaGalletas: any[];
	setLastListaGalletas: (lastListaGalletas: any[]) => void;
}

export const useVentaStore = create<VentaStore>(set => ({
	typeVenta: 'bolsa',
	setTypeVenta: (
		typeVenta: 'bolsa' | 'granel' | 'pieza' | 'dinero' | 'caja'
	) => set({ typeVenta }),
	cantidad: 0,
	setCantidad: (cantidad: number) => set({ cantidad }),
	precio: 0,
	setPrecio: (precio: number) => set({ precio }),
	total: 0,
	setTotal: (total: number) => set({ total }),
	listaGalletas: [],
	id: 0,
	setId: (id: number) => set({ id }),
	setListaGalletas: (listaGalletas: string[]) =>
		set({ listaGalletas }),
	lastListaGalletas: [],
	setLastListaGalletas: (lastListaGalletas: string[]) =>
		set({ lastListaGalletas })
}));
