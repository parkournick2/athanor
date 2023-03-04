import { Backdrop, CircularProgress } from '@mui/material'

type Props = {
  open?: boolean
}

const PageLoading: React.FC<Props> = ({ open = true }) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default PageLoading
