import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the User interface
export interface IEvent extends Document {
  name: string;
  location: string;
}

// Create a Mongoose schema
const EventSchema: Schema<IEvent> = new Schema({
  name: { type: String, required: true },
  location: {type: String, required: true},
});

// Create the Mongoose model
const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;