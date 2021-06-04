/**
 * EditSubcategories component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React, { useState } from 'react'
import { Button, Table } from 'semantic-ui-react'
import EditSubcategory from './EditSubcategory/EditSubcategory'

const EditSubcategories = props => {
  const [activeSubcategory, setActiveSubcategory] = useState({})
  const [editSubcategory, setEditSubcategory] = useState(false)

  const handleOnClick = subcat => {
    setActiveSubcategory(subcat)
    setEditSubcategory(true)
  }

  return (
    editSubcategory
    ? <EditSubcategory subcategory={activeSubcategory} handler={setEditSubcategory}/>
    : <div>
      {props.categories.map(category => <div key={category.id} style={{ marginBottom: 15 }}>
          <h3>{category.title}</h3>
          <Table singleLine fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Registration Date</Table.HeaderCell>
                <Table.HeaderCell>Created By</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {category.subcategories.map(subcategory => <Table.Row key={subcategory.id}>
                  <Table.Cell>{subcategory.title}</Table.Cell>
                  <Table.Cell>{subcategory.createdAt}</Table.Cell>
                  <Table.Cell />
                  <Table.Cell>
                  <Button size="mini" color="yellow" onClick={() => handleOnClick(subcategory)}>
                      Edit
                    </Button>
                  </Table.Cell>
                </Table.Row>)}
            </Table.Body>
          </Table>
        </div>)}
    </div>
  )
}

export default EditSubcategories
