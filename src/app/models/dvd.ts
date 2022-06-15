import { Rent } from "./rent";

export interface DVD{
    id: string;
    title: string;
    acq_date: Date;
    status: string;
    rents: Rent;
}