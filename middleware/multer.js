const multer = require("multer")
const uuid = require("uuid")
const path = require("path")

// Configuration du stockage des fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        // Dossier de destination pour les fichiers uploadés
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {

        //recuprer l'extension du fichier envoyer par le client
        const extension = path.extname(file.originalname)

        //Générer un nom de fichier unique : Produit-UUID-Date.ext
        req.body.image= `Produit-${uuid.v4()}-${Date.now()}${extension}` 
      
        cb(null, req.body.image)
    },

})


/// Filtrage des fichiers (seulement les images autorisées)
const fileFilter = (req, file, cb) => {

    // Vérifie que le type MIME commence par "image/"
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        console.log(file)
        cb(new Error("Format de fichier invalide"))
    }
}

// Limites à 2Mo
const limits = {
  fileSize: 2 * 1024 * 1024
};



// Création du middleware Multer avec configuration
module.exports = multer({ storage, fileFilter , limits}).single("image")


