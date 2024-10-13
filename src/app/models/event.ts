import mongoose, { Document, Model, Schema } from "mongoose";

// Define the User interface
export interface ILocation extends Document {
  lng: number;
  lat: number;
}

export interface IEvent extends Document {
  user_id: string;
  username: string;
  address: string;
  location: {
    lng: number;
    lat: number;
  };
}

const LocationSchema: Schema<ILocation> = new Schema({
  lng: { type: Number, required: true },
  lat: { type: Number, required: true },
});

// Create a Mongoose schema
const EventSchema: Schema<IEvent> = new Schema({
  user_id: {type: String, require: true},
  username: { type: String, required: true },
  address: { type: String, required: true },
  location: LocationSchema
});

// Create the Mongoose model
const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;
