"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorClass = void 0;
class ErrorClass {
    constructor() {
        this.errorHelper = (error) => {
            let errorMessage = '';
            if (error.name == "CastError") {
                return errorMessage = 'ID CHECK KAR KE BHEJ';
            }
            if (error.code === 11000) {
                return 'id is duplicate, send other id';
            }
            for (const key in error.errors) {
                errorMessage += error.errors[key].message;
                errorMessage += ", ";
            }
            return errorMessage.slice(0, errorMessage.length - 2);
        };
    }
}
exports.ErrorClass = ErrorClass;
// export default ErrorClass
