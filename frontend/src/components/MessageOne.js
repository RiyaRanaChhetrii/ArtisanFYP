import React from 'react'
import { Alert } from 'react-bootstrap'

// Functional message component
const MessageOne = ({variant, children}) => {
  return (
    <div>
    {/* Bootstrap Alert component for displaying messages */}
    {/* variant prop determines the visual style of the message(eg. success, danger, info) */}
    <Alert variant={variant}>  
        {children}
    </Alert>
    </div>
  )
}

MessageOne.defaultProps = {
    variant: 'info',  // Default message variant is 'info'
}

export default MessageOne;

