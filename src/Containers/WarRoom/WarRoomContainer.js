import { connect } from 'react-redux'
import WarRoom from './WarRoom'
import { opponentName } from '../../actions'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
      handleOpponentName: (input) => {
      dispatch(opponentName(input))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WarRoom)
