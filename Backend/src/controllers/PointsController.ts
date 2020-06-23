import 'dotenv/config';
import { Request, Response } from 'express';
import knex from "../database/connection";

class PointsController {

  async index(request: Request, response: Response) {
    const { city, items, uf } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await knex('points')
      .join('points_items', 'points.id', '=', 'points_items.points_id')
      .whereIn('points_items.items_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    return response.json(points);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points')
      .where('id', id)
      .first();

    if (!point) {
      return response
        .status(400)
        .json({ message: 'Item não encontrado!' });
    }

    const items = await knex('items')
      .join('points_items', 'items.id', '=', 'points_items.items_id')
      .where('points_items.points_id', id)
      .select('items.title');

    return response.json({
      point,
      items
    });
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = request.body;

    const pointsData = {
      image: String(process.env.STATIC_IMAGE),
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    }
    const trx = await knex.transaction();
    const pointsId = await trx("points").insert(pointsData);
    const points_id = pointsId[0];
    const pointItems = items.map((items_id: number) => ({
      items_id,
      points_id
    }))

    await trx("points_items").insert(pointItems);
    await trx.commit();

    return response.json({
      points_id,
      ...pointsData
    })
  }
}

export default new PointsController;