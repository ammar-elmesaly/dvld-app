import { Person } from "../../types/person"

interface ViewPersonProps {
  person: Person;
}

export function ViewPerson({ person }: ViewPersonProps) {

  console.log(person)
  return <>
    <h1>Viewing Person</h1>
    <p>ID: {person.id}</p>
    <p>Name: {person.name}</p>
    <p>Age: {person.age}</p>
    <p>Gender: {person.gender}</p>
  </>
}

