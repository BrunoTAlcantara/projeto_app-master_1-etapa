import { Request, Response, NextFunction } from "express";

import { AppError } from "../util/AppError";

// regex utilizado para validar o  tipo email

const emailRegex =
  /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const stringRegex =
  /^[-!#$%&'~^,.:;*+/0-9=?A-Z^_a-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ{|}~]+$/;

function isStringValid(string: string) {
  if (!string) return false;

  if (typeof string !== "string") return false;

  const novaString = string.replace(/ /g, "");

  if (novaString.length < 2) return false;
  const valid = stringRegex.test(novaString);

  if (!valid) return false;

  return true;
}

function isEmailValid(email: string) {
  if (!email) return false;

  if (email.length > 254) return false;

  const valid = emailRegex.test(email);
  if (!valid) return false;

  // Further checking of some things regex can't handle
  const parts = email.split("@");
  if (parts[0].length > 64) return false;

  const domainParts = parts[1].split(".");
  if (
    // eslint-disable-next-line func-names
    domainParts.some(function (part) {
      return part.length > 63;
    })
  )
    return false;

  return true;
}

function validate(shemaDonation: any) {
  const validation = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    const { devices, deviceCount, email } = data;

    // armazena os campos que faltam
    const fields: string[] = [];
    // armazena os types que faltam
    const types: string[] = [];

    // Validação dados de Doação
    Object.keys(shemaDonation).forEach((item) => {
      const itemShema = shemaDonation[item];

      // validando required
      if (itemShema.required && !data[item]) {
        fields.push(item);
      }
      const stringvalid = isStringValid(data[item]);
      // validando Types

      // validando email com regex

      const validEmail = isEmailValid(email);

      if (itemShema.type === "email" && !validEmail && email !== undefined) {
        throw new AppError(
          "Esta no formato incorreto, tente um email valido",
          true
        );
      }
      if (
        itemShema.type === "string" &&
        !stringvalid &&
        data[item] !== undefined
      ) {
        // validando string
        types.push(
          `Campo ${item} esta no formato incorreto ou Vazio! Tente utilizar string. `
        );
      }

      // validando number
      if (
        itemShema.type === "number" &&
        typeof data[item] !== "number" &&
        typeof data[item] !== "undefined"
      ) {
        types.push(
          `Campo ${item} esta no formato incorreto! Tente utilizar number. `
        );
      }
    });
    // retorna todos os campos obrigatórios em uma lista
    if (fields.length > 0) {
      throw new AppError(
        "Todos os campos obrigatórios devem ser informados",
        true,
        fields
      );
    }
    // retorna todos os tipos em uma lista
    if (types.length > 0) {
      throw new AppError("Todos types devem ser corretos", true, types);
    }

    // Device validação
    Object.keys(devices).forEach((device) => {
      const deviceObj = devices[device];

      // validação do type do device
      switch (deviceObj.type) {
        case "notebook":
          break;
        case "netbook":
          break;
        case "desktop":
          break;
        case "screen":
          break;
        case "printer":
          break;
        case "scanner":
          break;
        default:
          throw new AppError(
            `${deviceObj.type} NÃO é valido, tente uma das opções validas`,
            true
          );
      }

      // validação da condition do device
      switch (deviceObj.condition) {
        case "working":
          break;
        case "notWorking":
          break;
        case "broken":
          break;
        default:
          throw new AppError(
            `${deviceObj.condition} NÃO é valido, tente uma das opções validas`,
            true
          );
      }
    });

    if (devices.length === 0) {
      throw new AppError(` O Campo device nao pode ser vazio`, true);
    }

    // validação se o deviceCount é igual a quantidade de devices inseridos
    if (devices.length !== deviceCount) {
      throw new AppError(
        `A quantidade de equipamentos ${deviceCount} não está de acordo com as informações de equipamentos enviados ${devices.length}`,
        true
      );
    }

    return next();
  };

  return validation;
}

export { validate };
