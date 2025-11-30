import { CreateWorkSchema, SigninSchema, SignupSchema } from "common/types";
import cors from 'cors';
import { ExecutionModal, NodesModal, UserModal, WorkflowModal } from "db/client";
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { authMiddleware } from "./middleware";

const JWT_SECRET = process.env.JWT_SECRET!;
mongoose.connect(process.env.MONGO_URL!);

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,            // only if you send cookies/auth headers
    optionsSuccessStatus: 200  
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

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
    const { success, data} = SigninSchema.safeParse(req.body);

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
            return;   
        }

        return res.status(403).json({
            message: "Invalid username or password"
        })
    } catch(e) {
        res.status(411).json({
            message: "Username already exists"
        })
    }
})

app.post("/workflow", authMiddleware,  async (req, res) => {
    const userId = req.userId;
    const {success, data} = CreateWorkSchema.safeParse(req.body)
    if(!success) {
        res.status(403).json({
            message: "invalid inputs"
        })
    }

    try {
        const workflow = await WorkflowModal.create({
            userId,
            nodes: data?.nodes,
            edges: data?.edges
        })
        res.json({
            id: workflow._id
        })
    } catch (e) {
        res.status(411).json({
            message: e
        })
    }
})

app.get("/workflows", authMiddleware, async (req, res) => {
    const workflows = await WorkflowModal.findById(req.userId)
    res.json(workflows)
})

app.get("/workflow/:workflowId", authMiddleware, async (req, res) => {
    const workflow = await WorkflowModal.findById(req.params.workfflowId)
    if(!workflow || workflow.userId.toString() !== req.userId) {
        res.status(404).json({
            message: "Workflow not found"
        })
    }
})

app.get("/workflow/executions/:workflowId", authMiddleware, async (req, res) => {
    const executions = await ExecutionModal.find({ workflowId: req.params.workflowId})
    res.json(executions)
})

app.get("/credentials", authMiddleware, (req, res) => {

})

app.post("/credentials", (req, res) => {

})

app.get("/nodes", async (req, res) => {
    const nodes = await NodesModal.find();
    res.json(nodes)
})

app.listen(process.env.PORT || 3000, () => console.log('working on PORT:', process.env.PORT));
