import React from 'react'
import { connect } from 'react-redux'
import {
  promoteUser, demoteUser,
  enableUser, disableUser,
  deleteUser,
  promptPasswordChange } from '../../store'

const UsersAdmin = (props) => {
  const {
    users, currentUser,
    promoteUser, demoteUser,
    enableUser, disableUser,
    deleteUser,
    promptPasswordChange } = props

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
                    <div className='btn-group'>
                      { user.isAdmin ?
                          <button onClick={ () => demoteUser(user.id) } className='btn btn-info'>Demote</button> :
                          <button onClick={ () => promoteUser(user.id) } className='btn btn-info'>Make admin</button> }
                      { user.isDisabled ?
                          <button onClick={ () => enableUser(user.id) } className='btn btn-warning'>Enable</button> :
                          <button onClick={ () => disableUser(user.id) } className='btn btn-danger'>Disable</button> }
                      { user.passwordChange ? null :
                          <button onClick={ () => promptPasswordChange(user.id) } className='btn btn-default'>Password change</button> }
                      { user.orders.filter(order => !order.isCart).length ? null :
                          <button onClick={ () => deleteUser(user.id) } className='btn btn-danger'>Delete</button> }
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
  enableUser, disableUser,
  deleteUser,
  promptPasswordChange
}

export default connect(mapState, mapDispatch)(UsersAdmin)
