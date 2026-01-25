export default function UserInfo({ user }) {
  return <>
    <h1>Viewing User</h1>
    <p>ID: {user.id}</p>
    <p>Name: {user.username}</p>
    <p>Email: {user.email}</p>
  </>
}

