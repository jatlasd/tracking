import { Schema, model, models } from "mongoose";

const TriggerSchema = new Schema({
    trigger: {
        type: String,
        required: [true, "Trigger is required"],
    }
})

const Trigger = models.Trigger || model("Trigger", TriggerSchema);

export default Trigger;