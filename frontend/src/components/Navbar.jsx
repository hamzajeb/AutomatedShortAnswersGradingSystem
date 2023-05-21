import { AppBar, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import  { useContext } from 'react';
import { useState, useEffect, useRef } from "react";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { AppContext } from './../AppContext';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Gallery from './Gallery';
import {useQuery} from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { REGISTER_USER_MUTATION} from "../GraphQl/Mutation";
import { LOGIN_USER_MUTATION} from "../GraphQl/Mutation";
import { LOGOUT_USER_MUTATION} from "../GraphQl/Mutation";
import { useMutation } from "@apollo/client";
import { Link, matchPath, useLocation } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { createBrowserHistory } from 'history';
import Img12 from './img/img121.jpg';
import Img5 from './img/img6.jpg';
import CancelIcon from '@mui/icons-material/Cancel';
import "./css/Navbar.css";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Img0 from './img/patterns-middle.png';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import logo from './img/logo_en.png';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { CURRENT_USER, LOGOUT_USER } from '../GraphQl/Queries';
const pages = ['Accueil', 'About us', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}
function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16,zIndex:'10' }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};



function Navbar(props) {
  const [openBar, setOpenBar] = React.useState(false);
  const [token, setToken] = React.useState(null);
  const [profilImage, setProfilImage] = React.useState(null);
  const [openBar1, setOpenBar1] = React.useState(false);
  const [afterRegistre,setAfterRegistre ] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);
  const [transition1, setTransition1] = React.useState(undefined);

  const handleClickBar = (Transition) => () => {
    setTransition(() => Transition);
    setOpenBar(true);
    setValue1("/");
    handleRegister();
  };

  const handleClickBar1 = (Transition1) => () => {
    setTransition1(() => Transition1);
    setOpenBar1(true);
    setValue1("/");
    handleLogin();
    setAfterRegistre(false)
  };

  const handleCloseBar = () => {
    setOpenBar(false);
  };
  const handleCloseBar1 = () => {
    setOpenBar1(false);
  };

  

  
  

  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      
      '&:before, &:after': {
        
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&:before': {
        
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&:after': {
        
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
      backgroundColor:'rgb(255 171 46)',
    },
  }));
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFirstName("")
    setLastName("")
    setPassword("")
    setEmail("")
    setLevel("")
    setSchool("")
    setValue1("/");
  };
  const {openLogin, setOpenLogin} = useContext(AppContext);
  

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
    setEmailLogin("");
    setPasswordLogin("");
    setValue1("/");
    setAfterRegistre(false)
 
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down(1280));
  const location = useLocation();
  const [menuClicked, setMenuClicked] = React.useState(false);
  const toggleMenuClick = () => {
    setMenuClicked(!menuClicked);
  };

const [firstname, setFirstName] = useState("");
const [lastname, setLastName] = useState("");
const [email, setEmail] = useState("");
const [emailLogin, setEmailLogin] = useState("");
const [passwordLogin, setPasswordLogin] = useState("");
const [password, setPassword] = useState("");
const [school, setSchool] = useState("");
const [level, setLevel] = useState("");
const [role, setRole] = useState("");

const [registerUser, { error: error1 }] = useMutation(REGISTER_USER_MUTATION, {
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  mode: 'cors',
  update(cache, { data: { registerUser } }) {
    // Read the query from the cache
    console.log('createUser')
    console.log(registerUser)
    setFirstName("")
    setLastName("")
    setPassword("")
    setEmail("")
    setLevel("")
    setSchool("")
    setImage(null)
    handleClose();
    setAfterRegistre(true)
    handleClickOpenLogin();
    setEmailLogin(registerUser.user.email);
    handleClickBar(TransitionLeft);
  },
});

