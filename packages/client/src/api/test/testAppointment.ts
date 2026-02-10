import { baseUrl } from "../urls";
import { apiFetch } from "../apiFetch";

export async function getAllTestAppointments(ldlaId: number) {
    const res = await apiFetch(`${baseUrl}/testAppointment/${ldlaId}/all`);

    return res.json();
}

export async function getTrialNumber(ldlaId: number, testTypeId: number) {
    const res = await apiFetch(`${baseUrl}/testAppointment/${ldlaId}/trialNumber?testTypeId=${testTypeId}`);

    return res.json();
}