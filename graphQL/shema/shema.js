const { buildSchema } = require('graphql')
const { MUSIC_ADD } = require('./music')

const schema = buildSchema(
    `
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
    
    type Query{
        getOneUser(input: UserInput): UserToken,
        takeUserMusic(input: MusicInput): Music,
        getAllMusic(input: MusicInput): [Music],
        getAllGenre: [Genre],
    }
    
    ${MUSIC_ADD}

    type Mutation{
        addUser(input: UserInput): UserToken,
        getOneUser(input: UserInput): UserToken,
        addMusic(input: MusicInput): Music,
        addGenre(input: GenreInput): Genre
    }

    `
)

module.exports=schema






