export const getCsrfToken = (): string | null => {
    const match = document.cookie.match(/(?:^|;\s*)CSRF-TOKEN=([^;]+)/);

    return match ? decodeURIComponent(match[1]) : null;
};