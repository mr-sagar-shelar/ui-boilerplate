import { setupMocks } from "./fixtures/msw";

export default async () => {
    if (process.env.VITE_USE_MOCK_API !== "false") {
        await setupMocks();
    }
};