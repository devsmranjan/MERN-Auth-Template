import { GET_ERRORS, CLEAR_ERRORS } from './types';

export const returnErrors = (error, id) => ({
    type: GET_ERRORS,
    payload: {
        error,
        id,
    },
});

export const clearErrors = () => ({
    type: CLEAR_ERRORS,
});
