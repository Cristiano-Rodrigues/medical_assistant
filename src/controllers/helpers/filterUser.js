export const filterUser  = (
  { password, created_at, updated_at, ...user }) => {
    return user
}