import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import Grade1 from './img/Grade1.jpg';
import Img27 from './img/back5.png';
import Img28 from './img/back2.png';
import Img29 from './img/back3.png';
import MuiAlert from '@mui/material/Alert';
import Grade2 from './img/Grade2.jpg';
import {useQuery} from '@apollo/client';
import { CURRENT_USER, LOGOUT_USER } from '../GraphQl/Queries';
import Grade3 from './img/Grade3.jpg';
import Grade4 from './img/Grade4.jpg';
import { GET_SCORE_MUTATION} from "../GraphQl/Mutation";
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Box from '@mui/material/Box';
import './css/System.css';
import Snackbar from '@mui/material/Snackbar';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Cookies from 'js-cookie';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}
const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  3: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  4: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
  5: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
};
function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};
function Media(props) {
  const [image, setImage] = React.useState("");
  // const [email, setEmail] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const {error,loading,data}=useQuery(CURRENT_USER,  {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
    },
    context: {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    },
    notifyOnNetworkStatusChange: true, // did the work
    onError: (error) => {
      console.log(error);
    },
  })
  // const { loading = false } = props;
        useEffect(() => {
          console.log("XX")
          // console.log(props.score)
        // console.log(data)
        if(Cookies.get("token")){
          if ( data) {
            // console.log(data)
            setFirstname(data.currentUser.firstname)
            // setEmail(data.currentUser.email)
            setImage(data.currentUser.image)
            // setRole(data.currentUser.role)

           
          }
        }
      
       }, [data]);

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardHeader
        avatar={
          props.loading ? (
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
          ) : (
            <Avatar
              alt="Ted talk"
              src={`data:image/jpg;base64,${image}`}
            />
            // <div>x</div>
          )
        }

        title={
          props.loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            firstname
          )
        }
        subheader={
          props.loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            props.date
          )
        }
      />
      {props.loading ? (
        <Skeleton sx={{ height: "35vh" }} animation="wave" variant="rectangular" />
      ) : (
      props.score === "0" ? (
        <CardMedia
        component="img"
        height="140"
        image={Grade4}
        alt="Nicola Sturgeon on a TED talk stage"
        style={{ height: "35vh", marginBottom: "2.5vh" }}
      />
      ) : props.score === "1" ? (
        <CardMedia
        component="img"
        height="140"
        image={Grade3}
        alt="Nicola Sturgeon on a TED talk stage"
        style={{ height: "35vh", marginBottom: "2.5vh" }}
      />
      ) : props.score === "2" ? (
        <CardMedia
          component="img"
          height="140"
          image={Grade2}
          alt="Nicola Sturgeon on a TED talk stage"
          style={{ height: "35vh", marginBottom: "2.5vh" }}
        />
      ) : (
        <CardMedia
          component="img"
          height="140"
          image={Grade1}
          alt="Nicola Sturgeon on a TED talk stage"
          style={{ height: "35vh", marginBottom: "2.5vh" }}
        />
      )
      )}

      <CardContent>
        {props.loading ? (
          <React.Fragment >
            <Skeleton animation="wave" height={10} style={{marginTop:10, marginBottom: 8 }} />
            <Skeleton animation="wave" height={10} width="70%" style={{margin:"0 auto"}} />
          </React.Fragment>
        ) : (
          <Box style={{textAlign:"center"}}>
          <Typography style={{textAlign:"center"}} variant="body2" color="text.secondary" component="p">
            Score of your answer for Question {props.question}
            </Typography>
            <Box style={{marginTop:"1vh"}}>
     <StyledRating
      name="highlight-selected-only"
      defaultValue={parseInt(props.score)+1}
      IconContainerComponent={IconContainer}
      max={4}
      getLabelText={(value) => customIcons[value].label}
      highlightSelectedOnly
      readOnly
    />
    </Box>
    </Box>
          
        )}
      </CardContent>
    </Card>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};
