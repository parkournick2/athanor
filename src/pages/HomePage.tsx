import { Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

const HomePage: React.FC = () => {
  const { data: ping } = useQuery<string>(['/ping'])

  return <Typography>ping: {ping}</Typography>
}

export default HomePage
