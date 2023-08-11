import { faker } from '@faker-js/faker'

export const req = {
  body: {
    name: faker.person.fullName(),
    gender: faker.person.sexType(),
    born: faker.date.birthdate(),
    address: faker.location.city(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}