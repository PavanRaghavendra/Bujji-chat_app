
import { User } from "../models/users.js";
import {faker, simpleFaker} from '@faker-js/faker';
const createuser=async(numUsers)=>
{
    try {
        const userPromises=[];
        for(let i=0;i<numUsers;i++)
        {
            const tempuser=User.create(
                {
                    name:faker.person.fullName(),
                    username:faker.internet.userName(),
                    password:faker.internet.password()
                }
            )
            userPromises.push(tempuser);
        }
        await Promise.all(userPromises);
        console.log("new users are created");
        process.exit(1);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export {createuser};