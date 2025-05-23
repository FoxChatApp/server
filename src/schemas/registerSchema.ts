import { z } from 'zod'

export const registerRequestSchema = z.object({
    username: z.string().trim().min(2).max(32),
    password: z.string().trim().min(8, {message: "Too short bitch"}).max(64, { message: "U aint remembering ts 🥀💔" }).regex(/[a-z]/, "gimme lowercase letter. NOW.").regex(/[A-Z]/, { message: "i like uppercase letters too, yk?"}).regex(/[0-9]/, "gimme number or ur dog gets it").regex(/[^a-zA-Z0-9]/, { message: "SPECIAL CHARACTER. NOW. STOP BEING A BITCH." }),
    email: z.string().trim().email({message: "that shit is NOT a valid email"}),
    discriminator: z.number().min(0, {message: "damn no wonder she keeps talking about baby carrots"}).max(9999, {message: "too big, just like mine~"})
})