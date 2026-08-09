export const isDemoMode = (): boolean => {
    return process.env.DEMO_MODE === 'true';
}

export const getAiProvider = (): 'openai' | 'gemini' => {
    if (process.env.AI_PROVIDER === 'openai' || process.env.AI_PROVIDER === 'gemini') {
        return process.env.AI_PROVIDER;
    }
    return isDemoMode() ? 'gemini' : 'openai';
}
