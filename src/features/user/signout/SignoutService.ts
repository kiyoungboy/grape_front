import axios from "axios";

const API_URL = 'http://localhost:8181/module/user/'

export const SignoutApi = {
    async singoutServer(refreshToken: string): Promise<void> {
        try{
            await axios.post(
                API_URL + 'signout',
                {},
                {
                    headers: {
                        'Refresh-Token': refreshToken
                    }
                }
            );
        } catch(error) {
            console.log('서버 로그아웃 실패(이미 삭제가능성)')
        }
    }
};