const API_URL = import.meta.env.VITE_API_BASE_URL;

export const apiFetch = (path: string, options: RequestInit) => {
    return fetch(`${API_URL}${path}`, options);
};