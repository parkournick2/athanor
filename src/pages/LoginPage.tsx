import { AUTH_TOKEN_KEY } from '../constants'
import api from '../hooks/api'
import { AxiosErrorWithMessage } from '../types/auth/error'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Signature = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Feito com ❤️ por '}
      <Link color="inherit" href="https://github.com/parkournick2">
        Nicolas
      </Link>
      {'.'}
    </Typography>
  )
}

type formType = {
  email: string
  password: string
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>()

  const navigate = useNavigate()

  const onSubmit = useMutation(
    (body: formType) => api.post('/login', { ...body }),
    {
      onSuccess: (data: AxiosResponse) => {
        localStorage.setItem(AUTH_TOKEN_KEY, data.data.access_token)

        api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`

        navigate('/')
      },
      onError: (error: AxiosErrorWithMessage) => {
        console.log(error?.response?.data?.message)
      },
    }
  )

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          sx={{ maxWidth: '100vw', width: '200px' }}
          src="/dark_logo.svg"
        />

        <Box
          component="form"
          onSubmit={handleSubmit((body) => onSubmit.mutate(body))}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 1,
            width: '100%',
            maxWidth: '300px',
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            autoComplete="email"
            error={!!errors?.email}
            autoFocus
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            id="password"
            error={!!errors?.password}
            autoComplete="current-password"
            {...register('password', {
              required: true,
              maxLength: 30,
              minLength: 4,
            })}
          />
          <FormControlLabel
            sx={{ width: '100%' }}
            control={<Checkbox value="remember" color="primary" />}
            label="Lembrar"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Entrar
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="inherit"
            sx={{ mt: 3, mb: 2 }}
          >
            <img height="20px" src="/icons/google.png" />
            <Box mr={2} />
            Continuar com o Google
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                Não tem uma conta?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Signature sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}

export default LoginPage
