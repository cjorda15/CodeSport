import { connect } from 'react-redux'
import BattleMode from './BattleMode'
import { clearOpponent } from '../../actions'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClearOpponent: (input)=>{
      dispatch(clearOpponent(input))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BattleMode)
