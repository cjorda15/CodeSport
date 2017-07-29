import { connect } from 'react-redux'
import CreateChallenge from './CreateChallenge'

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, null)(CreateChallenge)
