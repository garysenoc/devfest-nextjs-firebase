import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  signInWithGoogle,
  signInEmailPassword,
  logOut,
} from '../firebase/authentication';
import { useState } from 'react';
import { useRouter } from 'next/router';

const theme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <Container
        component='main'
        maxWidth='xs'
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            component='h1'
            variant='h5'
          >
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='off'
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              value={email || ''}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='off'
              onChange={(e) => setPassword(e.target.value)}
              value={password || ''}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                signInEmailPassword(email, password, () => {
                  router.push('/post');
                });
              }}
            >
              Sign In
            </Button>

            <Button
              type='submit'
              fullWidth
              variant='contained'
              onClick={() => {
                signInWithGoogle(() => {
                  router.push('/post');
                });
              }}
            >
              Sign In using Google
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  href='/signup'
                  variant='body2'
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

