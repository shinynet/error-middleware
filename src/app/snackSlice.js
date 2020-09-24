import {createSelector, createSlice} from '@reduxjs/toolkit'

/**
 * A dedicated slice for holding the current snackbar message.
 * Not just errors, but success, warnings, and info messages.
 */

// Traditionally, I've always held snackbar messages as an array
// of message objects. The result of closing a snack removes it
// from the array. But this is simplified for demonstration purposes.
const initialState = {
	message: '',
	type: ''
}

const reducers = {
	setMessage: (state, {payload}) => {
		const {message, type = 'is-success'} = payload
		state.message = message
		state.type = type
	}
}

const snackSlice = createSlice({
	name: 'snack',
	initialState,
	reducers,
});

export const { setError } = snackSlice.actions;

export const snackSelector = createSelector(
	state => state.snack.message,
	state => state.snack.type,
	(message, type) => ({message, type})
)

export default snackSlice.reducer;
