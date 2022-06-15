import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DVD } from './DVD';
import { User } from './User';

@Entity()
export class Rent {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    out_date: Date;

    @Column({nullable: true})
    back_date: Date;

    @ManyToOne(type => User, {
        eager: true,
        cascade: true
    })
    renter: User;

    @OneToMany(type => DVD, dvd => dvd.rents, {
        eager: true,
        cascade: true
    })
    dvds: DVD[];
  

}