import axios from "axios";

const API_URL = 'http://localhost:8181/module/user/'

export const SignoutApi = {
    async signoutToServer(refreshToken: string): Promise<{ message: string }> {
        const response = await axios.post< { message?: string; error?: string }>(
            API_URL + 'signout',
            {},
            {
                headers: {
                    'Refresh-Token': refreshToken
                }
            }
        );

        if(response.data.error){
            throw new Error(response.data.error);
        }

        return { message: response.data.message || 'success' };
    }
};