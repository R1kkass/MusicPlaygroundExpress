const MUSIC_ADD = `
    type Music{
        id: ID,
        name: String,
        creator: String,
        userId: ID,
        author: String, 
        hashName: String
    }

    input MusicInput{
        userId: ID,
        name: String,
        author: String
    }  

    type Genre{
        id: ID,
        genre: String
    }

    input GenreInput{
        genre: String
    }
`;

module.exports = { MUSIC_ADD };
