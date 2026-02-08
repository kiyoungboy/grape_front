import apiClient from "../../../services/axiosConfig";

const API_URL = 'api/user/'

export interface FindIdRequest {
    email: string;
}

export interface FindIdResponse {
    maskedUserId: string;
    error?: string;
}

export const FindIdApi = {
    async findId(email: string): Promise<FindIdResponse> {
        const response = await apiClient.post<FindIdResponse & { error?: string }>(
            API_URL + 'find-id',
            { email } as FindIdRequest
        );

        if(response.data.error) {
            throw new Error(response.data.error);
        }

        return { maskedUserId: response.data.maskedUserId };
    }
}