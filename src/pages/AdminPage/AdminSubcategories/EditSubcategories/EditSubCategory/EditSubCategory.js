import React from 'react'
import { Button } from 'semantic-ui-react'

const EditSubCategory = props => {
    return (
        <div>
            <h1>Hej subcategory!</h1>
            <Button onClick={() => props.handler(false)}>Cancel</Button>
        </div>
    )
}

export default EditSubCategory
