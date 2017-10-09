import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav () {
  return (
    <nav className="navbar navbar-default">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/">GraceShopper</Link>
      </div>
      <ul className="nav navbar-nav pull-right">
        <li><Link to="#">Search <span className="glyphicon glyphicon-search" /></Link></li>
        <li><Link to="#">Log In</Link></li>
      </ul>
    </nav>
  )
}
