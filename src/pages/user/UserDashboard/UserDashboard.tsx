import React from 'react'
import { Link } from 'react-router-dom';

export function UserDashboard() {
  return (
    <div>
      <h2>User Dashboard</h2>
      <div><Link to={'/posts'}> Posts </Link></div>
      <div><Link to={'/posts2'}> Posts V2</Link></div>
    </div>
  );
}


export default UserDashboard