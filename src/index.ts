  import {app} from "./server";
  
  import dotenv from "dotenv";

  dotenv.config();

  const API_PORT = process.env.PORT || 3333;

  app.listen(API_PORT, ()=> console.log(`Servidor rodando na porta ${API_PORT}`));