const [loginUser, { error: error2 }] = useMutation(LOGIN_USER_MUTATION, {
  update(cache, { data: { loginUser } }) {
    console.log(loginUser)
    setToken(loginUser.user.accessToken)
    Cookies.set('token', loginUser.user.accessToken, { 
      expires: 7, // cookie expire dans 7 jours
      secure: true // cookie uniquement envoyé sur HTTPS
    });
    localStorage.setItem("image",loginUser.user.image)
    setPasswordLogin("")
    setEmailLogin("")
    setProfilImage(loginUser.user.image)
    handleCloseLogin();
    handleClickBar1(TransitionLeft);
    setRole("student")

  },
});

const [logoutUser, { error: error3 }] = useMutation(LOGOUT_USER_MUTATION, {
  context: {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
  update(cache, { data: { logoutUser } }) {
    console.log(logoutUser)
    setToken(null);

    Cookies.remove('token');
    localStorage.removeItem("image")
    setAnchorElUser(null);
    setReload(0)
    
    navigate('')
  },
});
const handleLogOut = async  () => {
  try {
    
     await logoutUser(); 
  } catch (err) {
    console.error(err); 
  }
};

const handleRegister = async (e) => {
  console.log(image)
  await registerUser({
    variables: {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      school: school,
      level: level,
      image: image
    },
  });
}

const handleLogin = async (e) => {
  // e.preventDefault();
  await loginUser({
    variables: {
      email: emailLogin,
      password: passwordLogin
    },
  });
}
  
 



const [value1, setValue1] = useState("/");
const handleChange = (event, newValue) => {
  setValue1(newValue);
};

const [anchorElNav, setAnchorElNav] = React.useState(null);
const [anchorElUser, setAnchorElUser] = React.useState(null);

const handleOpenNavMenu = (event) => {
  setAnchorElNav(event.currentTarget);
};
const handleOpenUserMenu = (event) => {
  setAnchorElUser(event.currentTarget);
};
let navigate = useNavigate(); 
const handleCloseNavMenu = () => {

  setAnchorElNav(null);
};

const handleCloseUserMenu = () => {
  setAnchorElUser(null);
};

const [image, setImage] = useState(null);

async function handleImageChange(event) {
  const file=event.target.files[0]
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    setImage(base64String);
  };
}

const {error,loading,data}=useQuery(CURRENT_USER,  {
  fetchPolicy: "no-cache",
  onCompleted: (data) => {
  /// 
  setToken(Cookies.get("token"));
  setReload(1)
  handleClose()
  handleCloseLogin()
  },
  context: {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  },
  notifyOnNetworkStatusChange: true, // did the work
  onError: (error) => {
    console.log(error);
    setReload(0)
  },
})
const [reload, setReload] = React.useState(2);

