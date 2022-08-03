export class AppError {

  public readonly errorMessage: string;

  public readonly requiredFields ?: string[];
 
  public readonly error: boolean;
  

  constructor(errorMessage: string , error: true, requiredFields?:string[] ) {
    this.error = error;
    this.requiredFields = requiredFields;
    this.errorMessage= errorMessage;
    
    
    
  }
}
