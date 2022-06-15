import { DVD } from "./dvd";
import { User } from "./user";

export interface Rent{
    id: string;
    out_date: Date;
    back_date: Date;
    dvds: DVD[];
    renter: User;
}