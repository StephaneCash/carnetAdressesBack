const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });

const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersRouter = require("./routes/userRoutes");
app.use("/api/users", usersRouter);

const categoriesRouter = require("./routes/categorieRouter");
app.use("/api/categories", categoriesRouter);

const entitesRouter = require("./routes/entitesRouter");
app.use("/api/entites", entitesRouter);

const imagesRouter = require("./routes/imagesRouter");
app.use("/api/images", imagesRouter);

app.use("/api/uploads", express.static('./uploads'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Le serveur ecoute sur le port ", PORT);
});