const [mounted, setMounted] = useState(false);
useEffect(() => {
  // if (!mounted) {
    if(Cookies.get("token")){
      if ( data) {
        console.log(data)
        
        setProfilImage(localStorage.getItem("image"))
        setRole(data.currentUser.role)
        
      }else{
       setToken(null)
       
      }
    }
    // setMounted(true);
  // } else {

  // }

  


 }, [data]);

    return (
      <React.Fragment>
      <CssBaseline />
      {reload !==2 ?
      <div>
    {token === null  && reload===0?
    <AppBar sx={{backgroundColor: 'transparent',boxShadow:"0",position:'absolute'}}>
    <Box p={2} sx={{backgroundColor:'rgb(191 39 16 / 94%)',height:'1vh',padding:'2.4vh',display:{xs:'none',sm:'flex'},
        
        alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
      <Typography sx={{textAlign:'center',fontSize:'15px'}}   variant='span'> Morocco, land of light</Typography>
    </Box>
    <Box id="back-to-top-anchor">
      
        <Toolbar  sx={{display:{xs:'none',sm:'none',md:'block',lg:'block'},marginTop:"1.5vh",backgroundColor: 'transparent',padding: '3vh 10vw 0'}} variant='dense'>
        <Box flex={1} display="flex" justifyContent="space-evenly"  sx={{alignItems:"center",backgroundColor: 'transparent'}}>
           <Box sx={{width:'80vw',color:"rgb(191 39 16 / 94%)",position:"relative",borderTop: "3px solid rgb(191 39 16 / 94%)",height:"11vh",
                                    borderBottom: "3px solid rgb(191 39 16 / 94%)"}}>
           <Box style={{textAlign:"center",position:"absolute",top:"55%",left:"50%",transform:"translate(-50%,-50%)"}}>
           <img src={logo}alt="Logo" style={{width:"60%"}} />
          
           </Box> 
                            <Tabs
                                value={value1}
                                onChange={handleChange}
                                aria-label="Navigation Tabs"
                                TabIndicatorProps={{style: {background:'rgb(191 39 16 / 94%)',borderRadiusTop:"50%"}}}
                                textColor="inherit"
                                sx={{padding:"1.75vh 0"}}
                            >

                                <Tab
                                    label={'Accueil'}
                                    component={Link}
                                    to="/"
                                    value="/"
                                    className={"tab"}
                                    style={{fontFamily: "alethianext lightitalic"}}
                                />
                                <Tab
                                    label={'Subscribe'}
                                    component={Button}
                                    style={{fontFamily: "alethianext lightitalic"}}
                                    onClick={handleClickOpen}
                                    className={"tab"}
                                />
                                <Tab
                                    label={'Login'}
                                    component={Button}
                                    style={{fontFamily: "alethianext lightitalic"}}
                                    onClick={handleClickOpenLogin}
                                    className={"tab"}
                                />

<Tab disabled
                                    
                                    component={Box}
                                    
                                    
                                    className={"tab"}
                                />
     

                                <Tab
                                    label={'About'}
                                    component={Link}
                                    to="/AboutUs"
                                    value="/AboutUs"
                                    sx={{fontWeight:"bold"}}
                                    className={"tab"}
                                    style={{fontFamily: "alethianext lightitalic"}}
                                />
                                <Tab
                                    label={'Contact Us'}
                                    component={Link}
                                    to="/ContactUs"
                                    value="/ContactUs"
                                    className={"tab"}
                                    style={{fontFamily: "alethianext lightitalic"}}
                                />
                                <Tab
                                    label={'BLOG'}
                                    component={Link}
                                    to="/blog"
                                    value="/blog"
                                    className={"tab"}
                                    style={{fontFamily: "alethianext lightitalic"}}
                                />

                            </Tabs>
                        </Box>

    </Box>
        </Toolbar>
    
        <Toolbar  sx={{display:{xs:'block',sm:'block',md:'none',lg:'none'},backgroundColor: 'transparent',padding:'7vh 5vw'}} variant='dense'>
        <Box flex={1} display="flex" justifyContent="space-between"  sx={{alignItems:"center",backgroundColor: 'transparent'}}>
        <Box>
           <img  src={logo} style={{transform: 'scale(0.5)'}} alt="Logo"  />
           </Box>
           <Box>
           {menuClicked ? (
                      <IconButton
                      onClick={toggleMenuClick}
                      size="large"
                      sx={{ ml: 2 }}
                      color="primary"
                      aria-haspopup="true" 
                    >
                      <CloseIcon  className={"navbar__menu"}  style={{ color: 'rgb(191 39 16 / 94%)' }} fontSize="inherit"/>
                    </IconButton>
  
      ) : (
        <IconButton
        onClick={toggleMenuClick}
        size="large"
        sx={{ ml: 2 }}
        color="primary"
        aria-haspopup="true">
        <MenuIcon
          className={"navbar__menu"}
          style={{ color: 'rgb(191 39 16 / 94%)' }} fontSize="inherit"
        />
        </IconButton>
      )}
            <ul
        className={
          menuClicked ? "navbar__list navbar__list--active" : "navbar__list"
        }
      >

            <Link style={{ fontFamily: "alethianext lightitalic",textDecoration: 'none',color:'white',fontSize:'20px' }} to="/" className="navbar__item" >
            Accueil
            </Link>
            <Link onClick={handleClickOpen}  className="navbar__item"  style={{ textDecoration: 'none',color:'white',fontSize:'20px' }}>
            Subscribe
            </Link>
            <Link onClick={handleClickOpenLogin}  className="navbar__item"  style={{ textDecoration: 'none',color:'white',fontSize:'20px' }}>
            Login
            </Link>
            <Link to="/About" className="navbar__item"  style={{ textDecoration: 'none',color:'white',fontSize:'20px' }}>
            About
            </Link>
            <Link to="/ContactUs" className="navbar__item"  style={{ textDecoration: 'none',color:'white',fontSize:'20px' }}>
            ContactUs
            </Link>

      </ul>
      </Box>

           </Box>
           
           </Toolbar>
           </Box>

    </AppBar> 
:
<AppBar sx={{backgroundColor: 'transparent',boxShadow:"0",position:'absolute',}}>
<Box p={2} sx={{backgroundColor:'rgb(191 39 16 / 94%)',height:'1vh',padding:'2.4vh',display:{xs:'none',sm:'flex'},
        
        alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
      <Typography sx={{textAlign:'center',fontSize:'15px'}}   variant='span'> Morocco, land of light</Typography>
    </Box>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{paddingTop: "2vh"}}>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Box sx={{textAlign:"center",display: { xs: 'none', md: 'block' } }}>
          <img src={logo}alt="Logo" style={{width:"60%"}} />
          </Box>


          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="rgb(191 39 16 / 94%)"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
                <MenuItem  onClick={()=>{navigate('');setAnchorElNav(null);}}>
                  <Typography textAlign="center" sx={{color:"rgb(191 39 16 / 94%)"}}>Accueil</Typography>
                </MenuItem>
                <MenuItem  onClick={()=>{navigate('ContactUs');setAnchorElNav(null);}}>
                  <Typography textAlign="center" sx={{color:"rgb(191 39 16 / 94%)"}}>Contact Us</Typography>
                </MenuItem>
                <MenuItem  onClick={()=>{navigate('AboutUs');setAnchorElNav(null);}}>
                  <Typography textAlign="center" sx={{color:"rgb(191 39 16 / 94%)"}}>About Us</Typography>
                </MenuItem>
            </Menu>
          </Box>
 
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Box style={{textAlign:"center"}}>
           <img src={logo}alt="Logo" style={{width:"60%"}} />
           </Box>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
              <Button onClick={()=>{navigate('');}} sx={{ my: 2, color: 'white', display: 'block' }}>Accueil</Button>
              <Button onClick={()=>{navigate('ContactUs');}} sx={{ my: 2, color: 'white', display: 'block' }}>Contact Us</Button>
              <Button onClick={()=>{navigate('AboutUs');}} sx={{ my: 2, color: 'white', display: 'block' }}>About Us</Button>
            
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Admin" key={profilImage} src={`data:image/jpeg;base64,${profilImage}`} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem  onClick={()=>{navigate('Profile');setAnchorElUser(null);}}>
                  <Typography textAlign="center" sx={{color:"rgb(191 39 16 / 94%)"}}>Profile</Typography>
                </MenuItem>
                {role==='admin'?
                <Box>
                <MenuItem  onClick={()=>{navigate('Dashboard');setAnchorElUser(null);}}>
                  <Typography textAlign="center" sx={{color:"rgb(191 39 16 / 94%)"}}>Dashboard</Typography>
                </MenuItem>
                 <MenuItem  onClick={handleLogOut}>
                 <Typography textAlign="center" sx={{color:"rgb(191 39 16 / 94%)"}}>Logout</Typography>
               </MenuItem>
               </Box>
                :
                <MenuItem  onClick={handleLogOut}>
                 <Typography textAlign="center" sx={{color:"rgb(191 39 16 / 94%)"}}>Logout</Typography>
               </MenuItem>
            }
               
            
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>



}
</div>
:
<div></div>
}
    <ScrollTop {...props}>
    <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>

      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
        <DialogContent>
          <div className='Box'>
          <IconButton onClick={handleClose} style={{position:"absolute",top:"1vh",right:"1vh",zIndex:"10",color:"white",opacity:"0.7"}} aria-label="delete" size="large">
            <CancelIcon fontSize="inherit" />
          </IconButton>
          <Box sx={{width:{xs:'100%',sm:'100%',md:'50%',lg:'50%'}}} style={{height:"100%",position:"absolute",top:"0",left:"0",overflow:"hidden",backgroundColor:"rgb(190 162 120)"}}>
          <img style={{height:"100%"}}
                        src={Img0}
                        alt="{item.title}"
                        loading="lazy"
                    />
                    </Box>
                    <Box sx={{width:{xs:'80%',sm:'70%',md:'50%',lg:'50%'},left:{xs:'50%',sm:'50%',md:'35%',lg:'35%'}}} style={{height:"80%",zIndex:"10",position:"absolute",top:"50%",transform:"translate(-50%,-50%)",padding:"2% 6%",overflow:"hidden",background: "rgba(255, 255, 255, 0.8)",borderRadius: "0.75rem",    backdropFilter: "saturate(200%) blur(30px)",boxShadow: "rgba(0, 0, 0, 0.1) 0 rem 0.625 rem 0.9375 rem -0.1875 rem, rgba(0, 0, 0, 0.05) 0 rem" }}>
                      <Box style={{position:"relative"}}>
                      <p style={{fontWeight: "200",fontSize: "xx-large",textAlign:"center",fontFamily: "system-ui"}}>Subscribe</p>
                      </Box>
                      <div style={{marginBottom:"5vh",position:"relative"}} className='BoxDialog'>
                      <TextField  onChange={(e) => setFirstName(e.target.value)} value={firstname} label="First Name" placeholder="Ex. Pablo" multiline variant="standard"/>
                      <TextField  onChange={(e) => setLastName(e.target.value)} value={lastname} label="Last Name" placeholder="Ex. Pablo" multiline variant="standard"/>
                      <TextField  onChange={(e) => setEmail(e.target.value)} value={email} label="Email Address" placeholder="Ex. xyz@gmail.com" multiline variant="standard"/>
                      <TextField  onChange={(e) => setPassword(e.target.value)} value={password} type="password"  label="Password"autoComplete="current-password"  placeholder=""  variant="standard"/>
                      <TextField  onChange={(e) => setSchool(e.target.value)} value={school} label="School Or Institution" placeholder="Ex. Fst Tanger" multiline variant="standard"/>
                      <TextField  onChange={(e) => setLevel(e.target.value)} value={level} label="Grade Level " placeholder="Ex. cycle LSI" multiline variant="standard"/>
                      

                      <Button onClick={handleClickBar(TransitionLeft)}  variant="contained" style={{position:"absolute",right:"0",bottom:"-18vh",width:"65%",backgroundColor:"wheat",color: "grey"}}>Submit</Button>
                      <Button  component="label" variant="contained" aria-label="upload picture" style={{position:"absolute",left:"0",bottom:"-18vh",width:"30%",backgroundColor:"wheat",color: "grey"}}>
                      <input onChange={handleImageChange} name={image} hidden accept="image/*" type="file" />
                          <PhotoCamera />
                        </Button>
                        
                     </div> 
                     <FormControlLabel control={<Android12Switch defaultChecked />} label="I agree to the Conditions" />
                     
                    </Box>          
          <Box sx={{display:{xs:'none',sm:'none',md:'block',lg:'block'}}} style={{height:"100%",position:"absolute",top:"0",right:"0",width:"50%",overflow:"hidden"}}>
              <img style={{width:"100%",height:"100%"}} src={Img12} alt="{item.title}" loading="lazy" />
          </Box>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog fullScreen={fullScreen} open={openLogin} onClose={handleCloseLogin}>
        <DialogContent>
          <div className='Box'>
          <IconButton onClick={handleCloseLogin} style={{position:"absolute",top:"1vh",right:"1vh",zIndex:"10",color:"white",opacity:"0.7"}} aria-label="delete" size="large">
            <CancelIcon fontSize="inherit" />
          </IconButton>
          <Box sx={{width:{xs:'100%',sm:'100%',md:'50%',lg:'50%'}}} style={{height:"100%",position:"absolute",top:"0",left:"0",overflow:"hidden",backgroundColor:"rgb(247 151 8 / 50%)"}}>
          <img style={{height:"100%"}}
                        src={Img0}
                        alt="{item.title}"
                        loading="lazy"
                    />
                    </Box>
                    <Box sx={{width:{xs:'80%',sm:'65%',md:'45%',lg:'45%'},left:{xs:'50%',sm:'50%',md:'35%',lg:'35%'}}} style={{height:"80%",zIndex:"10",position:"absolute",top:"50%",transform:"translate(-50%,-50%)",padding:"2% 6%",overflow:"hidden",background: "rgba(255, 255, 255, 0.8)",borderRadius: "0.75rem",    backdropFilter: "saturate(200%) blur(30px)",boxShadow: "rgba(0, 0, 0, 0.1) 0 rem 0.625 rem 0.9375 rem -0.1875 rem, rgba(0, 0, 0, 0.05) 0 rem" }}>
                      <p style={{fontWeight: "200",fontSize: "xx-large",textAlign:"center",fontFamily: "system-ui"}}>Login</p>
                      <div style={{marginBottom:"6vh",position:"relative"}} className='BoxDialog1'>
{afterRegistre?


                      <TextField focused onChange={(e) => setEmailLogin(e.target.value)} value={emailLogin}  label="Email Address" placeholder="Ex. xyz@gmail.com" multiline variant="standard"/>
                      :<TextField  onChange={(e) => setEmailLogin(e.target.value)} value={emailLogin}  label="Email Address" placeholder="Ex. xyz@gmail.com" multiline variant="standard"/>
                    }
                      <TextField  onChange={(e) => setPasswordLogin(e.target.value)} value={passwordLogin} type="password"  label="Password"autoComplete="current-password"  placeholder=""  variant="standard"/>
                      <Button onClick={handleClickBar1(TransitionLeft)} variant="contained" style={{position:"absolute",bottom:"-19vh",width:"100%",backgroundColor:"rgb(255 171 46 / 30%)",color: "grey"}}>Submit</Button>
                     </div> 
                     
                     <FormControlLabel control={<Android12Switch defaultChecked />} label="I agree to the Conditions" />
                    </Box>          
          <Box sx={{display:{xs:'none',sm:'none',md:'block',lg:'block'}}} style={{height:"100%",position:"absolute",top:"0",right:"0",width:"50%",overflow:"hidden"}}>
              <img style={{width:"100%",height:"100%"}} src={Img5} alt="{item.title}" loading="lazy" />
          </Box>
          </div>
        </DialogContent>
      </Dialog>
      <Snackbar
      autoHideDuration={100000}
        open={openBar}
        onClose={handleCloseBar}
        TransitionComponent={transition}
        message="I love snacks"
        key={transition ? transition.name : ''}
      >
          <Alert onClose={handleCloseBar} severity="success" sx={{ width: '100%' }}>
    This is a success subscribe!
  </Alert>
      </Snackbar>
      <Snackbar
      autoHideDuration={4000}
        open={openBar1}
        onClose={handleCloseBar1}
        TransitionComponent={transition1}
        message="I love snacks"
        
      >
          <Alert onClose={handleCloseBar1} severity="success" sx={{ width: '100%' }}>
    This is a success Login!
  </Alert>
      </Snackbar>

    </React.Fragment>
    
    );
}

export default Navbar;