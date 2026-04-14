import apiClient from "../../../services/axiosConfig";
import type{ SocialLoginRequest, SocialLoginResponse } from "../types/social";

export const SocialService = {
    login: async (payload: SocialLoginRequest): Promise<SocialLoginResponse> => {
        const { provider, code, state } = payload;

        const response = await apiClient.post<SocialLoginResponse>(
            `/social/${provider}/login`,
            { code, state },
            { withCredentials: true }
        );
        return response.data;
    }
}