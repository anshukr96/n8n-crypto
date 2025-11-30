import { ExecutionModal, WorkflowModal } from "db/client"
import { execute } from "./execute"
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URL!);
async function main() {
    while(1) {
        const workflows = await WorkflowModal.find({})
        workflows.map(async (workflow) => {
            const trigger =  workflow.nodes.find(node => node.data?.kind === 'TRIGGER')
            if(!trigger) return

            switch(trigger?.type) {
                case 'timer': 
                    const timeInS = trigger.data?.metadata.time;
                    const execution = await ExecutionModal.findOne({
                        workflowId: workflow.id
                    }).sort({
                        startTime: 1
                    })

                    if(!execution) {
                        execute(workflow.nodes, workflow.edges)
                    } else if (execution?.startTime && execution.startTime.getSeconds() < Date.now()) {
                        execute(workflow.nodes, workflow.edges)
                    }

            }
        })
    }
}

main()
