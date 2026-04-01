import { UserDTO } from '@dvld/shared';
import { User } from '../entities/User';

export const toUserDTO = (user: User): UserDTO => {    
    return {
        id: user.id,
        personId: user.person.id,
        personFullName: user.person.full_name,
        username: user.username,
        isActive: user.is_active
    };
};
