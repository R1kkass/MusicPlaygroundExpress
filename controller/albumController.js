const ApiError = require("../../../Messager/server/error/ApiError");
const { Album, Music } = require("../models/model");

class MusicController {
    async getOne(req, res) {
        try {
            const { id } = req.query;
            const album = await Album.findOne({
                where: { id: id }
            });
            const music = await Music.findAll({where: {album: id}})
            return res.json({ album, music });
        } catch (e) {
            return ApiError.badRequest({ message: e });
        }
    }

    async getAll(req, res){
      try{
        const {query, limit = 10} = req.query
        let album
        if(query){
          album = await Album.findAll({where: {name: query || ''}, limit})
        }else{
          album = await Album.findAll({limit})
        }
        return res.json({album})
      }catch(e){
        return ApiError.badRequest({ message: e });
      }
    }
}

module.exports = new MusicController();
