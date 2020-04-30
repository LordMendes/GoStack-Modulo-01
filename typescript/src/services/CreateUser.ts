/**
 * name
 * email
 * password
 */

 interface TechObject{
   title: string;
   experience: number;
 }

interface CreateUserData{
  name?: string;
  email: string;
  password: string;
  techs: string[];
}

export default function createUser({ name, email, password } : CreateUserData){
  const user ={
    name,
    email,
    password,
  }

  return user;
}