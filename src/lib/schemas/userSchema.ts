import { z } from "zod";

/* Update User */
export const updateUserSchema = z.object({
    name: z.string().min(1, { message: "Nome obrigatório" }).max(80, { message: 'Nome muito grande' }),
    email: z.string().email({ message: "Email inválido" }).max(254, { message: "Email muito grande" }),
    password: z.string()
    .max(80, { message: "Senha muito grande" })
    .refine(value => !value || /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9\s]).+$/.test(value), {
        message: "A Senha deve conter pelo menos uma letra Maíuscula e Minuscula, um número e um caractere especial"
    }),
    confirm_password: z.string()
}).refine(data => data.password === data.confirm_password, {
    message: "As senhas não correspondem",
    path: ["confirm_password"]
})

export type UpdateUserData = z.infer<typeof updateUserSchema>