import React from 'react'

const NewTest = (props) => {
  return (
    <code>
      <h6> test {props.testNumber + 1} code</h6>
      <textarea
        className="code-test"
        type="text"
        value={props.testValue}
        placeholder={`type in your test ${props.testNumber+1}`}
        onChange={(e) => props.createTestState(e, props.testNumber)}
      >
      </textarea>
      <h6>write test {props.testNumber + 1} description here</h6>
      <textarea
        className="code-description"
        type="text"
        placeholder="test description"
        value={props.descriptionValue}
        onChange={(e) => props.createDescriptionState(e, props.testNumber+1)}
      >
      </textarea>
    </code>
  )
}

export default NewTest