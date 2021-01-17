import { createSelector } from 'reselect';

// user
export const getUser = (state) => state.auth.user;
export const getIsAuthenticated = (state) => state.auth.isAuthenticated;
export const getUserLoading = (state) => state.auth.isLoading;

// signup
export const getSigningUpLoading = (state) => state.auth.isLoading;

// login
export const getLoggingInLoading = (state) => state.auth.isLoading;

// error
export const getError = (state) => state.error.error;
export const getErrorId = (state) => state.error.id;
