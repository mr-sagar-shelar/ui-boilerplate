import { AskAIResponse } from "@contracts/ask-ai";

export const askAIResponseMock: AskAIResponse = {
    answer:
        "Based on recent analyst reports, Infosys shows stable long-term growth driven by digital transformation demand.",
    sources: [
        {
            id: "blog-101",
            title: "Infosys Long Term Outlook 2026",
            url: "/blogs/101"
        }
    ]
};