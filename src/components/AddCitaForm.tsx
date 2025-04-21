import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "./ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select"


import { Calendar } from "./ui/calendar"
import { useEffect, useState } from "react"
import { GetSucursales } from "../api/Sucursales/getSucursales"
import { Sucursal } from '../types/Surcursal';
import { useUserSessionStore } from "../store/UseUserSession"
import { TipoCita } from "../types/TipoCita"
import { GetTipoCitas } from "../api/TipoCita/TipoCita"
import { formatISO } from "date-fns"
import { AddCita } from "../api/Citas/AddCita"

import Swal from 'sweetalert2'
import { AxiosError } from "axios"
import { useSucursalesStore } from "../store/UseSucursales"
import { useTipoCitaStore } from "../store/UseTiposCita"
import { usePacientesStore } from "../store/usePacientes"
import { getPacientes } from "../api/Paciente/getPacientes"

const formSchema = z.object({
    fechaHora: z.date().min(new Date(Date.now()), {
        message: 'No puedes reservar espacio para el pasado!'
    }),
    sucursalId: z.string().refine((val => +val != 0), {
        message: 'Seleccione una sucursal',
    }),
    tipoCitaId: z.string().refine((val => +val != 0), {
        message: 'Seleccione un tipo de cita',
    }),
})


export const AddCitaForm = () => {

    const { setSucursales, sucursales } = useSucursalesStore(state => state);
    const { setTipoCita, tipoCita } = useTipoCitaStore(state => state);

    const { token } = useUserSessionStore();

    useEffect(() => {
        const loadSucursales = async () => {
            const data = await GetSucursales(token ?? "");
            if (!data.error) {
                setSucursales(data.response);
                return;
            }
            console.log("Hubo un error al consultar los datos");
        }

        const loadTiposCita = async () => {
            const data = await GetTipoCitas(token ?? "");
            if (!data.error) {
                setTipoCita(data.response);
                return;
            }
            console.log("Hubo un error al consultar los datos");
        }

        loadTiposCita();
        loadSucursales();
    }, [])


    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sucursalId: "0",
            tipoCitaId: "0",
            fechaHora: new Date(Date.now()),
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await AddCita(token ?? "", {
            ...values,
            fechaHora: formatISO(values.fechaHora),
        })

        if (response.error) {
            return Swal.fire({
                title: "Que mal!",
                text: response.error ?? "Ocurrio un error",
                icon: "error"
            });
        }

        Swal.fire({
            title: "Buen trabajo!",
            text: "La cita se creo correctamente",
            icon: "success"
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex gap-3">
                    <FormField
                        control={form.control}
                        name="tipoCitaId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo de cita</FormLabel>
                                <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="¿Que tipo de cita?" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={"0"}>SELECCIONE</SelectItem>
                                            {tipoCita.map(tipoCita => (
                                                <SelectItem key={tipoCita.tipoCitaId} value={tipoCita.tipoCitaId.toString()}>{tipoCita.nombre}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>
                                    Selecciona El tipo de cita
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="sucursalId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sucursal</FormLabel>
                                <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Sucursal" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={"0"}>SELECCIONE</SelectItem>
                                            {sucursales.map(sucursal => (
                                                <SelectItem key={sucursal.sucursalId} value={sucursal.sucursalId + ""}>{sucursal.nombre}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>
                                    Selecciona la sucursal
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="container">
                    <FormField
                        control={form.control}
                        name="fechaHora"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha</FormLabel>
                                <FormControl>
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        className="rounded-md border"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Selecciona la fecha para tu cita
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button className="m-auto block" type="submit">Reservar</Button>
            </form>
        </Form>
    )
}
