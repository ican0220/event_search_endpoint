import mongoose from "mongoose";

const profileDataSchema = new mongoose.Schema({
    profileTemplateId: { type: String, required: true },
    data: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        emailId: { type: String, required: true, match: /.+\@.+\..+/ }, // basic email validation
    },
    entityId: { type: String, required: true },
    current: { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now },
    lastModifiedDate: { type: Date, default: Date.now },
}, { timestamps: true });

const ProfileData = mongoose.model('ProfileData', profileDataSchema);

export default ProfileData;