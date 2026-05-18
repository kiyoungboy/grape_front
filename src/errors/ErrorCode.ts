export const ErrorCode = {
    INVALID_TOKEN: "INVALID_TOKEN",
    EXPIRED_TOKEN: "EXPIRED_TOKEN",
    ACCESS_DENIDE: "ACCESS_DENIED",
    NETWORK_ERROR: "NETWORK_ERROR",
    UNKNOWN_ERROR: "UNKNOWN_EEROR",
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];