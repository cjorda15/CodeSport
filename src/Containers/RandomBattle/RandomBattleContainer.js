import { connect } from 'react-redux'
import RandomBattle from './RandomBattle'

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, null)(RandomBattle)