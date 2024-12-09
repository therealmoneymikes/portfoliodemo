// import { faker } from "@faker-js/faker";
// import prisma from "@/app/utils/prismaClient";
// export function createRandomUser() {
//   return {
//     userId: faker.string.uuid(),
//     username: faker.internet.userName(),
//     email: faker.internet.email(),
//     avatar: faker.image.avatar(),
//     password: faker.internet.password(),
//     birthdate: faker.date.birthdate(),
//     registeredAt: faker.date.past(),
//   };
// }

// export const users = faker.helpers.multiple(createRandomUser, {
//   count: 5,
// });

// async function createUserWithProfile() {
//   //Method 1 create a
//   const user = await prisma.user.create({
//     data: {},
//   });
//   //Then create a profile
//   const profile = await prisma.profile.create({
//     data: {
//       name: faker.person.firstName(),
//       userId: user.id,
//     },
//   });

//   //Method 2 create user with a profile
// }
