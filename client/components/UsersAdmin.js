import React from 'react'
import { connect } from 'react-redux'

const UsersAdmin = ({ users }) => {
  return (
    <div>
      <h3>Users</h3>

      <div>
        {
          users.map(user => (
            <div key={ user.id }>
              { user.name }
              <button>Make admin</button>
              <button>Demote</button>
              <button>Disable</button>
              <button>Enable</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

const mapState = ({ users }) => ({ users })

export default connect(mapState)(UsersAdmin)
