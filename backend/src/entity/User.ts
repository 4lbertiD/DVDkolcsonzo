import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Rent } from './Rent';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    tel: string;

    @Column()
    uid: string;

    @Column({
        default: false
    })
    deleted: boolean;

    @OneToMany(type => Rent, rent => rent.renter)
    rents: Rent[];
}