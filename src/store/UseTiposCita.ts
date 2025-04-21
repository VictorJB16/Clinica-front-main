import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TipoCita } from '../types/TipoCita';

export interface TipoCitaSession {
    tipoCita: TipoCita[],
    setTipoCita: (sucursales: TipoCita[]) => void,
}

export const useTipoCitaStore = create<TipoCitaSession>()(persist((set) => ({
    tipoCita: [],
    setTipoCita: (tipoCita: TipoCita[]) => {
        set(state => ({
            ...state,
            tipoCita,
        }));
    }
}), {
    name: 'tipo-cita-store'
}))