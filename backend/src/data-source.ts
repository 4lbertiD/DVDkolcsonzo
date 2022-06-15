import "reflect-metadata"
import { DataSource } from "typeorm"
import { Rent } from "./entity/Rent"
import { DVD } from "./entity/DVD"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'david',
    password: 'david',
    database: 'kolcsonzo',
    synchronize: true,
    logging: false,
    entities: [User, DVD, Rent],
    migrations: [],
    subscribers: [],
})
