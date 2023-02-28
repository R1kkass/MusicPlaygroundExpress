const LOGIN_GQL = `
type User{
    id: ID,
    password: String,
    email: String,
    user: String,
    message: String
}

type UserToken{
    id: ID,
    message: String,
    token: String
}

input UserInput{
    id: ID,
    password: String,
    email: String,
    user: String
}

type Mutation{
    getOneUser(input: UserInput): UserToken
    addUser(input: UserInput): UserToken
}
`

module.exports=LOGIN_GQL