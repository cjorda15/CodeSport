import { connect } from 'react-redux'
import Destiny from './Destiny'
import { logout } from '../../actions'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogOut: ()=>{
      dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Destiny)
