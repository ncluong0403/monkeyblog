import { useAuth } from "context/auth-context";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import UserTable from "./UserTable";

const UserManage = () => {
  const { userInfo } = useAuth();
  if (userInfo.role !== 1) return null;
  return (
    <div>
      <DashboardHeading
        title="Users"
        desc="Manage your user"
      ></DashboardHeading>
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;
