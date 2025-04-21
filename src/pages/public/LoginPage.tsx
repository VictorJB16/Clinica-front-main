import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "../../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"

import { Input } from "../../components/ui/input"
import { useUserSessionStore } from "../../store/UseUserSession"
import { login } from "../../api/Auth/Login"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const formSchema = z.object({
  email: z.string().email({
    message: 'Debe cumplir con un formato válido de email'
  }),
  password: z.string().min(5, {
    message: 'La contraseña necesita al menos 5 caracteres'
  })
})

export function LoginPage() {
  const { setSession } = useUserSessionStore(state => state);
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: '',
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await login(values);

    if (result.error) {
      Swal.fire({
        title: "Que mal!",
        text: result.error,
        icon: "error"
      });
      return;
    }
    setSession(result.response.token!);
    navigate('/')
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded min-w-[375px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="info@gmail.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Tu correo electronico.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Abcd1234!" {...field} />
                  </FormControl>
                  <FormDescription>
                    Tú contraseña
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <Button type="submit">Login</Button>
              <Button variant={"link"} onClick={() => navigate('/register')} type="button">¿Todavía no tienes una cuenta?</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

