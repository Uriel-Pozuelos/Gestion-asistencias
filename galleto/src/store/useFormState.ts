import { create } from 'zustand';

interface FormState {
	typeVentas: 'bolsa' | 'granel' | 'pieza' | 'dinero' | 'caja' | null;
	setTypeVentas: (
		typeVentas: 'bolsa' | 'granel' | 'pieza' | 'dinero' | 'caja'
	) => void;
	cantidades: number | null;
	setCantidades: (cantidad: number) => void;
	isUpdate: boolean;
	setIsUpdate: (isUpdate: boolean) => void;
	idUpdate: number | null;
	setIdUpdate: (id: number) => void;
	precios: number | null;
	setPrecios: (precio: number) => void;
}

export const useFormState = create<FormState>(set => ({
	typeVentas: null,
	setTypeVentas: (
		typeVentas: 'bolsa' | 'granel' | 'pieza' | 'dinero' | 'caja'
	) => set({ typeVentas }),
	cantidades: null,
	setCantidades: (cantidades: number) => set({ cantidades }),
	isUpdate: false,
	setIsUpdate: (isUpdate: boolean) => set({ isUpdate }),
	idUpdate: null,
	setIdUpdate: (id: number) => set({ idUpdate: id }),
	precios: null,
	setPrecios: (precios: number) => set({ precios })
}));
