export interface GQApiResponse {
    answer: string;
    sources: {
        id: string;
        title: string;
        url: string;
    }[];
}