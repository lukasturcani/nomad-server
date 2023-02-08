import { Schema, model } from 'mongoose'

const rackSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  group: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Group'
  },
  isOpen: {
    type: Boolean,
    required: true,
    default: true
  },
  slotsNumber: {
    type: Number,
    required: true,
    default: 72
  },
  samples: [
    {
      slot: Number,
      user: {
        id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        username: String,
        fullName: String
      },
      solvent: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },

      tubeId: {
        type: String,
        required: true,
        default: '---'
      },

      exps: Array,

      addedAt: Date,

      instrument: {
        id: { type: Schema.Types.ObjectId, ref: 'Instrument' },
        name: String
      },
      holder: Number,
      status: String,
      dataSetName: String
    }
  ]
})

export default model('Rack', rackSchema)
