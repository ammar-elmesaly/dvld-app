import { UserDTO } from "@dvld/shared/src/dtos/user.dto";

interface UserInfoProps {
  user: UserDTO;
}

export default function UserInfo({ user }: UserInfoProps) {
  return <>
    <h1>Viewing User</h1>
    <p>ID: {user.id}</p>
    <p>Name: {user.username}</p>
  </>
}

