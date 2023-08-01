import { Request, Response } from "express";
import { AuthService } from "./auth";



const mockRes = {} as Response;

// Mock Express Response functions
mockRes.status = jest.fn().mockReturnValue(mockRes);
mockRes.json = jest.fn().mockReturnValue(mockRes);

describe("AuthService", () => {
  let authService: AuthService;

  beforeAll(() => {
    authService = new AuthService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createJwtToken", () => {
    it("should create a JWT token", () => {
      const userId = 1;
      const token = authService.createJwtToken(userId);
      expect(typeof token).toBe("string");
    });
  });

  describe("getRandomScore", () => {
    it("should generate a random score", () => {
      const score = authService.getRandomScore();
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(1000);
    });
  });
});
