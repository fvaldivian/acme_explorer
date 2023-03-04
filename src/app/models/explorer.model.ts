import {model, Schema} from "mongoose";

const MonthExpenseSchema = new Schema({
    year: {
      type: Number
    },
    month: {
      type: Number
    },
    moneySpent: {
      type: Number
    }
  });
  
  const YearExpenseSchema = new Schema({
    year: {
      type: Number
    },
    moneySpent: {
      type: Number
    }
  });

const ExplorerStatsSchema = new Schema({
    explorerId: {
      type: Schema.Types.ObjectId,
      ref: 'Actor'
    },
    monthExpense: [MonthExpenseSchema],
    yearExpense: [YearExpenseSchema],
    moneySpent: {
      type: Number
    },
    computationMoment: {
      type: Date,
      default: Date.now()
    }
  },
  { timestamps: { updatedAt: 'computationMoment' } });

  ExplorerStatsSchema.index({ explorerId: 1 });

  export  const MonthExpense = model('MonthExpense', MonthExpenseSchema);
  export const YearExpense = model('YearExpense', YearExpenseSchema);
  export const ExplorerStats =  model('ExplorerStats',ExplorerStatsSchema)