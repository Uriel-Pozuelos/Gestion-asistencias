import { create } from 'zustand';

type TypeVenta = 'bolsa' | 'granel' | 'pieza' | 'dinero' | 'caja';

interface VentaStore {
	typeVenta: TypeVenta;
	setTypeVenta: (typeVenta: TypeVenta) => void;
}

export const useTypeVenta = create<VentaStore>(set => ({
	typeVenta: 'bolsa',
	setTypeVenta: (typeVenta: TypeVenta) => set({ typeVenta })
}));
