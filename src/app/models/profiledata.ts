const mongoose = require('mongoose');

const coHostSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true },
  full_name: { type: String, required: true },
  userType: { type: String, default: null },
  status: { type: String, required: true },
  sourceSystem: { type: String, default: null },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  photoUrl: { type: String, default: null },
  profileAvatarImgFileId: { type: String, default: null },
  profileBannerImgFileId: { type: String, default: null }
}, { _id: false }); // Disable automatic _id for subdocuments

const profileDataSchema = new mongoose.Schema({
  profileTemplateId: { type: String, required: true },
  data: {
    start_date: { type: Date, required: true },
    end_date: { type: Date, default: null },
    location: { type: String, required: true },
    host: { type: String, required: true },
    coHosts: [coHostSchema] // Array of coHostSchema
  },
  entityId: { type: String, required: true },
  current: { type: Boolean, default: false },
  createdDate: { type: Date, required: true, default: Date.now },
  lastModifiedDate: { type: Date, required: true, default: Date.now },
  _class: { type: String, required: true }
});

// Create a model from the schema
const ProfileData = mongoose.model('ProfileData', profileDataSchema);

export default ProfileData;