const ApiError = require("../../../Messager/server/error/ApiError")
const { Music } = require("../models/model")
const jwt = require('jsonwebtoken')
const path = require('path')
const uuid = require('uuid')

class MusicController{
    async addMusic(req, res){
        try{
            const {name, author} = req.body
            
            if(!name || !author || !req.files?.music){
                return res.json({message: false})
            }

            let imgs
            if(req.files?.music){
                imgs = req.files.music
            }
            
            
            if(!Array.isArray(imgs)){
                imgs = [imgs]
             }
             
            const token = req.headers.authorization.split(' ')[1]
            
            const decoded = jwt.verify(token, 'code')
            console.log(req.headers.authorization);
            console.log(imgs);
            if(imgs.length){
                for(let i = 0; i<imgs.length; i++){
                    const a = imgs[i].name.split('.')[1];
                    if(a==="mp3"){
                        const fileName = uuid.v4() + "." + a
                        imgs[i].mv(path.resolve(__dirname, '..','static', fileName))                    
                        const img = await Music.create({name: name, userId: decoded.id, author, hashName: fileName })
                    }
                }
            }
            return res.json({message: true})
        }
        catch(e){
            return ApiError.badRequest(e.message)
        }
    }

    async getAllMusic(req, res){
        try{
            const {name} = req.query
            const music = await Music.findAll({})
            return res.json({music})
        }catch(e){
            return ApiError.badRequest(e.message)
        }
    }
}

module.exports=new MusicController()