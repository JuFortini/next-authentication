interface User {
  permissions: string[];
  roles: string[];
}

interface validateUserParams {
  user: User;
  permissions?: string[];
  roles?: string[];
}

export function validateUserPermissions({ user, permissions, roles }: validateUserParams) {

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
  
  return true;
}