import { server } from "@mocks/server";

export async function setupMocks() {
    server.listen();
}

export async function teardownMocks() {
    server.close();
}