import { http, HttpResponse } from "msw";
import { askAIResponseMock } from "../data/askAIResponse.mock";
import { chatMessagesMock } from "../data/chatMessages.mock";

export const askAIHandlers = [
    http.get("/api/ask-ai/messages", () => {
        return HttpResponse.json(chatMessagesMock);
    }),

    http.post("/api/ask-ai/messages", async ({ request }) => {
        return HttpResponse.json({
            ...askAIResponseMock,
            createdAt: new Date().toISOString()
        });
    })
];