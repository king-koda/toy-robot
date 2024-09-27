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

describe("Reader Tests", () => {
  describe("when using the Reader class", () => {
    describe("when calling the askQuestion method", () => {
      it("should execute the 'question' method on the readline interface using the string provided", async () => {
        // instantiate a new Reader instance
        const reader = new Reader();

        const mockQuestion = "Where should we go?";
        const mockAnswer = "Anywhere";

        // mock the question method implementation to return the mockAnswer in a callback
        mockReader.question.mockImplementation((question, callback) => {
          callback(mockAnswer);
        });

        // call the askQuestion method on the Reader instance
        const answer = await reader.askQuestion(mockQuestion);

        // check that the response is the correct answer
        expect(answer).toBe(mockAnswer);

        // check that the question method was called using the parameters we provided askQuestion
        expect(mockReader.question).toHaveBeenCalledWith(
          mockQuestion,
          expect.any(Function)
        );

        // Close the reader
        reader.closeReader();
      });
    });

    describe("when calling the closeReader method", () => {
      let testReader: Reader;

      beforeAll(() => {
        testReader = new Reader();
      });

      it("should close the created readline interface using the interfaces's close method", async () => {
        testReader.closeReader();

        // check that the interfaces close method was called
        expect(mockReader.close).toHaveBeenCalled();
      });
    });
  });
});
