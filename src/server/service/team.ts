import { Request, Response } from "express";
import { JoinRequest, joinRequests, Team, teams } from "../../dtos/team";
import { users } from "../../dtos/user";

export class TeamService {
  joinTeam(req: Request, res: Response) {
    const { userId, teamId } = req.body;

    // Check if the user has already sent a join request for the team
    const existingRequest = joinRequests.find(
      (request) => request.userId === userId && request.teamId === teamId
    );

    if (existingRequest) {
      return res.status(409).json({ message: "Join request already sent." });
    }

    // Check if the team exists
    const team = teams.find((team) => team.id === teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found." });
    }

    // Check if there are available slots in the team
    if (team.availableMemberNumber <= 0) {
      return res.status(409).json({ message: "Team is full." });
    }

    // Add the join request to the list
    const newRequest: JoinRequest = {
      id: new Date().getTime().toString(),
      userId,
      teamId,
      status: "pending",
    };
    joinRequests.push(newRequest);

    res.json({ message: "Join request sent successfully." });
  }

  rejectJoinRequest(req: Request, res: Response) {
    const { requestId, teamId } = req.body;

    // Find the team in the database
    const team = teams.find((t) => t.id === teamId);

    // Check if the team exists and the user is the team owner
    if (!team || team.ownerId.toString() !== req.user.userId.toString()) {
      return res.status(401).json({
        message:
          "Unauthorized. You must be the team owner to reject join requests.",
      });
    }

    // Find the join request in the team's joinRequests array
    const joinRequestIndex = team.joinRequests.findIndex(
      (request) => request.id === requestId
    );

    // Check if the join request exists
    if (joinRequestIndex === -1) {
      return res
        .status(404)
        .json({ message: "Join request not found or team not found." });
    }

    // Remove the join request from the team's joinRequests array
    team.joinRequests.splice(joinRequestIndex, 1);

    res.json({ message: "Join request rejected successfully." });
  }

  remove(req: Request, res: Response) {
    const index = teams.findIndex((t) => t.id === req.params.id);
    if (index !== -1) {
      teams.splice(index, 1);
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }

  update(req: Request, res: Response) {
    const { name, ownerName, totalScore, memberNumber, availableMemberNumber } =
      req.body;
    const team = teams.find((t) => t.id === req.params.id);
    if (team) {
      team.name = name;
      team.ownerName = ownerName;
      team.totalScore = totalScore;
      team.memberNumber = memberNumber;
      team.availableMemberNumber = availableMemberNumber;
      res.json(team);
    } else {
      res.sendStatus(404);
    }
  }

  get(req: Request, res: Response) {
    const team = teams.find((t) => t.id === req.params.id);
    if (team) {
      res.json(team);
    } else {
      res.sendStatus(404);
    }
  }

  create(req: Request, res: Response) {
    const { name, memberNumber } = req.body;
    const user = users.find(
      (user) => user.id.toString() === req.user.userId.toString()
    );
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    // Create a new team and add it to the database
    const newTeam: Team = {
      id: (teams.length + 1).toString(),
      name,
      ownerName: user.username, // Assuming you have middleware that populates the authenticated user information in req.user
      totalScore: 0,
      memberNumber,
      availableMemberNumber: memberNumber,
      ownerId: user.id.toString(),
      joinRequests: [],
    };
    teams.push(newTeam);

    res.status(201).json(newTeam);
  }

  getAll(req: Request, res: Response) {
    res.json(teams);
  }
}
