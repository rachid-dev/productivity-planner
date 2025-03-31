export interface User{
    id : string,
    name : string,
    email : string
}

export type Visitor = Pick<User, 'name'|'email'> & {password : string}