import { GET_ERRORS, CLEAR_ERRORS } from '../../_actions/error/types';

const initialState = {
    error: null,
    id: null,
};

export const error = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_ERRORS:
            const { error, id } = payload;
            return {
                ...state,
                error,
                id,
            };

        case CLEAR_ERRORS:
            return initialState;

        default:
            return state;
    }
};
