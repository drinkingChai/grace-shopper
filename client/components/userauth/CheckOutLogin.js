import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

// Components
import UAuth from './UAuth'

const CheckLogin = ({ currentUser, ownProps }) => {
  if (currentUser.userId) ownProps.history.push('/checkout')

  return (
    <div className="well">
      <div className='col-md-6'>
        <UAuth />
      </div>
      <div className='col-md-6'>
        <Link to='/checkout?guest=1'>Continue as Guest</Link>
      </div>
    </div>
  )
}

const mapState = ({ currentUser }, ownProps) => ({
  currentUser,
  ownProps
})

export default connect(mapState)(CheckLogin)
