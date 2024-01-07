import React from 'react'
import { Alert } from 'react-bootstrap'

const MessageOne = ({variant, children}) => {
  return (
    <div>
    <Alert variant={variant}>
        {children}
    </Alert>
    </div>
  )
}

MessageOne.defaultProps = {
    variant: 'info', 
}

export default MessageOne;

