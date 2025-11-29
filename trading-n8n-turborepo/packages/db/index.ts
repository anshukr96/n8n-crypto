import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const EdgeSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true
    },
}, {
    _id: false
})

const PositionSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    }
}, {
    _id: false
})

const NodeDataSchema = new Schema({
    kind: {
        type: String,
        enum: ["ACTION", "TRIGGER"],
    },
    metadata: Schema.Types.Mixed
}, {
    _id: false
})

const WorkflowNodeSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    position: PositionSchema,
    credentials: Schema.Types.Mixed,
    nodeId: {
        type: Schema.Types.ObjectId,
        ref: 'Nodes'
    },
    data: NodeDataSchema
}, {
    _id: false
})

const WorkflowSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    nodes: [WorkflowNodeSchema],
    edge: [EdgeSchema]
})

const CredentialsTypeSchema = new Schema({
    title: { type: String, required: true},
    required: { type: Boolean, required: true},
})

const NodesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    CredentialsType: [CredentialsTypeSchema]
})

const ExecutionSchema = new Schema({
    workflowId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Workflows'
    },
    status: {
        type: String,
        enum: ['PENDING', 'SUCCESS', 'FAILURE'],
    },
    startTime: {
        type: Date,
        default: Date.now() 
    },
    endTime: {
        type: Date,
    }
})

export const UserModal = mongoose.model('Users', UserSchema)
export const WorkflowModal = mongoose.model('Workflows', WorkflowSchema)
export const NodesModal = mongoose.model('Nodes', NodesSchema)
export const ExecutionModal = mongoose.model('Executions', ExecutionSchema)