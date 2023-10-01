import React from 'react'
import { Alert } from 'react-bootstrap'

const MessageOne = ({variant, children}) => {
  return (
    <Alert variant={variant}>
        {children}
    </Alert>
  )
}

MessageOne.defaultProps = {
    variant: 'info', 
}

export default MessageOne;

