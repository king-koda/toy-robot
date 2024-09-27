import { Reader } from "./Reader";

// readline createInterface mock
const mockReader = {
  question: vi.fn(),
  close: vi.fn(),
};

// readline module mock with createInterface override
vi.mock("readline", async (importOriginal) => ({
  ...(await importOriginal()),
  createInterface: () => mockReader,
}));

// describe("Main Tests", () => {});
