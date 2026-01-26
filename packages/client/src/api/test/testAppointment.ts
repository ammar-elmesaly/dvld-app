import { baseUrl } from "../urls";
import { apiFetch } from "../apiFetch";

export async function getAllTestAppointments(ldlaId: number) {
    const res = await apiFetch(`${baseUrl}/testAppointment/${ldlaId}/all`);

    return res.json();
}