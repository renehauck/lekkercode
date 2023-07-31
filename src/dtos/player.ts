    export interface Player {
    id: string;
    rank: number; 
    name: string;
    score: number; 
    team: string;
    }

// Sample data for testing
export const players: Player[] = [
  { id: "1", rank: 1, name: "Player 1", score: 100, team: "Team A" },
  { id: "2", rank: 2, name: "Player 2", score: 90, team: "Team B" },
  { id: "3", rank: 3, name: "Player 3", score: 80, team: "Team A" },
];
