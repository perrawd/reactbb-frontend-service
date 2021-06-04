/**
 * Error 403 page component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React from 'react'
import { Icon } from 'semantic-ui-react'

const Error403 = () => {
  return (
    <div style={{textAlign: 'center'}}>
      <Icon name="ban" size="massive" />
      <h2>403 Forbidden</h2>
    </div>
  )
}

export default Error403
