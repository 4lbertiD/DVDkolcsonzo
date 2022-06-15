import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { DVD } from '../entity/DVD';
import { Rent } from '../entity/Rent';
import { User } from '../entity/User';
import { Controller } from './controller';

export class RentController extends Controller {
    repository = getRepository(Rent);

    getAll = async (req, res) => {
        const query = req.query.search || ''; // /api/products?search=keresoszo

        try {
           const rents = await this.repository.createQueryBuilder('rent')
                .where("rent.id LIKE CONCAT('%', :param ,'%')", { param: query })
                .leftJoinAndSelect('rent.dvds','dvd')
                .leftJoinAndSelect('rent.users','user')
                .getMany();
            res.json(rents);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };  
    create = async (req, res) => {
        const data = req.body as {};
        console.log(data);

        try {
            for (let i = 0; i < data['dvds'].length; i++){
                const dvd = data["dvds"][i];
                dvd ["status"] = "kint";
   
            }
          
            const entity = this.repository.create(data)
            const entityInserted = await this.repository.save(entity);
            console.log();
            res.json(entityInserted);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}