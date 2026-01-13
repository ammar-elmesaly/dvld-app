// import { baseUrl } from "../baseUrl";

export async function getAllUsers() {
    // const res = await fetch(`${baseUrl}/user/all`);
    
    // if (!res.ok)
    //     throw new Error("Sad :(");

    // return res.json();

    return Promise.resolve(() => { 
        return [
            {
                id: 10,
                username: 'Ammar',
                password: 'asdasdas',
                email: 'ammar@hmail.com',
                is_active: true
            }
        ]
    });
}