export interface InstagramWebhookPayload {
    object: string;
    entry: Array<{
        id: string;
        time: number;
        messaging?: Array<{
            sender: { id: string };
            recipient: { id: string };
            timestamp: number;
            message: {
                text: string;
                mid?: string;
            };
        }>;
        changes?: Array<{
            field: string;
            value: {
                id: string;
                from: {
                    id: string;
                };
                text: string;
                media: {
                    id: string;
                };
            };
        }>;
    }>;
}
