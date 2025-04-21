import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Cita } from "../types/Cita";

export interface CitasSession {
    citas: Cita[],
    setCitas: (citas: Cita[]) => void,
    removeCita: (id: number) => void
}

export const useCitasStore = create<CitasSession>()(persist((set) => ({
    citas: [],
    setCitas: (citas: Cita[]) => {
        set(state => ({
            ...state,
            citas,
        }));
    },
    removeCita: (id: number) => {
        set(state => ({
            ...state,
            citas: state.citas.filter(x => x.citaId != id)
        }));
    }
}), {
    name: 'citas-store'
}))