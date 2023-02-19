import { model, Schema } from "mongoose";
import Stage from '../types/stage'
import Trip from "../types/trip";

const tripSchema = new Schema({
  ticker: {
    type: String,
    require: false,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  list_of_requirements: {
    type: Array,
    require: true,
  },
  start_date: {
    type: Date,
    require: true,
  },
  end_date: {
    type: Date,
    require: true,
  },
  pictures: {
    type: Array,
    require: false,
  },
  published: {
    type: Boolean,
    require: false,
  },
  cancelled: {
    type: Boolean,
    require: false,
  },
  reason: {
    type: String,
    required: false,
  },
  stages: {
    type: Array<Stage>
  }
});

tripSchema.pre<Trip>('save', function (next) {
  const banco = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let random = "";
  for (let i = 0; i < 4; i++) {
    random += banco.charAt(Math.floor(Math.random() * banco.length));
  }
  this.ticker = `${this.start_date}-${random}`
  next()
});

tripSchema.pre<Trip>('save', function (next) {
  let total_price = 0
  this.stages.map((stage: Stage)=>{
      total_price +=stage.price
  })
  if(total_price == 0){
    this.price = 0
    next()
  }else this.price = total_price
  next()
});

export default model<Trip>("Trip", tripSchema);
