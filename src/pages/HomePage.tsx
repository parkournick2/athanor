import { useCurrentUser } from '../hooks/useCurrentUser'
import { Typography } from '@mui/material'

const HomePage: React.FC = () => {
  const { user } = useCurrentUser()

  return <Typography>loggedUser: {JSON.stringify(user)}</Typography>
}

export default HomePage
