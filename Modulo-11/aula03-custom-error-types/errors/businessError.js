import BaseError from './base/baseError.js';

export default class BusinessError extends BaseError {
  constructor(errorMassage) {
    super({
      message: errorMassage,
      name: 'BusinessError',
    });
  }
}
