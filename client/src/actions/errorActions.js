import { GET_ERRORS, CLEAR_ERRORS } from './types';

// return errors
export const returnErrors = (success, message, error = null, id = null) => {
    return {
        type: GET_ERRORS,
        payload: {
            success,
            message,
            error,
            id,
        },
    };
};

// clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    };
};
