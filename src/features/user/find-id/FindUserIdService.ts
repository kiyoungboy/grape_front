import axios from "axios";

const API_URL = 'http://localhost:8181/module/user/'

export interface FindIdRequest {
    email: string;
}

export interface FindIdResponse {
    maskedUserId: string;
    error?: string;
}

export const FindIdApi = {
    async findId(email: string): Promise<FindIdResponse> {
        const response = await axios.post<FindIdResponse & { error?: string }>(
            API_URL + 'find-id',
            { email } as FindIdRequest
        );

        if(response.data.error) {
            throw new Error(response.data.error);
        }

        return { maskedUserId: response.data.maskedUserId };
    }
}