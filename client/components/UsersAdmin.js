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
      <hr/>

      <div className='row'>
        {
          users.map(user => (
            <div key={ user.id } className='col-md-6'>
              <div className='thumbnail'>
                <div className='caption'>
                { user.name }

                <hr/>
                { user.id !== currentUser.userId ?
                    <div>
                      { user.isAdmin ?
                          <button onClick={ () => demoteUser(user.id) } className='btn btn-danger'>Demote</button> :
                          <button onClick={ () => promoteUser(user.id) } className='btn btn-info'>Make admin</button> }
                          &nbsp;
                      { user.isDisabled ?
                          <button onClick={ () => enableUser(user.id) } className='btn btn-primary'>Enable</button> :
                          <button onClick={ () => disableUser(user.id) } className='btn btn-primary'>Disable</button> }
                    </div> : null }
                </div>
              </div>
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
