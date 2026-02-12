export interface JwtPayload {
    sub: string; //username
    exp: number;
    iat: number;
    //기타 claim 필요 시 추가
}

export const parseJwtPayload = (token: string): JwtPayload | null => {
    try{
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''));
        return JSON.parse(jsonPayload) as JwtPayload;
    } catch {
        return null;
    }
};

export const isTokenExpired = (token: string): boolean => {
    const payload = parseJwtPayload(token);
    return payload ? Date.now() >= payload.exp * 1000 : true;
};

export const isTokenExpiringSoon = (token: string, minutes = 5): boolean => {
    const payload = parseJwtPayload(token);
    if(!payload) return true;
    const expTime = payload.exp * 1000;
    return Date.now() >= expTime - (minutes * 60 * 1000);
};

export const getUsernameFromToken = (token: string): string | null => {
    const payload = parseJwtPayload(token);
    return payload ?.sub || null;
};