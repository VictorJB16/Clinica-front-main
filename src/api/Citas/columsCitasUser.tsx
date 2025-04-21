'use client'

import { ColumnDef } from "@tanstack/react-table"

import { Cita } from "../../types/Cita"
import { useSucursalesStore } from "../../store/UseSucursales"
import { useTipoCitaStore } from "../../store/UseTiposCita"
import { Button } from "../../components/ui/button"
import { format } from "date-fns"
import { Label } from "@radix-ui/react-label"
import { DeleteCita } from "./DeleteCita"
import { useUserSessionStore } from "../../store/UseUserSession"
import Swal from "sweetalert2"
import { useCitasStore } from "../../store/UseCitas"

export const columnsCitasUser: ColumnDef<Cita>[] = [
    {
        accessorKey: "fechaHora",
        header: "fecha",
        cell: ({ row }) => {
            const formated = format(row.getValue("fechaHora"), "dd-mm-yyyy");
            return <Label>{formated}</Label>
        }
    },
    {
        accessorKey: "sucursalId",
        header: "Sucursal",
        cell: ({ row }) => {

            const { sucursales } = useSucursalesStore.getState();
            const sucursal = sucursales.find(x => x.sucursalId == row.original.sucursalId);

            return <div className="text-right font-medium">{sucursal?.nombre}</div>;
        },
    },
    {
        accessorKey: "tipoCitaId",
        header: "Tipo de Cita",
        cell: ({ row }) => {

            const { tipoCita } = useTipoCitaStore.getState();
            const tipo = tipoCita.find(x => x.tipoCitaId == row.original.tipoCitaId);

            return <div className="text-right font-medium">{tipo?.nombre}</div>;
        },
    },
    {
        accessorKey: 'Remove',
        header: "Eliminar",
        cell: ({ row }) => {
            const { token } = useUserSessionStore(state => state);
            const { removeCita } = useCitasStore(s => s);

            return <Button onClick={async () => {
                const confirm = await Swal.fire({
                    title: '¿Esta seguro?',
                    text: "Solamente un administrador podría revertir estos cambios",
                    icon: 'error',
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    cancelButtonText: 'NO!',
                    confirmButtonText: "Sí, borralo"
                })

                if (!confirm.isConfirmed) {
                    return;
                }

                const result = await DeleteCita(token ?? "", row.original.citaId);
                if (result.error) {
                    return Swal.fire({
                        title: 'Ocurrio un error',
                        text: result.error,
                        icon: 'error'
                    })
                }

                Swal.fire({
                    title: 'OK',
                    text: "La cita fue eliminada correctamente",
                    icon: 'success'
                })
                removeCita(row.original.citaId);
            }} variant={'destructive'}>Eliminar</Button>
        }
    }
]