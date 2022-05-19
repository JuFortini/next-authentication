import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

interface UseCanParams {
  permissions?: string[];
  roles?: string[];
}

export function useCan({ permissions, roles }: UseCanParams) {

  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return false;
  }

  if (permissions?.length > 0) {
    const userHasAllPermissions = permissions.every(permission => {
      return user.permissions.includes(permission);
    })
  
    if (!userHasAllPermissions) {
      return false;
    }
  }

  if (roles?.length > 0) {
    const userHasSomeRole = roles.some(role => {
      return user.roles.includes(role);
    })

    if (!userHasSomeRole) {
      return false;
    }
  }
  
  return true
}