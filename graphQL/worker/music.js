const { Music, Genre } = require("../../models/model");

const music = {
  addMusic: async ({ input }) => {
    let imgs;
    if (req.files?.imgs) {
      imgs = req.files.imgs;
    }

    if (!Array.isArray(imgs)) {
      imgs = [imgs];
    }
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "code");
    console.log(imgs);
    if (imgs.length) {
      for (let i = 0; i < imgs.length; i++) {
        const a = imgs[i].name.split(".")[1];
        const fileName = uuid.v4() + "." + a;
        imgs[i].mv(path.resolve(__dirname, "..", "static", fileName));

        const img = await Music.create({
          name: input.name,
          userId: input.userId,
        });
      }
    }

    return res.json({ message: imgs });
  },

  addGenre: async ({ input }) => {
    const genre = await Genre.create({ genre: input?.genre || "" });
    return genre;
  },

  getAllMusic: async ({ input }) => {
    const music = await Music.findAll({
      where: { [Op.or]: [{ name: input.name }, { author: input.name }] },
    });
    return music;
  },
  getAllGenre: async () => {
    const genre = await Genre.findAll({});
    return genre;
  },
};

module.exports = music;
