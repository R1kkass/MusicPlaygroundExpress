const ApiError = require("../../../Messager/server/error/ApiError");
const { Music, Genre, Album, MusicAdded } = require("../models/model");
const jwt = require("jsonwebtoken");
const path = require("path");
const uuid = require("uuid");
const { Op } = require("sequelize");

class MusicController {
    async addAlbum(album) {
        try {
            console.log(album);

            if (album) {
                const albumAdd = await Album.create({ name: album });
                console.log(albumAdd);
                return albumAdd;
            }
            return 0;
        } catch (e) {
            return ApiError.badRequest({ message: e });
        }
    }

    async addMusic(req, res) {
        try {
            const { name, author, genre, album } = req.body;

            if (!name || !author || !req.files?.music ||  !genre) {
                return res.json({ message: false });
            }

            const genres = await Genre.findOne({ where: { genre: genre } });

            let imgs;
            if (req.files?.music) {
                imgs = req.files.music;
            }

            if (!Array.isArray(imgs)) {
                imgs = [imgs];
            }

            const token = req.headers.authorization.split(" ")[1];
            const fileNameImg = uuid.v4() + "." + 'jpg';
            req.files?.img.mv(path.resolve(__dirname, "..", "static", 'img', fileNameImg))

            const decoded = jwt.verify(token, "code");
            if (album) {
                console.log(name, author[0], genre, album, decoded);

                const albumAdd = await Album.create({ name: album, author: decoded.user, img: fileNameImg });

                for (let i = 0; i < imgs.length; i++) {
                    const a = imgs[i].name.split(".")[1];

                    if (a === "mp3") {
                        const fileName = uuid.v4() + "." + a;

                        imgs[i].mv(
                            path.resolve(__dirname, "..", "static", fileName)
                        );

                        const img = await Music.create({
                            name: name[i],
                            userId: decoded.id,
                            author: author[i],
                            hashName: fileName,
                            genreId: genres.id,
                            album: albumAdd.id,
                        });
                        console.log(imgs.length);
                    }
                    console.log("imgs[0]");
                }
            }

            if (imgs.length && !album) {
                console.log("alb2");

                for (let i = 0; i < imgs.length; i++) {
                    const a = imgs[i].name.split(".")[1];
                    if (a === "mp3") {
                        const fileName = uuid.v4() + "." + a;
                        imgs[i].mv(
                            path.resolve(__dirname, "..", "static", fileName)
                        );
                        const img = await Music.create({
                            name: name,
                            userId: decoded.id,
                            author,
                            hashName: fileName,
                            genreId: genres.id,
                        });
                    }
                }
            }
            return res.json({ message: true });
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async getAllMusic(req, res) {
        try {
            let music;
            const { name = "", limit = 10 } = req.query;
            if (!name) {
                music = await Music.findAndCountAll({ limit });
            } else {
                music = await Music.findAndCountAll({
                    where: {
                        [Op.or]: [
                            { name: { [Op.like]: "%" + name + "%" } },
                            { author: { [Op.like]: "%" + name + "%" } },
                        ],
                    },
                });
            }
            return res.json({ music });
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async addMusicUser(req, res) {
        try {
            const { userId, musicId } = req.body;
            let mus = await MusicAdded.create({
                UserId: userId,
                MusicId: musicId,
            });

            return res.json({ message: 'Успех' });
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async getMusicUser(req, res) {
        try {
            const { userId } = req.query;
            let mus = await MusicAdded.findAndCountAll({
                where: { UserId: userId },
                include: Music
            });
            return res.json(mus);
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }
}

module.exports = new MusicController();