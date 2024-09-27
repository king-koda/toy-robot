export const getErrorMessage = (error: unknown) => (error as Error).message;
