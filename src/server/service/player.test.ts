import { Request, Response } from "express";
import { players, Player } from "../../dtos/player";
import { PlayerService } from "./player";

describe("PlayerService", () => {
  let playerService: PlayerService;

  beforeEach(() => {
    playerService = new PlayerService();
  });

  afterEach(() => {
    // Clear the players array after each test
    players.length = 0;
  });

  describe("getAll", () => {
    it("should return all players", () => {
      const req = {} as Request;
      const res = {
        json: jest.fn(),
      } as unknown as Response;

      playerService.getAll(req, res);

      expect(res.json).toHaveBeenCalledWith(players);
    });
  });

  describe("create", () => {
    it("should create a new player and return it", () => {
      const newPlayer: Player = {
        id: "1",
        rank: 1,
        name: "John Doe",
        score: 100,
        team: "Team A",
      };
      const req = {
        body: newPlayer,
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      playerService.create(req, res);

      expect(players).toContainEqual(newPlayer);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newPlayer);
    });
  });

  describe("get", () => {
    it("should return a player by ID if found", () => {
      const playerId = "1";
      const player: Player = {
        id: playerId,
        rank: 1,
        name: "John Doe",
        score: 100,
        team: "Team A",
      };
      players.push(player);
      const req = {
          params: {
              id: playerId,
          },
      } as unknown as Request;
      const res = {
        json: jest.fn(),
        sendStatus: jest.fn(),
      } as unknown as Response;

      playerService.get(req, res);

      expect(res.json).toHaveBeenCalledWith(player);
      expect(res.sendStatus).not.toHaveBeenCalled();
    });

    it("should return 404 if player is not found", () => {
      const req = {
          params: {
              id: "non_existent_id",
          },
      } as unknown as Request;
      const res = {
        json: jest.fn(),
        sendStatus: jest.fn(),
      } as unknown as Response;

      playerService.get(req, res);

      expect(res.json).not.toHaveBeenCalled();
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("update", () => {
    it("should update a player by ID and return it", () => {
      const playerId = "1";
      const player: Player = {
        id: playerId,
        rank: 1,
        name: "John Doe",
        score: 100,
        team: "Team A",
      };
      players.push(player);
      const updatedPlayerData = {
        rank: 2,
        name: "Updated Name",
        score: 200,
        team: "Team B",
      };
      const req = {
          params: {
              id: playerId,
          },
          body: updatedPlayerData,
      } as unknown as Request;
      const res = {
        json: jest.fn(),
        sendStatus: jest.fn(),
      } as unknown as Response;

      playerService.update(req, res);

      expect(players).toContainEqual({
        ...player,
        ...updatedPlayerData,
      });
      expect(res.json).toHaveBeenCalledWith({
        ...player,
        ...updatedPlayerData,
      });
      expect(res.sendStatus).not.toHaveBeenCalled();
    });

    it("should return 404 if player to update is not found", () => {
      const req = {
          params: {
              id: "non_existent_id",
          },
          body: {
              rank: 2,
              name: "Updated Name",
              score: 200,
              team: "Team B",
          },
      } as unknown as Request;
      const res = {
        json: jest.fn(),
        sendStatus: jest.fn(),
      } as unknown as Response;

      playerService.update(req, res);

      expect(res.json).not.toHaveBeenCalled();
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("remove", () => {
    it("should remove a player by ID", () => {
      const playerId = "1";
      const player: Player = {
        id: playerId,
        rank: 1,
        name: "John Doe",
        score: 100,
        team: "Team A",
      };
      players.push(player);
      const req = {
          params: {
              id: playerId,
          },
      } as unknown as Request;
      const res = {
        sendStatus: jest.fn(),
      } as unknown as Response;

      playerService.remove(req, res);

      expect(players).not.toContainEqual(player);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it("should return 404 if player to remove is not found", () => {
      const req = {
          params: {
              id: "non_existent_id",
          },
      } as unknown as Request;
      const res = {
        sendStatus: jest.fn(),
      } as unknown as Response;

      playerService.remove(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });
});
