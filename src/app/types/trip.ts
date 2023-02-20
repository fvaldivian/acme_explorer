import Stage from "../types/stage";

export default interface Trip {
    ticker: string;
    title: string;
    description: string;
    price: number;
    list_of_requirements: string[];
    start_date: Date;
    end_date: Date;
    pictures: string[];
    published: boolean
    cancelled: boolean;
    reason: string;
    stages: Stage[];
    manager: any
  }