import dotenv from "dotenv";

import { app } from "./server";

dotenv.config();

const API_PORT = process.env.PORT || 3333;

app.listen(API_PORT, () =>
  console.log(`Servidor rodando na porta ${API_PORT}`)
);
