import apiClient from "../../../services/axiosConfig";

const API_URL = 'api/user/'

export const SignoutApi = {
    async signoutToServer(): Promise<{ message: string }> {
        const response = await apiClient.post< { message?: string; error?: string }>(
            API_URL + 'signout'
        );

        if(response.data.error){
            throw new Error(response.data.error);
        }

        return { message: response.data.message || 'success' };
    }
};