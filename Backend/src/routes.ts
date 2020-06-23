import { Router } from "express";

import pointsController from './controllers/PointsController';
import itemsController from './controllers/ItemsController';

export default Router()
  .get("/items", itemsController.index)
  .post("/points", pointsController.create)
  .get('/points', pointsController.index)
  .get('/points/:id', pointsController.show)
