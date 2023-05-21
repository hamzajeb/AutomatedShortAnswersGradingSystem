import { AppBar, Toolbar, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import * as React from 'react';
import { useState, useEffect, useRef } from "react";
import MailIcon from '@mui/icons-material/Mail';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Img7 from './img/img7.jpg';
import {useQuery} from '@apollo/client';
import { Route, Navigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import "./css/Navbar.css";
import { CURRENT_USER,CURRENT_USER_SCORES} from '../GraphQl/Queries';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(ID_Question,Question,array) {
  const data = {
    ID_Question,
    Question,
    history: [],
  };
if(array !== undefined){
  if(array.length!==0){
    for (let i = 0; i < array.length; i++) {
      data.history.push(array[i]);
    }
  }
}
  return data;
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.ID_Question}
        </TableCell>
        <TableCell align="right">{row.Question}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell align="right">Answer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow,index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.score}</TableCell>
                      <TableCell align="right">{historyRow.reponse}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}



const rows = [
  createData('1', 'من ينسب إليه ملك بلاد المغرب في عام 1999 من الميلاد ؟'),
  createData('2', 'في أي قرن ميلادي تم الفتح الإسلامي لبلاد المغرب ؟'),
  createData('3', 'في عام 1960 من الميلاد حدث زلزال مدمر في إحدى مدن بلاد المغرب، ما المدينة ؟'),
  createData('4', 'مَنْ يُنسَب إليه ملك بلاد المغرب في الفترة ما بين 1961 و 1999 من الميلاد ؟      '),
  createData('5','من هو المؤسس الأول لدولة المرابطين في المغرب ؟      ' ),
  createData('6', 'من هو أول ملك للمغرب بعد الاستقلال ؟'),
  createData('7', '  أي سلالة قامت بتأسيس مدينة فاس في المغرب ؟  '),
  createData('8', 'ما هي عاصمة المغرب خلال فترة الحماية الفرنسية ؟  '),
  createData('9', 'متى استعاد المغرب استقلاله من الاستعمار الفرنسي ؟  '),
];
function Profile() {
    const [image, setImage] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [firstname, setFirstname] = React.useState("");
    const [school, setSchool] = React.useState("");
    const [level, setLevel] = React.useState("");
    const [list, setList] = React.useState("");
    const [role, setRole] = React.useState("");
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
     
      const {error1,loading1,data1}=useQuery(CURRENT_USER_SCORES,  {
        fetchPolicy: "no-cache",
        onCompleted: (data) => {
          setList(data)
                  // rows[0]  =createData('1', 'من ينسب إليه ملك بلاد المغرب في عام 1999 من الميلاد ؟')  
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
      
      const [rows1, setRows1] = useState([
      ]);
      
      useEffect(() => {
        // console.log(data)
        if(Cookies.get("token")){
          if ( data) {
            // console.log(data)
            setFirstname(data.currentUser.firstname)
            setEmail(data.currentUser.email)
            setImage(data.currentUser.image)
            setRole(data.currentUser.role)         
            setSchool(data.currentUser.school)         
            setLevel(data.currentUser.level)     
            console.log(data.currentUser.image)
           
             
          }
          if(list){
            console.log(list)
            setRows1(prevRows => {
              const updatedRows = []; 
              const array1 = list.scoresCurrentUser.filter(element => element.idQuestion === "1");
              console.log(array1)
              updatedRows.push(createData('1', 'من ينسب إليه ملك بلاد المغرب في عام 1999 من الميلاد ؟',array1)  ); 
              const array2 = list.scoresCurrentUser.filter(element => element.idQuestion === "2");
              console.log(array2)
              updatedRows.push(createData('2', 'في أي قرن ميلادي تم الفتح الإسلامي لبلاد المغرب ؟',array2)); 
              const array3 = list.scoresCurrentUser.filter(element => element.idQuestion === "3");
              updatedRows.push(createData('3', 'في عام 1960 من الميلاد حدث زلزال مدمر في إحدى مدن بلاد المغرب، ما المدينة ؟',array3))
              const array4 = list.scoresCurrentUser.filter(element => element.idQuestion === "4");
              updatedRows.push(createData('4', 'مَنْ يُنسَب إليه ملك بلاد المغرب في الفترة ما بين 1961 و 1999 من الميلاد ؟',array4))
              const array5 = list.scoresCurrentUser.filter(element => element.idQuestion === "5");
              updatedRows.push(createData('5','من هو المؤسس الأول لدولة المرابطين في المغرب ؟',array5 ))
              const array6 = list.scoresCurrentUser.filter(element => element.idQuestion === "6");
              updatedRows.push(createData('6', 'من هو أول ملك للمغرب بعد الاستقلال ؟',array6))
              const array7 = list.scoresCurrentUser.filter(element => element.idQuestion === "7");
              updatedRows.push(createData('7', '  أي سلالة قامت بتأسيس مدينة فاس في المغرب ؟',array7))
              const array8 = list.scoresCurrentUser.filter(element => element.idQuestion === "8");
              updatedRows.push(createData('8', 'ما هي عاصمة المغرب خلال فترة الحماية الفرنسية ؟',array8))
              const array9 = list.scoresCurrentUser.filter(element => element.idQuestion === "9");
              updatedRows.push(createData('9', 'متى استعاد المغرب استقلاله من الاستعمار الفرنسي ؟',array9))

              return updatedRows; 
            });
          }
        }
      
       }, [data,list]);
      
    return (  
        <>
      
        <Box sx={{backgroundImage:`url(${Img7})`,backgroundPosition: "center",backgroundRepeat: "no-repeat",backgroundSize: "cover", position:"relative",width:"82vw",height:"35vh",backgroundColor:"white",margin:"21vh auto 12vh",borderTopLeftRadius:"2vw",borderTopRightRadius:"2vw"}}>
         <Box sx={{backdropFilter:" blur(6px)",backgroundColor:" rgb(191 39 16 / 74%)",position:"absolute",top:"0",left:"0",width:"82vw",height:"35vh",borderTopLeftRadius:"2vw",borderTopRightRadius:"2vw"}}></Box>
          <Box sx={{  display: "grid",gridTemplateColumns: "20vh 1fr", padding:"0 2%",position:"absolute",bottom:"-3.5vh",left:"0",width:"30%",height:"20vh"}}>
            <Box sx={{backgroundImage:`url(data:image/jpeg;base64,${image})`,backgroundPosition: "center",backgroundRepeat: "no-repeat",backgroundSize: "cover",    border: "2px solid white",borderRadius:"50%",width:"20vh",height:"20vh"}}>

            </Box>
            <Box sx={{padding: "5vh"}}>
              <Typography variant='h4' className='firstname'>{firstname}</Typography>
              <Typography style={{color:"white"}} className='email'>{email}</Typography>
            </Box>
            <Box></Box>
          </Box>
          <Box sx={{zIndex:"10",position:"absolute",boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",bottom:"-7vh",left:"0",width:"82vw",height:"7vh",borderBottomLeftRadius:"2vw",borderBottomRightRadius:"2vw"}}>

          </Box>
          
        </Box>
        <Box sx={{position:"relative",width:"82vw",margin:"0vh auto 12vh",height:"100vh"}}>
          <Box className="box1">
              <span className="about">About</span>
              <Box className="description">Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..</Box>
              <Box className="description1"><span className="icon">< LocationOnIcon/></span>Live at  <span style={{fontWeight:"bold",marginLeft: "0.5vw"}}>Tangier,Morocco</span></Box>
              <Box className="description1"><span className="icon"><MailIcon/></span>{email}</Box>
              <Box className="description1" ><span className="icon"><SchoolIcon/></span>Studied at <span style={{fontWeight:"bold",marginLeft: "0.5vw"}}>{school}-{level}</span></Box>
          </Box>
          <Box className="box2">
              <span className="about">Social</span>
              <Box className="description12"><span className="icon" style={{color:"blue"}}>< FacebookOutlinedIcon/></span><span style={{padding:"0 0 10px"}}>https://www.facebook.com/caitlyn.kerluke</span></Box>
              <Box className="description12"><span className="icon" style={{color:"rgb(224, 45, 105)"}}><InstagramIcon/></span>https://www.instagram.com/caitlyn.kerluke</Box>
              <Box className="description12" ><span className="icon" style={{color:"#1DA1F2"}}><TwitterIcon/></span>https://www.linkedin.com/in/caitlyn.kerluke</Box>
              <Box className="description12" ><span className="icon" style={{color:"#0e76a8"}}><LinkedInIcon/></span>https://www.twitter.com/caitlyn.kerluke</Box>
          </Box>
          <Box className='box3'>
          <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID_Question</TableCell>
            <TableCell align="right">Question</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>

          {rows1.map((row, index) => (
            <Row key={index} row={row} />
          // index
))}
        </TableBody>
      </Table>
    </TableContainer>
          </Box>
        </Box>
        </>
    );
}

export default Profile;