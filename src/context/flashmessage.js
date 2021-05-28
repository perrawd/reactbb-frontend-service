import React, { createContext, useState, useEffect } from 'react'

export const messageContext = createContext()

const MessageProvider = props => {
    const [message, setMessage] = useState("")

    useEffect(() => {
        if (message.length > 0) {
            setTimeout(() => {
                setMessage("")
            }, 10000)
        }
    }, [message])

    return (
        <messageContext.Provider value={[message, setMessage]}>
            {props.children}
        </messageContext.Provider>
    )
}

export default MessageProvider
