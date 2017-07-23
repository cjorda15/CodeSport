import { connect } from 'react-redux'
import { login } from '../../actions'
import Home from './Home'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (input) =>{
    dispatch(login(input))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
