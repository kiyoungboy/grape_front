import axios from "axios";

const API_URL = 'http://localhost:8181/module/user/'

export interface ProfileResponse {
    userId: string;
    userNickname: string;
    userEmail: string;
    signupDt: string;
    signinAuth: string;
}

export interface UpdateProfileRequest {
    userNickname?: string;
}

export const ProfileApi = {
    async getProfile(): Promise<ProfileResponse> {
        const response = await axios.get<ProfileResponse>(API_URL + 'profile', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN_KEY')}`
            }
        });
        return response.data;
    },

    async updateProfile(data: UpdateProfileRequest): Promise<{ message: string }> {
        const response = await axios.put<{ message?: string; error?: string }>(
            API_URL + 'profile',
            data,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN_KEY')}`
                }
            }
        );

        if(response.data.error){
            throw new Error(response.data.error);
        }
        
        return { message: response.data.message || 'success'};
    }
};