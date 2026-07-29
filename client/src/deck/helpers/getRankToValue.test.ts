import { describe, it, expect } from "vitest";
import { getRankToValue } from "./getRankToValue";
import type { Rank } from "~/deck/interfaces/card.interface";

describe("getRankToValue", () => {
    it("should return 13 for K", () => {
        expect(getRankToValue("K" as Rank)).toBe(13);
    });

    it("should return 1 for A", () => {
        expect(getRankToValue("A" as Rank)).toBe(1);
    });

    it("should return 10 for 10", () => {
        expect(getRankToValue("10" as Rank)).toBe(10);
    });
});
