const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  user: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  role: { type: DataTypes.STRING },
});

const Music = sequelize.define("Music", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING },
  userId: { type: DataTypes.INTEGER },
  author: { type: DataTypes.STRING },
  hashName: { type: DataTypes.STRING },
  album: { type: DataTypes.STRING },
  genreId: { type: DataTypes.INTEGER },
});

const Genre = sequelize.define("Genge", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  genre: { type: DataTypes.STRING, unique: true },
});

const MusicAdded = sequelize.define("MusicAdded", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING },
  userId: { type: DataTypes.INTEGER },
  musicId: { type: DataTypes.INTEGER },
});

Music.hasMany(User);
User.belongsTo(Music);

Music.hasMany(Genre);
Genre.belongsTo(Music);

Music.hasMany(MusicAdded);
MusicAdded.belongsTo(Music);

module.exports = {
  User,
  Music,
  MusicAdded,
  Genre,
};
