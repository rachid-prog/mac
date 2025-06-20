
# API construite avec `Node.js`, `Express` et `MongoDB` pour gérer les utilisateurs, rôles, produits, menus et commandes d'une application.

##  ⚙️Fonctionnalités

-  **🔒 Authentification** `JWT``
- **hachage de mot de passe** `bcrypt`
- **👤Gestion des rôles** : [`admin`, `preparateur`, `accueil`] 
  
- **🔐Contrôle d’accès** via middleware personnalisé
- **🛡️ Sécurisation des endpoints** : [`helmet`, `express-rate-limit`,  `cors`]

- **🧪 Tests automatisés** avec : [`Mocha`,  `Chai`,  `Supertest`,`mongodb-memory-server`]


- **👮‍♂️ Accès par rôle**
---------------------------------------- 
| Ressource          | Rôle autorisé   |
|--------------------|-----------------|
| Création produits  | `admin`         |
| Création menus     | `admin`         |
| Création commandes | `accueil, admin`|
| modification rôle  | `admin`         |
------------------------------------- -  
                        
                        
##  Installation

```bash 
git clone <URL_DU_REPO>
cd mac
npm install

##  Démarrage
npm run dev  -- en mode dévellopement
npm start    -- en mode production

##tests
npm test "chemin du dossier test"
