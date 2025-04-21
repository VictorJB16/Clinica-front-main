export type Cita = {
    citaId: number,
    fechaHora: string,
    status: "ACEPTADA" | "CANCELADA",
    pacienteId: number,
    sucursalId: number,
    tipoCitaId: number
}