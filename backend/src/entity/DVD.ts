import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import { Rent } from './Rent';

@Entity()
export class DVD {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    acq_date: Date;

    @Column()
    status: string;   

    @ManyToOne(type => Rent, rent => rent.dvds)
    rents: Rent;
}