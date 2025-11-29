import { SignupSchema } from "common/types";
import { UserModal } from "db/client";
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET!;
mongoose.connect(process.env.MONGO_URL!);

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
    const { success, data} = SignupSchema.safeParse(req.body);
    if(!success) {
        return res.status(403).json({ 
            message: 'Incorrect inputs'
        })
    }

    try {
        const user = await UserModal.create({
            username: data.username,
            password: data.password
        })

        res.status(200).json({
            id: user._id,
        })   
    } catch(e) {
        res.status(411).json({
            message: "Username already exists"
        })
    }
})

app.post("/signin", async (req, res) => {
    const { success, data} = SignupSchema.safeParse(req.body);

    if(!success) {
        return res.status(403).json({ 
            message: 'Incorrect inputs'
        })
    }

    try {
        const user = await UserModal.findOne({
            username: data.username,
            password: data.password
        })

        if(user) {
            const token =  jwt.sign({ id: user._id }, JWT_SECRET)
    
            res.status(200).json({
                id: user._id,
                token
            })   
        }
    } catch(e) {
        res.status(411).json({
            message: "Username already exists"
        })
    }
})

app.post("/workflow", (req, res) => {

})

app.put("/workflow", (req, res) => {

})

app.get("/workflow/:workflowId", (req, res) => {

})

app.get("/workflow/executions/:workflowId", (req, res) => {

})

app.get("/credentials", (req, res) => {

})

app.post("/credentials", (req, res) => {

})

app.get("/nodes", (req, res) => {

})

app.listen(process.env.PORT || 3000, () => console.log('working on PORT:', process.env.PORT));