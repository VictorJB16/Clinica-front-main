import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Paciente } from "../types/paciente";

export interface PacientesSession {
    pacientes: Paciente[],
    setPacientes: (pacientes: Paciente[]) => void,
}

export const usePacientesStore = create<PacientesSession>()(persist((set) => ({
    pacientes: [],
    setPacientes: (pacientes: Paciente[]) => {
        set(state => ({
            ...state,
            pacientes,
        }));
    }
}), {
    name: 'pacientes-store'
}))