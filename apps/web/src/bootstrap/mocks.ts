import { USE_MOCK_API } from "@config/env";

export async function initMocks() {
    if (!USE_MOCK_API) return;

    const { worker } = await import("@mocks/browser");
    await worker.start({
        onUnhandledRequest: "bypass"
    });
}
