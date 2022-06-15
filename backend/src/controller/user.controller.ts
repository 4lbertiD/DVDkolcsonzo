import { Brackets, getRepository } from "typeorm";
import { User } from "../entity/User";
import { Controller } from "./controller";

export class UserController extends Controller {
    repository = getRepository(User);

    update = async (req, res) => {
        const entity = this.repository.create(req.body as {});
        try {
            const existingEntity = await this.repository.findOneBy({ id: entity.id });
            console.log(entity.id);
            if (!existingEntity) {
                res.status(404).json({ message: 'Nem található' });
            }
            const entityUpdated = await this.repository.save(entity);
            res.json(entityUpdated);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    getAll = async (req, res) => {
        const query = req.query.search || ''; // /api/products?search=keresoszo
        const user = req.query.user || '';
        const id = req.query.id || '';
        try {
            const tqb = this.repository.createQueryBuilder('user');
           const users = await tqb
                .where(new Brackets(tqb => {
                    tqb.where("user.name LIKE CONCAT('%', :param ,'%')", { param: query })
                    .orWhere("user.uid LIKE CONCAT('%', :param ,'%')", { param: query })
                 } ) )  .andWhere("user.deleted = 0")
                .getMany();
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };   
}