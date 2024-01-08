export class DomainError extends Error {
    cause?: any;
    constructor(message: string, cause?: any) {
      super(message);
  
      this.name = this.constructor.name;
      this.cause = cause;
    }
  }