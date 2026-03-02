import DOMPurify from 'dompurify';

/**
 * XSS 공격 방어를 위한 입력값 sanitize 유틸리티
 * 사용자 입력값을 화면에 표시하기 전 반드시 사용해야 합니다.
 */

/**
 * HTML 태그를 포함한 문자열을 안전하게 정제
 * @param dirty - 정제할 문자열 (사용자 입력값)
 * @returns 안전하게 정제된 HTML 문자열
 *
 * @example
 * const userInput = '<script>alert("XSS")</script>Hello';
 * const clean = sanitizeHtml(userInput); // "Hello"
 */
export const sanitizeHtml = (dirty: string): string => {
    return DOMPurify.sanitize(dirty, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
        ALLOWED_ATTR: ['href', 'target']
    });
};

/**
 * 모든 HTML 태그를 제거하고 순수 텍스트만 반환
 * @param dirty - 정제할 문자열
 * @returns HTML 태그가 제거된 순수 텍스트
 *
 * @example
 * const userInput = '<script>alert("XSS")</script>Hello';
 * const clean = sanitizeText(userInput); // "Hello"
 */
export const sanitizeText = (dirty: string): string => {
    return DOMPurify.sanitize(dirty, {
        ALLOWED_TAGS: [],
        ALLOWED_ATTR: []
    });
};

/**
 * URL을 안전하게 정제 (javascript:, data: 등 위험한 프로토콜 제거)
 * @param url - 정제할 URL 문자열
 * @returns 안전한 URL 또는 빈 문자열
 *
 * @example
 * sanitizeUrl('javascript:alert("XSS")'); // ""
 * sanitizeUrl('https://example.com'); // "https://example.com"
 */
export const sanitizeUrl = (url: string): string => {
    const cleanUrl = DOMPurify.sanitize(url, { ALLOWED_TAGS: [] });

    // 안전한 프로토콜만 허용
    const allowedProtocols = ['http:', 'https:', 'mailto:'];
    try {
        const urlObj = new URL(cleanUrl, window.location.origin);
        if (allowedProtocols.includes(urlObj.protocol)) {
            return cleanUrl;
        }
    } catch {
        // URL 파싱 실패 시 상대 경로일 수 있음
        if (cleanUrl.startsWith('/') || cleanUrl.startsWith('.')) {
            return cleanUrl;
        }
    }

    return '';
};

/**
 * JSON 문자열을 안전하게 파싱
 * @param jsonString - JSON 문자열
 * @returns 파싱된 객체 또는 null
 */
export const sanitizeJson = <T = any>(jsonString: string): T | null => {
    try {
        // JSON.parse는 XSS 안전하지만, 파싱 후 값도 sanitize 필요
        const parsed = JSON.parse(jsonString);
        return parsed;
    } catch {
        return null;
    }
};

/**
 * 객체의 모든 문자열 값을 재귀적으로 sanitize
 * @param obj - Sanitize할 객체
 * @returns Sanitize된 객체
 */
export const sanitizeObject = <T>(obj: T): T => {
    if (obj === null || obj === undefined) return obj;

    // 문자열이면 sanitize
    if (typeof obj === 'string') {
        return sanitizeText(obj) as unknown as T;
    }

    // 배열이면 각 요소 sanitize
    if (Array.isArray(obj)) {
        return obj.map(item => sanitizeObject(item)) as unknown as T;
    }

    // 일반 객체일 때만 재귀
    if (typeof obj === 'object') {
        const sanitized: Record<string, any> = {};

        for (const key in obj as Record<string, any>) {
            sanitized[key] = sanitizeObject((obj as Record<string, any>)[key]);
        }

        return sanitized as T;
    }

    // number, boolean 등은 그대로 반환
    return obj;
};
