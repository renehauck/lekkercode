import { Request, Response } from "express";
import { teams, joinRequests, Team } from "../../dtos/team";
import { users } from "../../dtos/user";
import { TeamService } from "./team";

describe("TeamService", () => {
  let teamService: TeamService;

  beforeEach(() => {
    teamService = new TeamService();
  });

  afterEach(() => {
    // Clear the teams and joinRequests arrays after each test
    teams.length = 0;
    joinRequests.length = 0;
  });

  describe("joinTeam", () => {
    it("should send a join request to a team", () => {
      const userId = 1;
      const teamId = "1";
      const req = {
        body: {
          userId,
          teamId,
        },
        params: {}, // Add the required parameters for the test
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      teamService.joinTeam(req, res);

      expect(joinRequests.length).toBe(1);
      expect(joinRequests[0]).toEqual(
        expect.objectContaining({
          userId: 1,
          teamId: "1",
          status: "pending",
        })
      );
      expect(res.json).toHaveBeenCalledWith({
        message: "Join request sent successfully.",
      });
    });

   

    it("should return 404 if team not found", () => {
      const userId = 1;
      const teamId = "non_existent_id";
      const req = {
        body: {
          userId,
          teamId,
        },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      teamService.joinTeam(req, res);

      expect(joinRequests.length).toBe(0);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Team not found.",
      });
    });

   
  });


  describe("remove", () => {
    it("should remove a team", () => {
      const teamId = "1";
      // Add a team to be removed
      teams.push({
        id: teamId,
        name: "Team A",
        ownerName: "Owner",
        ownerId: "owner_user_id",
        totalScore: 0,
        memberNumber: 1,
        availableMemberNumber: 9,
        joinRequests: [],
      });
      const req = {
        params: {
          id: teamId,
        },
      } as unknown as Request;
      const res = {
        sendStatus: jest.fn(),
      } as unknown as Response;

      teamService.remove(req, res);

      expect(teams.length).toBe(0);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it("should return 404 if team not found", () => {
      const req = {
        params: {
          id: "non_existent_team_id",
        },
      } as unknown as Request;
      const res = {
        sendStatus: jest.fn(),
      } as unknown as Response;

      teamService.remove(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("update", () => {
    it("should update a team", () => {
      const teamId = "1";
      // Add a team to be updated
      teams.push({
        id: teamId,
        name: "Team A",
        ownerName: "Owner",
        ownerId: "owner_user_id",
        totalScore: 100,
        memberNumber: 5,
        availableMemberNumber: 5,
        joinRequests: [],
      });
      const updatedTeamData = {
        name: "Updated Team",
        ownerName: "Updated Owner",
        totalScore: 200,
        memberNumber: 10,
        availableMemberNumber: 0,
      };
      const req = {
        params: {
          id: teamId,
        },
        body: updatedTeamData,
      } as unknown as Request;
      const res = {
        json: jest.fn(),
      } as unknown as Response;

      teamService.update(req, res);

      const updatedTeam = teams.find((t) => t.id === teamId) as Team;
      expect(updatedTeam.name).toBe(updatedTeamData.name);
      expect(updatedTeam.ownerName).toBe(updatedTeamData.ownerName);
      expect(updatedTeam.totalScore).toBe(updatedTeamData.totalScore);
      expect(updatedTeam.memberNumber).toBe(updatedTeamData.memberNumber);
      expect(updatedTeam.availableMemberNumber).toBe(
        updatedTeamData.availableMemberNumber
      );
      expect(res.json).toHaveBeenCalledWith(updatedTeam);
    });

    it("should return 404 if team not found", () => {
      const req = {
        params: {
          id: "non_existent_team_id",
        },
        body: {},
      } as unknown as Request;
      const res = {
        sendStatus: jest.fn(),
      } as unknown as Response;

      teamService.update(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("get", () => {
    it("should return a specific team if found", () => {
     const newTeam = {
       id: "1",
       name: "Team A",
       ownerName: "Owner",
       ownerId: "owner_user_id",
       totalScore: 100,
       memberNumber: 5,
       availableMemberNumber: 5,
       joinRequests: [],
     };

     teams.push(newTeam);

     const req = {
       params: {
         id: newTeam.id,
       },
     } as unknown as Request;
     const res = {
       json: jest.fn(),
       sendStatus: jest.fn(),
     } as unknown as Response;

     teamService.get(req, res);
     expect(res.json).toHaveBeenCalled();
     expect(res.json).toHaveBeenCalledWith(newTeam);
     expect(res.sendStatus).not.toHaveBeenCalled();
    });

    it("should return 404 if team is not found", () => {
      const req = {
        params: {
          id: "non_existent_id",
        },
      } as unknown as Request;
      const res = {
        json: jest.fn(),
        sendStatus: jest.fn(),
      } as unknown as Response;

      teamService.get(req, res);

      expect(res.json).not.toHaveBeenCalled();
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("getAll", () => {
    it("should return all teams", () => {
      const req = {} as Request;
      const res = {
        json: jest.fn(),
      } as unknown as Response;

      teamService.getAll(req, res);

      expect(res.json).toHaveBeenCalledWith(teams);
    });
  });
});
