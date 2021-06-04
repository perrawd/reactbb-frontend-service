/**
 * Error 404 page component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React from 'react'
import { Icon } from 'semantic-ui-react'

const Error404 = () => {
    return (
        <div style={{textAlign: 'center'}}>
            <Icon name="exclamation circle" size="massive" />
            <h2>404 Page not found</h2>
        </div>
    )
}

export default Error404
