import { Brackets, getRepository } from "typeorm";
import { AppDataSource } from "../data-source";
import { DVD } from "../entity/DVD";
import { Rent } from "../entity/Rent";
import { Controller } from "./controller";

export class DVDController extends Controller {
    repository = getRepository(DVD);

    getOne = async (req, res) => {
        const entityId = req.params.id;

        try {
            const entity = await this.repository.findOne({
                where: {id: entityId}, 
                relations: { rents: true}});
            if (!entity) {
                res.status(404).json({ message: 'Nem található' });
            }
            console.log(entity)

            res.json(entity);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    getAll = async (req, res) => {
        const query = req.query.search || ''; // /api/products?search=keresoszo

        try {
           const dvds = await this.repository.createQueryBuilder('dvd')
                .where("dvd.title LIKE CONCAT('%', :param ,'%')", { param: query })
                .orWhere("dvd.status LIKE CONCAT('%', :param ,'%')", { param: query })

                .getMany();
            res.json(dvds);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };  

    getFree = async (req, res) => {
      try {
           const dvds = await this.repository.createQueryBuilder('dvd')
                .where("dvd.status = 'szabad'")
                .getMany();
            res.json(dvds);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };  

    getRented = async (req, res) => {
        const renterId = req.params.id;

        try {
            const tqb = this.repository.createQueryBuilder();
            const query = tqb.where(tqb => {
                const subquery = tqb.subQuery(). select('id').from(Rent, 'rent').where('renterId = :renterid');
                return 'rentsId in ' + subquery.getQuery()
                  }
            ).setParameter('renterid', renterId)
       const dvds = await query.getMany()
       
            res.json(dvds);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };  

    getRentedDVDs = async (req, res) => {

        try {
            //SELECT * FROM `dvd` INNER JOIN rent ON dvd.rentsId = rent.id AND rent.out_date < DATE_SUB(NOW(), INTERVAL 10 DAY);
            const dvds = await this.repository.createQueryBuilder("DVD")
                .innerJoinAndSelect("DVD.rents", "rent")
                .innerJoinAndSelect("rent.renter", "user")
                .where("rent.out_date < DATE_SUB(NOW(), INTERVAL 10 DAY)")
                .getMany()
            res.json(dvds);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };  

    back = async (req, res) => {
        const entityId = req.params.id;

        try {
            const entity = await this.repository.findOne({
                where: {id: entityId}, 
                relations: { rents: true}});

            const rentRepo = getRepository(Rent);
            console.log(entity.rents.id)
            const rentEntry = await rentRepo.findOneBy({id: entity.rents.id});
            rentEntry.back_date = new Date(Date.now());
            await rentRepo.save(rentEntry);

            entity.rents = null;
            entity.status = "szabad"

            await this.repository.save(entity);

            res.json(entity);

        } catch (err) {
            console.log(err)
            res.status(500).json({ message: err.message });
        }
    }
}