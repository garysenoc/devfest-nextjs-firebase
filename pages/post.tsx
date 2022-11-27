import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Input, TextField } from '@mui/material';

import PostController, { ModelObject } from '../controller/PostController';
import { Timestamp } from 'firebase/firestore';

import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase/firebase';

import AuthContext from '../store/auth.context';
import { useRouter } from 'next/router';

import MenuIcon from '@mui/icons-material/Menu';

import { logOut } from '../firebase/authentication';
const theme = createTheme();

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{ m: 0, p: 2 }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function Post() {
  //Dependencies START
  const controller = PostController();
  const { requestFetch, requestAdd, requestDelete, requestUpdate } = controller;

  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [data, setData] = useState<Array<ModelObject>>();
  const [id, setId] = useState<any>();

  const [addData, setAddData] = useState<ModelObject>({
    title: '',
    description: '',
    image: '',
  });

  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const uploadLogo = async (selectedFile: any) => {
    try {
      const imageRef = ref(storage, `files/${selectedFile.name}${new Date()}`);
      console.log(imageRef);

      const state = await uploadBytes(imageRef, selectedFile);
      const url = await getDownloadURL(state.ref);
      console.log(url);
      setAddData({ ...addData, image: url });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: any) => {
    if (confirm('Delete Post?')) {
      await requestDelete(id)
        .then(() => {
          alert('Delete Successful!');
          displayPosts();
        })
        .catch((err) => {
          alert('Delete Failed: ' + err);
        });
    }
  };

  const addPost = async () => {
    if (addData.title == '' || addData.description == '') {
      alert('Please fill up all the fields. Thank you');
    } else {
      const response = await requestAdd(addData).catch((err: any) => {
        alert(err);
      });
      alert('Posted successfully');
      displayPosts();
      setAddData({
        title: '',
        description: '',
        image: '',
      });
    }
  };

  const updatePost = async () => {
    if (addData.title == '' || addData.description == '') {
      alert('Please fill up all the fields. Thank you');
    } else {
      const response = await requestUpdate(id, addData).catch((err: any) => {
        alert(err);
      });
      alert('Post updated successfully');
      displayPosts();
      setAddData({
        title: '',
        description: '',
        image: '',
      });
      setId('');
    }
  };

  const displayPosts = useCallback(async () => {
    const _posts = await requestFetch().catch((err) => {
      alert('Failed to load reported user' + err);
    });
    const posts: Array<ModelObject> = _posts!.map(
      ({ id, title, description, image }) => ({
        id,
        title,
        description,
        image,
      }),
    );
    if (_posts) setData(posts);
  }, [requestFetch]);

  useEffect(() => {
    const reloadUser = async () => {
      if (user) {
        await user.reload();
        displayPosts();
      }
    };

    if (!loading) {
      if (user && !user.reloadUserInfo.customAttributes) {
        reloadUser();
      } else {
        if (!user) {
          router.push('/');
        } else {
          displayPosts();
        }
      }
    }
  }, [loading, user]);

  return (
    <ThemeProvider theme={theme}>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={handleClose}
        >
          Add Post
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container>
            <Grid
              item
              sm={12}
            >
              <TextField
                required
                id='outlined-required'
                label='Title'
                fullWidth
                onChange={(e) => {
                  setAddData({ ...addData, title: e.target.value });
                }}
                value={addData.title}
              />
            </Grid>
            <Grid
              item
              sm={12}
              sx={{ mt: 1 }}
            >
              <TextField
                id='outlined-multiline-flexible'
                label='Description'
                multiline
                rows={4}
                variant='outlined'
                fullWidth
                onChange={(e) => {
                  setAddData({ ...addData, description: e.target.value });
                }}
                value={addData.description}
              />
            </Grid>
            <Grid
              item
              sm={12}
              sx={{ mt: 1 }}
            >
              <Input
                type='file'
                fullWidth
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files ? e.target.files[0] : undefined;
                  uploadLogo(file);
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              addPost();
              handleClose();
            }}
          >
            Add Post
          </Button>
        </DialogActions>
      </BootstrapDialog>

      <BootstrapDialog
        onClose={() => {
          setOpenEdit(false);
        }}
        aria-labelledby='customized-dialog-title'
        open={openEdit}
      >
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={() => {
            setOpenEdit(false);
          }}
        >
          Edit Post
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container>
            <Grid
              item
              sm={12}
            >
              <TextField
                required
                id='outlined-required'
                label='Title'
                fullWidth
                onChange={(e) => {
                  setAddData({ ...addData, title: e.target.value });
                }}
                value={addData.title}
              />
            </Grid>
            <Grid
              item
              sm={12}
              sx={{ mt: 1 }}
            >
              <TextField
                id='outlined-multiline-flexible'
                label='Description'
                multiline
                rows={4}
                variant='outlined'
                fullWidth
                onChange={(e) => {
                  setAddData({ ...addData, description: e.target.value });
                }}
                value={addData.description}
              />
            </Grid>
            <Grid
              item
              sm={12}
              sx={{ mt: 1 }}
            >
              <Input
                type='file'
                fullWidth
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files ? e.target.files[0] : undefined;
                  uploadLogo(file);
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              updatePost();
              setOpenEdit(false);
            }}
          >
            Edit Post
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <CssBaseline />
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}
          >
            DevFest 2022
          </Typography>
          <Button
            color='inherit'
            onClick={() => {
              logOut();
              router.push('/');
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth='sm'>
            <Typography
              component='h1'
              variant='h2'
              align='center'
              color='text.primary'
              gutterBottom
            >
              Posts
            </Typography>

            <Stack
              sx={{ pt: 4 }}
              direction='row'
              spacing={2}
              justifyContent='center'
            >
              <Button
                variant='contained'
                onClick={handleClickOpen}
              >
                Add Post
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container
          sx={{ py: 8 }}
          maxWidth='md'
        >
          {/* End hero unit */}
          <Grid
            container
            spacing={4}
          >
            {data?.map((item, key) => (
              <Grid
                item
                key={key}
                xs={12}
                sm={6}
                md={4}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component='img'
                    sx={{
                      16: 9,
                      //   pt: '56.25%',
                    }}
                    image={
                      item?.image == ''
                        ? 'https://via.placeholder.com/300'
                        : item?.image
                    }
                    alt='random'
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant='h5'
                      component='h2'
                    >
                      {item?.title}
                    </Typography>
                    <Typography>{item?.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size='small'
                      onClick={() => {
                        setId(item?.id);
                        setOpenEdit(true);
                        setAddData(item);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size='small'
                      onClickCapture={() => handleDelete(item?.id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}

