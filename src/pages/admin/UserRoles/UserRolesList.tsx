import React, { useState, useEffect } from "react";
import FilteredList from "../../../components/List/FilteredList";
import gql from 'graphql-tag';
import { loader } from "graphql.macro";

const USER_LIST_QUERY = loader('./graphql/query-all-user-role-admin.gql')
const ADMIN_LIST_QUERY = loader('./graphql/query-all-user-role-admin.gql')
const DELETE_MUTATION = loader('./graphql/mutation-remove-user-role.gql')

export const UserRoleList: React.FC<{ userId?: string, adminMode?: boolean }> = ({ userId, adminMode = false }) => {
  return (
    <div>
      <FilteredList
        name={'Roles'}
        fields={['name']}
        userId={userId}
        adminMode={adminMode}
        queries={{ USER_LIST_QUERY, ADMIN_LIST_QUERY, DELETE_MUTATION }} />
    </div>
  )
}

export default UserRoleList