import { history } from "../helpers/history";

export async function apiFetch(input: RequestInfo, init?: RequestInit) {
    const res = await fetch(input, { ...init, credentials: 'include' });

    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        
        if (res.status === 401) {
            history.push('/login');
            
        } else {
            alert(data.msg || 'Something went wrong');
        }

        throw new Error(data.msg);
    }

    return res;
}
