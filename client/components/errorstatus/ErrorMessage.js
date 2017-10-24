import React from 'react'
import { connect } from 'react-redux'

import errorParser from '../helpers/errorParser'

const ErrorMessage = ({ error }) => {
  if (!error) return <span></span>

  return (
    <div className='navbar navbar-inverse navbar-fixed-top' style={{ backgroundColor: '#85144b' }}>
      <ul className='nav navbar-nav'>
        <li>
          <a style={{ color: '#fff' }}>{ errorParser(error) }</a>
        </li>
      </ul>
    </div>
  )
}

const mapState = ({ error }) => ({ error })

export default connect(mapState)(ErrorMessage)
