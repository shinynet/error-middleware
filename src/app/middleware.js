import http from '../http'

export const api = store => next => action => {

	// Ignore any actions other than type api
	if (action.type === 'api') {
		const {data, method = 'GET', setSnack = true, url} = action

		// Make the axios call
		return http({data, method, url})
			// If there's no error, forward the request on
			.then(next(action))
			// We only care about errors...
			.catch(error => {

				/* There's two ways we can handle the error. We can either
				1: dispatch a new action, or
				2: change the destination (type) of the current action.

				If dispatching a new action, this new action will be fed
				through all the middlewares (including this one) again
				before arriving at its reducer.

				If changing the destination of the current action, it'll
				continue its path through any middlewares left and to its
				reducer.

				The end result is the same. I prefer the first method (in
				most cases) so middlewares have the chance to inspect actions
				again even when they change.

				However, the second method is very powerful in some situations.
				Being able to intercept an action and re-route it based on
				certain conditions is very cool...
				 */

				// method 1:
				setSnack && store.dispatch({
					type: 'snack/setMessage',
					payload: {
						message: error.response.data.error,
						type: 'is-danger'
					}
				})

				// method 2:
				// setSnack && next({
				// 	type: 'snack/setMessage',
				// 	payload: {
				// 		message: error.response.data.error,
				// 		type: 'is-danger'
				// 	}
				// })

				// As soon as we handle the error, a resolved
				// promise is bubbled up to the calling code
				// (registerSlice). We want to rethrow it so
				// the caller will receive it as rejected in
				// case it cares.
				throw error
			})
	}

	// If it's not an action of type api, don't forget to
	// forward it on
	return next(action)
}