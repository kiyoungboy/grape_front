import axios from "axios";
import { ApiError } from "./ApiError";
import { ErrorCode } from "./ErrorCode";

export function handleApiError(error: unknown): never {
    if( axios.isAxiosError(error)) {
        const status = error.response?.status;

        switch(status){
            case 401:
                throw new ApiError(
                    "인증이 만료되었습니다.",
                    ErrorCode.EXPIRED_TOKEN,
                    401
                );

            case 403:
                throw new ApiError(
                    "권한이 없습니다.",
                    ErrorCode.ACCESS_DENIDE,
                    403
                );
            
            case 500:
                throw new ApiError(
                    "서버 오류가 발생했습니다. 잠시후에 다시 시도해 주세요.",
                    ErrorCode.UNKNOWN_ERROR,
                    500
                );

            default:
                throw new ApiError(
                    error.message,
                    ErrorCode.UNKNOWN_ERROR,
                    status
                );
        }
    }

    throw new ApiError(
        "네트워크 오류가 발생했습니다.",
        ErrorCode.NETWORK_ERROR
    );
}