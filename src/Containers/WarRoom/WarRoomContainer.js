import { connect } from 'react-redux'
import WarRoom from './WarRoom'
import { opponentName, acceptRequest, getChallenge } from '../../actions'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
      handleOpponentName: (input) => {
      dispatch(opponentName(input))
    },
      handleAcceptRequest: () => {
        dispatch(acceptRequest())
      },
     handleGetChallenge: (input) => {
       dispatch(getChallenge(input))
     }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WarRoom)
