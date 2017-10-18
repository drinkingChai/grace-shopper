import React from 'react'
import { connect } from 'react-redux'
import {
  promoteUser, demoteUser,
  enableUser, disableUser } from '../store'

const UsersAdmin = (props) => {
  const {
    users, currentUser,
    promoteUser, demoteUser,
    enableUser, disableUser } = props

  console.log(props)

  return (
    <div>
      <h3>Users</h3>

      <div>
        {
          users.map(user => (
            <div key={ user.id }>
              { user.name }

              { user.id !== currentUser.userId ?
                  <div>
                    { user.isAdmin ?
                        <button onClick={ () => demoteUser(user.id) }>Demote</button> :
                        <button onClick={ () => promoteUser(user.id) }>Make admin</button> }
                    { user.isDisabled ?
                        <button onClick={ () => enableUser(user.id) }>Enable</button> :
                        <button onClick={ () => disableUser(user.id) }>Disable</button> }
                  </div> : null }
            </div>
          ))
        }
      </div>
    </div>
  )
}

const mapState = ({ users, currentUser }) => ({ users, currentUser })
const mapDispatch = {
  promoteUser, demoteUser,
  enableUser, disableUser
}

export default connect(mapState, mapDispatch)(UsersAdmin)
