import AppBar from "./index";
import { render } from "@testing-library/react";

/**
 * Tests for AppBar Component
 */
describe("Testing AppBar", () => {
    it("Should compile at runtime", () => expect(<AppBar />).toBeDefined());
});