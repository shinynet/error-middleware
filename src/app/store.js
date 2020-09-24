import {configureStore} from '@reduxjs/toolkit'
import {api} from './middleware'
import snack from './snackSlice'
import register from '../features/register/registerSlice'

export default configureStore({
	// register our custom middleware
	middleware: mw => mw().concat(api),
	reducer: {
		register,
		snack,
	}
})
