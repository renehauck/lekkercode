export interface User {
  id: number;
  username: string;
  password: string;
  score: number;
}


export const users: User[] = [
  { id: 1, username: "user1", password: "pass1", score: 100 },
  { id: 2, username: "user2", password: "pass2", score: 150 },
];