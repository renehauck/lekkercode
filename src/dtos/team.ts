import { players } from "./player";

export interface JoinRequest {
  userId: number;
  teamId: string;
  status: "pending" | "accepted" | "rejected";
}

export interface Team {
  id: string;
  name: string;
  ownerName: string;
  totalScore: number;
  memberNumber: number;
  availableMemberNumber: number;
  joinRequests: JoinRequest[];
}


export const teams: Team[] = [
  {
    id: "1",
    name: "Team A",
    ownerName: "John Doe",
    totalScore: players.reduce((sum, player) => sum + player.score, 0),
    memberNumber: players.length,
    availableMemberNumber: 10 - players.length,
    joinRequests: [],
  },
  {
    id: "2",
    name: "Team B",
    ownerName: "Jane Doe",
    totalScore: players.reduce((sum, player) => sum + player.score, 0),
    memberNumber: players.length,
    availableMemberNumber: 10 - players.length,
    joinRequests: [],
  },
];

export const joinRequests: JoinRequest[] = [];
