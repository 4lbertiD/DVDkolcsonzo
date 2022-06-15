import { Router } from 'express';
import { DVDController } from './controller/DVD.controller';
import { UserController } from './controller/user.controller';
import { RentController } from './controller/rent.controller';

export function getRouter(): Router {
    const router = Router();

    
    
    const userController = new UserController();
    const dvdController = new DVDController();
    const rentController = new RentController();

    

    router.get('/users', userController.getAll);
    router.get('/users/:id', userController.getOne);
    router.post('/users', userController.create);
    router.put('/users', userController.update);
    router.delete('/users', userController.delete);

    router.get('/dvds', dvdController.getAll);
    router.get('/dvds/:id', dvdController.getOne);
    router.post('/dvds', dvdController.create);
    router.put('/dvds', dvdController.update);
    router.get('/dvdsfree', dvdController.getFree);
    router.get('/rented/:id', dvdController.getRented);

    router.get('/dvds_rented', dvdController.getRentedDVDs);
    
    router.delete('/dvds/:id', dvdController.back);

    router.get('/rents', rentController.getAll);
    router.get('/rents/:id', rentController.getOne);
    router.post('/rents', rentController.create);
    router.put('/rents', rentController.update);


    return router;
}
