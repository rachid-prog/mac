const multer = require("multer")
const uuid = require("uuid")
const path = require("path")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname) //recuprer l'extension du fichier envoyer par le client
        req.body.image= `Produit-${uuid.v4()}-${Date.now()}${extension}` //nom image produit unique
      
        cb(null, req.body.image)
    },

})


const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        console.log(file)
        cb(new Error("Format de fichier invalide"))
    }
}






module.exports = multer({ storage, fileFilter }).single("image") // "image" est le nom du champ dans le formulaire


