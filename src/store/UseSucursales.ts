import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Sucursal } from "../types/Surcursal";

export interface SucursalesSession {
    sucursales: Sucursal[],
    setSucursales: (sucursales: Sucursal[]) => void,
}

export const useSucursalesStore = create<SucursalesSession>()(persist((set) => ({
    sucursales: [],
    setSucursales: (sucursales: Sucursal[]) => {
        set(state => ({
            ...state,
            sucursales,
        }));
    }
}), {
    name: 'sucursales-store'
}))