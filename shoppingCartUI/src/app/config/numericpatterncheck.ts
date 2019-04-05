export class NumericvalueValidator {
  static numberValidator(number): any {
    if (number.pristine) {
       return null;
    }
    const NUMBER_REGEXP = /^-?[\d.]+(?:e-?\d+)?$/;
    number.markAsTouched();
    if (NUMBER_REGEXP.test(number.value)) {
      return null;
      // if(number.value >0) {
      //   return null;
      // }else{
      //   numberValue: true 
      // }       
    }    
    return {
       invalidNumber: true
    };
 }
}