function renderComponent(choice) {
    if (choice === 1) {
      return <Box> 
        من ينسب إليه ملك بلاد المغرب في عام 1999 من الميلاد ؟       
         </Box>;
    } else if (choice === 2) {
      return <Box>
          في أي قرن ميلادي تم الفتح الإسلامي لبلاد المغرب ؟      
          </Box>;
    } else if (choice === 3) {
      return <Box>
         في عام 1960 من الميلاد حدث زلزال مدمر في إحدى مدن بلاد المغرب، ما المدينة ؟     
          </Box>;
    } else if (choice === 4) {
        return <Box> 
           مَنْ يُنسَب إليه ملك بلاد المغرب في الفترة ما بين 1961 و 1999 من الميلاد ؟      
             </Box>;
      } else if (choice === 5) {
        return <Box> 
          من هو المؤسس الأول لدولة المرابطين في المغرب ؟      
            </Box>;
      } else if (choice === 6) {
        return <Box> 
          من هو أول ملك للمغرب بعد الاستقلال؟
                 </Box>;
      } else if (choice === 7) {
        return <Box> 
 أي سلالة قامت بتأسيس مدينة فاس في المغرب؟
           </Box>;
      } else if (choice === 8) {
        return <Box>
ما هي عاصمة المغرب خلال فترة الحماية الفرنسية؟
           </Box>;
      } else if (choice === 9) {
        return <Box>
متى استعاد المغرب استقلاله من الاستعمار الفرنسي؟
           </Box>;
      } 
  }
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
function SystemOfQuestions() {

    const [question, setQuestion] = React.useState(1);
    const [openBar3, setOpenBar3] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);
    const handleCloseBar = () => {
      setOpenBar3(false);
    };

    const handleChange = (event, value) => {
        setQuestion(value);
    };
      useEffect(() => {

      
       },);
       const [open, setOpen] = React.useState(false);
       const [score, setScore] = React.useState(0);
       const [date, setDate] = React.useState(0);
       const [loading, setLoading] = React.useState(true);
       const [rep, setRep] = React.useState('');
       const [getScore, { error: error2 }] = useMutation(GET_SCORE_MUTATION, {
        context: {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
        async update(cache, { data: { getScore } }) {
          console.log(getScore)
          console.log(getScore.score.score)
          await setScore(getScore.score.score)
          setDate(getScore.score.date)
          setLoading(false)
        },
      });

      function handleClickBar1 (Transition)  {
        setTransition(() => Transition);
        setOpenBar3(true);
      };
       const handleClickOpen = () => {
        if(rep===''){
          handleClickBar1(TransitionLeft);
        }else{
        setLoading(true)
         setOpen(true);
         setRep('')
         
         getScore({
          variables: {
            idQuestion: question,
            reponse: rep
          },
        });
      }
       };
     
       const handleClose = () => {
         setOpen(false);
       };
    return (  
        <>
        <Box sx={{display:{xs:'none',sm:'none',md:'none',lg:'block'}}} style={{position:"absolute",left:"45%",top:"0",width:"55%",height:"100%",padding:"17vh 7vw",overflowX: "hidden"}}>
            <Box style={{position:"relative"}}>
                <Box className="class1"> 
                    <Box className="child1">
                        <Box className="child11" style={{backgroundImage: `url(${Img27})`,}}>

                        </Box>
                    </Box>
                </Box>
                <Box className="class2">
                    <Box className="child2">
                        <Box className="child22" style={{backgroundImage: `url(${Img28})`,}}>

                        </Box>
                    </Box>
                </Box>
                <Box className="class3">
                    <Box className="child3">
                        <Box className="child33" style={{backgroundImage: `url(${Img29})`,}}>

                        </Box>
                    </Box>
                </Box>
                </Box>
        </Box>
        <Box sx={{width:{xs:'100%',sm:"100%",md:'100%',lg:'45%'}}} style={{position:"absolute",left:"0",top:"0",height:"100%",padding:"17vh 7vw",overflowX: "hidden"}}>
            <Box style={{position:"relative",height: "100%"}}>
                <Box sx={{width:{xs:'90vw',sm:'75vw',md:'60vw',lg:'35vw'}}} className="boxQuestion" style={{padding:"10vh 10vh",border:"1px solid rgb(191 39 16 / 94%)",borderRadius:"13px",position:"absolute",top:"62%",left:"50%",transform:"translate(-50%,-50%)",height:"73vh",backgroundColor:"white"}}>
                    <Box className="boxQuestion1" style={{position:"absolute",top:"-3vh",left:"5%",width:"90%",height:"10vh",backgroundColor:"rgb(191 39 16 / 94%)",borderRadius:"10px"}}>
                        <Box style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
                            <Box className="text">
                            Question {question}
                            </Box>
                        </Box>
                    </Box>
                    <Box  style={{position:"absolute",top:"55%",left:"50%",width:"85%",transform:"translate(-50%,-50%)",height:"75%",textAlign:"center"}}>
                    <Box className="question" style={{textAlign:"center",fontSize:"18px",marginBottom:"4vh"}}>
                    
                    {renderComponent(question)}
                    </Box>
                    <TextField
                    value={rep}
                    onChange={(e) => setRep(e.target.value)} 
                    className="reponse"
                        id="outlined-multiline-static"
                        label="جواب"
                        multiline
                        rows={7}
                         style={{width:"100%",fontSize:"18px",marginBottom:"4.5vh"}}   
                    />
                    
                    <Button onClick={handleClickOpen} style={{backgroundColor:"rgb(191 39 16 / 94%)",marginBottom:"3.5vh",textTransform: "none",fontWeight: "bold", }} variant="contained">Send Answer</Button>
                    <Stack sx={{width:{xs:'77%',sm:'65%',md:'60%',lg:'77%'}}} spacing={2}  style={{margin:"0 auto"}}>
      <Pagination count={9} page={question} onChange={handleChange} />
    </Stack>
                    </Box>

                </Box>
            </Box>
        </Box>
        <Box id="dialog" style={{widh:"50vw"}}>
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        classes={{ paper: 'dialogStyle' }}
      >
        <DialogContent >
        <Media loading={loading} score={score} date={date} question={question}/>

        </DialogContent>
        <IconButton onClick={handleClose} style={{position:"absolute",top:"1vh",right:"1vh",zIndex:"10",color:"grey",opacity:"0.7"}} aria-label="delete" size="large">
            <CancelIcon fontSize="inherit" />
          </IconButton>
      </Dialog>
      </Box>
      <Snackbar
      autoHideDuration={100000}
        open={openBar3}
        onClose={handleCloseBar}
        TransitionComponent={transition}
        message="I love snacks"
        key={transition ? transition.name : ''}
        style={{color:"white"}}
      >
          <Alert onClose={handleCloseBar} severity="error" sx={{ width: '100%' ,backgroundColor:"white !important"}}>
           write a answer, Please !
  
  </Alert>
      </Snackbar>
        </>
    );
}

export default SystemOfQuestions;