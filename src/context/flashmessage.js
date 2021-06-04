/**
 * Flash Message context component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React, { createContext, useState, useEffect } from 'react'

/**
 * Create context.
 */
export const MessageContext = createContext()

/**
 * Provider function.
 */
const MessageProvider = props => {
    const [message, setMessage] = useState({
        active: false,
        message: "",
        type: ""
    })

    useEffect(() => {
        if (message.active) {
            setTimeout(() => {
                setMessage({
                    active: false,
                    message: "",
                    type: ""
                })
            }, 5000)
        }
    }, [message])

    return (
        <MessageContext.Provider value={[message, setMessage]}>
            {props.children}
        </MessageContext.Provider>
    )
}

export default MessageProvider
