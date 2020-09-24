import { createSlice } from '@reduxjs/toolkit';

const initialState = {}
const reducers = {}

const registerSlice = createSlice({
	name: 'register',
	initialState,
	reducers,
});

export const register = (email, password) => dispatch => {

	// Notice we're not talking directly to axios (the middleware
	// does that for us) because middleware can only intercept
	// store dispatches. So instead, we dispatch an action (so a
	// middleware can intercept it) and provide all the data axios
	// needs inside the middleware.
	const result = dispatch({
		data: {email, password},
		// If we want to use this action for making other endpoint
		// requests, but ones in which we don't want to set a snack
		// message for, we can turn off setSnack (defaults to true).
		// The middleware will take this into account.
		// setSnack: false

		// No reducer exists for handling an action type of api. We
		// don't need one. The result (or error) will come back here
		// for processing (at which point we'd probably dispatch a
		// new action for recording the result to redux state). But,
		// we still have to give all action objects a type (redux
		// requires it) and the middleware can use it to determine
		// which actions it cares about.
		type: 'api',
		url: 'register',
		method: 'post',
	})

	// The middleware returns the promise allowing us to do some
	// additional processing on the result (or error) if desired.
	result
		.then(() => {
			// We handle the success message here (instead of in the
			// middleware) because, unlike the error message, the success
			// message doesn't exist in the api result. However, we could
			// pass the desired success message to the middleware (via the
			// action object above) if we want the middleware to also be
			// responsible for recording success messages in addition to
			// errors.
			dispatch({
				type: 'snack/setMessage',
				payload: {
					message: 'User registered successfully',
					type: 'is-success'
				}
			})
		})
		.catch(error => {
			// debugger
		})

	// Return the promise to the calling code (Register.js)
	// so it can also do some processing with the result/error.
	return result
};

export default registerSlice.reducer;
