import React, { createContext, useState, useEffect } from 'react'

export const MessageContext = createContext()

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
