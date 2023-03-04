import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import * as React from 'react'

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

const LoginPage: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    })
  }

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
          onSubmit={handleSubmit}
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
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="senha"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
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
