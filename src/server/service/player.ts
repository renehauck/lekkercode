import { Request, Response } from "express";
import { Player, players } from "../../dtos/player";

export class PlayerService {
  getAll(req: Request, res: Response) {
    res.json(players);
  }

  create(req: Request, res: Response) {
    const { id, rank, name, score, team } = req.body;
    const newPlayer: Player = { id, rank, name, score, team };
    players.push(newPlayer);
    res.status(201).json(newPlayer);
  }

  get(req: Request, res: Response) {
    const player = players.find((p) => p.id === req.params.id);
    if (player) {
      res.json(player);
    } else {
      res.sendStatus(404);
    }
  }

  update(req: Request, res: Response) {
    const { rank, name, score, team } = req.body;
    const player = players.find((p) => p.id === req.params.id);
    if (player) {
      player.rank = rank;
      player.name = name;
      player.score = score;
      player.team = team;
      res.json(player);
    } else {
      res.sendStatus(404);
    }
  }

  remove(req: Request, res: Response) {
    const index = players.findIndex((p) => p.id === req.params.id);
    if (index !== -1) {
      players.splice(index, 1);
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
}
