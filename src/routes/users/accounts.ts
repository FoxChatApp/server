import { Router } from 'express';
import { registerRequestSchema } from '../../schemas/registerSchema';

const accountsRouter = Router();

accountsRouter.post("/auth/register", (req, res)=>{
    const validationResult = registerRequestSchema.safeParse(req.body)
    if(validationResult.success) {
        res.json({error: false, message: "User not fucking created I HATE YOU"})
    } else {
        res.json({error: true, message: validationResult.error.message})
    }
})

export { accountsRouter }