import {connect} from 'react-redux'
import {register} from './registerSlice'
import {snackSelector} from '../../app/snackSlice'
import Register from './Register'

/**
 * Nothing interesting here
 */

const mapState = state => ({
	snack: snackSelector(state)
})

const mapDispatch = {
	register
}

export default connect(mapState, mapDispatch)(Register)