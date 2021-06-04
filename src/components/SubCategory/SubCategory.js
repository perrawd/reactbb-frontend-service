/**
 * SubCategory component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Image } from 'semantic-ui-react'

export const SubCategory = props => {
  return (
    <Table.Row key={props.data.id}>
      <Table.Cell width={1} textAlign="center">
        <Image src="./logo192.png" size="mini" />
      </Table.Cell>
      <Table.Cell width={8}>
        <Link to={`/subcategories?sid=${props.data.id}`}>
          <h5>{props.data.title}</h5>
        </Link>
        {props.data.subtitle}
      </Table.Cell>
      <Table.Cell width={2} textAlign="center">
        {props.data.threadCount}
      </Table.Cell>
      <Table.Cell width={5}>{
          props.data.latest
          ? <div><Link to={`http://localhost:3000/thread?sid=${props.data.latest.id}`}>
              {props.data.latest.title}
            </Link>
            <p>Posted on {props.data.latest.createdAt}<br/>by {props.data.latest.author}</p>
            </div>
          : "No threads available"
        }
      </Table.Cell>
    </Table.Row>
  )
}
