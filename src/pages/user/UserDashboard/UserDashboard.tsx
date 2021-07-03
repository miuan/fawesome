import React from 'react'
import { Link } from 'react-router-dom';

export function UserDashboard() {
  return (
    <div>
      <h2>User Dashboard</h2>
      <Link to={'/posts'}> Posts </Link>
    </div>
  );
}


export default UserDashboard