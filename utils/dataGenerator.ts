import { faker, Faker } from "@faker-js/faker";
import { User } from "../types/User";
export function generateUser():User {
return{
    firstName : faker.person.firstName(),
    lastName : faker.person.lastName(),
    email : faker.internet.email()
}
}