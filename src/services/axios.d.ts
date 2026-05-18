import "axios";

declare module 'axios' {

    export interface AxiosReqeustConfig {
        _retry?: boolean;
    }
}