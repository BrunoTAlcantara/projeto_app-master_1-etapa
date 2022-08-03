import { Request, Response, NextFunction } from 'express'
import { AppError } from '../util/AppError'

 // regex utilizado para validar o  tipo email
  const validationRegex : any = {
    email: {
      regex: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
    }
  }


function validate (shemaDonation: any) {

  const validation = (req: Request, res: Response, next: NextFunction) => {

    const data = req.body;

    const { devices, deviceCount } = data;

    //armazena os campos que faltam
    const fields: string[] = [];
    //armazena os types que faltam
    const types: string[] = [];
    
  //Validação dados de Doação
  Object.keys(shemaDonation).forEach(item => {
    console.log ( shemaDonation)
      const itemShema = shemaDonation[item];

       //validando required
      if(itemShema.required && !data[item]) {
        fields.push(item);
      };

      //validando Types

        //validando email com regex
        const regexItems = validationRegex[item]

        if(regexItems&& (!new RegExp(regexItems.regex).test(data[item]))){
          throw new AppError("Campo email esta no formato incorreto! Tente utilizar email@email.com", true) 
        }

        //validando string
        if(itemShema.type === "string" && typeof(data[item]) !== "string" && typeof(data[item]) !== "undefined" ) {
          types.push(`Campo ${item} esta no formato incorreto! Tente utilizar string. `);
        }

        //validando number
        if(itemShema.type === "number" && typeof(data[item]) !== "number" && typeof(data[item]) !== "undefined") {
          types.push(`Campo ${item} esta no formato incorreto! Tente utilizar number. `);
        }
     })
        //retorna todos os campos obrigatórios em uma lista
        if (fields.length > 0){
          throw new AppError("Todos os campos obrigatórios devem ser informados", true, fields);
        }
        //retorna todos os tipos em uma lista
        if ( types.length > 0){
        
          throw new AppError("Todos types devem ser corretos", true, types);
          
        }

  // Device validação
  Object.keys(devices).forEach(device =>{



   

      const deviceObj = devices[device]

      // validação do type do device
        switch(deviceObj.type) {
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
            throw new AppError(`${deviceObj.type} NÃO é valido, tente uma das opções validas`, true);  
          }

      // validação da condition do device
          switch(deviceObj.condition) {
            case "working":
              break;
            case "notWorking":
              break;
            case "broken":
              break;
            default:
              throw new AppError(`${deviceObj.condition} NÃO é valido, tente uma das opções validas`, true);  
          }

    })

    if (  devices.length === 0 )
    {
      throw new AppError(` O Campo device nao pode ser vazio`, true);  
    }

    // validação se o deviceCount é igual a quantidade de devices inseridos
    if(  devices.length !== deviceCount)
    {
       throw new AppError(`A quantidade de equipamentos ${deviceCount} não está de acordo com as informações de equipamentos enviados ${devices.length}`, true);  
    }
    


    return next()

  }
  
  return validation

  
}

export {validate}