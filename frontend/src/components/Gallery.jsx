import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import TextField from '@mui/material/TextField';
import Img1 from './img/img9.jpg';
import { useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';
import Img2 from './img/img6.jpg';
import Img3 from './img/img3.jpg';
import Img4 from './img/img4.jpg';
import Img21 from './img/desert-maroc.jpg';
import Img20 from './img/Dunes-Maroc.jpg';
import Img22 from './img/Dunes-Maroc1.jpg';
import Img23 from './img/akchour-chefchaouen.jpg';
import Img24 from './img/mask1.png';
import Img25 from './img/riad-marrakech.jpg';
import Img26 from './img/desert-agafay.jpg';
import Img27 from './img/patterns-middle.png';
import Img31 from './img/patterns-middle2.png';
import Img32 from './img/dynastie-almohade.jpg';
import Img28 from './img/horloge-white.png';
import Img29 from './img/moulay-driss-zerhoun.jpg';
import Img30 from './img/qubba-almoravide.jpg';
import Img33 from './img/medersa-de-sale.jpg';
import Img34 from './img/les-tombeaux-saadiens.jpg';
import Img35 from './img/mosquee-hassan-ii_1.jpg';
import Img36 from './img/newsletters.png';
import Img37 from './img/en_logo.png';
import Img38 from './img/Screenshot 2023-03-16 170547.png';
import Img40 from './img/Screenshot 2023-03-17 233222.png';
import Img6 from './img/img2.jpg';
import Img7 from './img/img7.jpg';
import Img8 from './img/img13.jpg';
import Img9 from './img/img1.jpg';
import Img10 from './img/img10.jpg';
import Img11 from './img/img11.jpg';
import Img12 from './img/img14.jpg';
import Img13 from './img/img8.jpg';
import Img14 from './img/img12.jpg';
import Img15 from './img/img15.jpg';
import './css/gallery.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import  { useContext } from 'react';
import { AppContext } from './../AppContext';
import  { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material';

const Gallery=()=>{
    const StyledTypography=styled(Typography)({
        fontSize: '16px',
        color: '#5C190F',
    })
    let navigate = useNavigate(); 
    const {openLogin, setOpenLogin} = useContext(AppContext);
    const handleClick = () => {
        const cookie=Cookies.get("token")
        console.log(cookie)
        if (cookie === undefined){
            setOpenLogin(true)
        }else{
            navigate('/System')
        }
      };
    let data=[
        {
            id:1,
            imgSrc:Img1,
        },
        {
            id:2,
            imgSrc:Img2,
        },
        {
            id:3,
            imgSrc:Img3,
        },
        {
            id:4,
            imgSrc:Img4,
        },

        {
            id:6,
            imgSrc:Img6,
        },
        {
            id:7,
            imgSrc:Img7,
        },
        {
            id:8,
            imgSrc:Img8,
        },
        {
            id:9,
            imgSrc:Img9,
        },
        {
            id:10,
            imgSrc:Img10,
        },
        {
            id:11,
            imgSrc:Img11,
        },
        {
            id:12,
            imgSrc:Img12,
        },
        {
            id:13,
            imgSrc:Img13,
        },
        {
            id:14,
            imgSrc:Img14,
        },
        {
            id:15,
            imgSrc:Img15,
        },
    ]
    const [scrollPosition, setScrollPosition] = useState(0);

    // Fonction pour mettre à jour la position de défilement lorsqu'elle change
    function handleScroll() {
      setScrollPosition(window.scrollY);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);
    return(
        <>
        <Box style={{backgroundImage: `url(${Img20})`,  backgroundSize: 'cover',
        backgroundPosition: 'center',}} sx={{height:{sm:'77vh',md:'87vh',lg:'107vh'}}}>
        <Box style={{ overflowY: "hidden",paddingTop:"24vh"}} sx={{height:{sm:'67vh',md:'77vh',lg:'97vh'}}} >

            <ImageList style={{position:"relative"}}   variant="masonry" cols={6} gap={10}>
            <div style={{borderRadius:"50%",backgroundColor:"rgb(255 216 157)",width:"24vw",height:"24vw",position: "absolute",top:"49%",left:"50%",color:"red",zIndex:"10",transform:"translate(-50%,-50%)"}}>
            <Box style={{textAlign: "center",width:"80%",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
            <p style={{fontWeight:"bold",textAlign:"center",margin:"0 auto",color: "rgb(191 39 16 / 94%)",fontSize: "1.75vw",fontFamily: "alethianext lightitalic",fontStyle: 'italic',lineHeight: "50px"}}> 
            Automated short answers grading system
                        </p>
                        <br/>
                        
                        <Chip label="Start" sx={{padding:"1vh 0.75vw",fontSize: "1.5vw",color:"white",backgroundColor:"rgb(191 39 16 / 94%)",fontFamily: "alethianext lightitalic"}} onClick={handleClick} />
                        </Box>
                    </div>
                    <div style={{borderRadius:"50%",backgroundColor:"rgb(191 39 16 / 94%)",width:"24vw",height:"24vw",position: "absolute",top:"46.5%",left:"50%",color:"red",zIndex:"1",transform:"translate(-50%,-50%)"}}>
                        
                    </div>
                {data.map((item) => (
                    <ImageListItem key={item.imgSrc} >
                    <img style={{width:"100%",height:"100%"}}
                        src={`${item.imgSrc}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.imgSrc}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt="{item.title}"
                        loading="lazy"
                    />
                    </ImageListItem>
                ))}
            </ImageList>
           
        </Box>
        </Box>
                <Box style={{backgroundImage: `url(${Img21})`,  backgroundSize: 'cover',
                backgroundPosition: 'center',}} sx={{height:{xs:'47vh',sm:'67vh',md:'87vh',lg:'160vh'},paddingTop:"6vh"}}>
                    <Box style={{position: "relative",WebkitMaskImage:`url(${Img24})`,WebkitMaskRepeat: "round",margin: "0 auto",paddingTop:"6vh"}} sx={{background: `url(${Img23}) -${scrollPosition}px center / cover repeat`,width: "68vw",height: "100%"}}>
                    <p style={{width:"50%",textAlign:"center",margin:"0 auto",top: '46%',transform: 'initial',position: "sticky",color: "#fff",fontSize: "30px",fontFamily: "alethianext lightitalic",fontStyle: 'italic',lineHeight: "50px"}}> 
                        A country of many splendors, where culture and history shines in the street, in the palaces, in the cuisine.
                        </p>
                    </Box>
                </Box>
                <Box style={{backgroundImage: `url(${Img26})`,  backgroundSize: 'cover',
                backgroundPosition: 'center',}} sx={{height:{xs:'47vh',sm:'67vh',md:'87vh',lg:'160vh'},paddingTop:"6vh"}}>
                    <Box style={{position: "relative",WebkitMaskImage:`url(${Img24})`,WebkitMaskRepeat: "round",margin: "0 auto",paddingTop:"6vh"}} sx={{background: `url(${Img25}) -${scrollPosition}px center / cover repeat`,width: "68vw",height: "100%"}}>
                    <p style={{width:"50%",textAlign:"center",margin:"0 auto",top: '46%',transform: 'initial',position: "sticky",color: "#fff",fontSize: "30px",fontFamily: "alethianext lightitalic",fontStyle: 'italic',lineHeight: "50px"}}> 
                    A bright land that stimulates the senses,
                    where sweet scents,
                    lively and languid rhythms intertwine,
                    where everything is prone to spark surprise
                    and smiles.
                        </p>
                    </Box>
                </Box>
                <Box style={{backgroundImage: `url(${Img27})`,  backgroundSize: 'contain',backgroundPosition: 'left',backgroundRepeat: "no-repeat"}} sx={{padding:"12vh 10vw 0"}}>
                    <Box style={{marginBottom:"10vh"}}>
                        <Typography variant="h2" gutterBottom  style={{fontFamily: "merriweather",lineHeight: "50px",fontWeight: "normal",fontStyle: "italic"}} sx={{fontSize: {xs:'25px',sm:'25px',md:'30px',lg:'35px'}}} >Morocco, a melting pot of dynasties and cultures :</Typography >
                        <Typography variant="body1" gutterBottom style={{fontSize: "19px",color: "#1A1A1A",lineHeight: "1.688",fontFamily: "Assistant"}}>
                            Each country has its own history: historical facts, events and important milestones that gave the country its true historical value. The history of a country is one of the events considered worthy of remembrance, which perfectly applies to Morocco. With several dynasties that have succeeded one another over the years: the Idrisside dynasty, the Almoravid dynasty, the Almohad dynasty, the Merinid dynasty, the Saadian dynasty and the Alaouite dynasty, Morocco has gained international consideration as a multicultural country, with several types of heritage recognized as World Heritage by UNESCO. Morocco is one of the go-to destinations for discovery lovers, the most fascinated by nature, history, the art of living and Moroccan hospitality. The experience gained during their journeys in Morocco leave them pleasantly satisfied with their stay.
                        </Typography>
                    </Box>
                    <Box style={{display:"flex",justifyContent:"space-evenly"}}>
                        <Box sx={{width:"40%"}}>
                            <Typography variant="h2" gutterBottom  style={{fontFamily: "merriweather",lineHeight: "50px",fontWeight: "normal",fontStyle: "italic"}} sx={{fontSize: {xs:'25px',sm:'25px',md:'30px',lg:'35px'}}} >Idrisside dynasty</Typography >
                            <Box style={{    height: "40vh",overflow: "auto",fontSize: "19px",color: "#1A1A1A",lineHeight: "1.688",fontFamily: "Assistant"}}>
                            The Idrisside dynasty was the first to conquer Morocco for more than a century. Its founder was Idriss the 1st famous for making Volubilis (Walili) his capital. From 789 to 978, the Idrisside dynasty dominated much of the Maghreb, including the North Africa of the current Morocco. Being the founder of the first royal dynasty in Morocco, the Idrissides were able to build new cities including Fez, which became afterwards the capital after Volubilis during the reign of the son Idriss II and his successors. Several monuments are evidence of the architectural and religious works of this dynasty, such as the Al-Qarawiyin Mosque, which is one of the most important mosques in Morocco and whose architecture is an outstanding artistic masterpiece. After several years of reign, the dynasty fell to the Almoravids.                            </Box>
                        </Box>
                        <Box sx={{paddingTop:"10vh",width:"30%",display:"flex",flexDirection: "column",height: "48vh"}}>
                            <Box style={{textTransform: "uppercase",paddingTop:"4vh",height: "220px", borderRadius: "134px",margin:"0 auto" ,width:"160px",backgroundColor:"rgb(191 39 16 / 94%)",  overflow: "auto",fontSize: "17px",color: "#1A1A1A",lineHeight: "1.688",fontFamily: "Assistant"}}>
                                <Typography variant="h2" gutterBottom  style={{textAlign:"center",color:"white",fontFamily: "merriweather",lineHeight: "30px",fontWeight: "normal",fontStyle: "italic"}} sx={{fontSize: {xs:'13px',sm:'13px',md:'19px',lg:'22px'}}} >Idrisside dynasty</Typography >
                                <Box style={{display: "flex",alignItems: "center",justifyContent: "center"}}>
                                    <img  src={Img28} alt="" />
                                </Box>
                                <Typography variant="h2" gutterBottom  style={{textAlign:"center",color:"white",fontFamily: "merriweather",fontWeight: "normal",marginTop:"2vh"}} sx={{fontSize: '15px'}} >(789-974)</Typography >
                                <Typography variant="h2" gutterBottom  style={{textAlign:"center",color:"white",fontFamily: "merriweather",fontWeight: "normal"}} sx={{fontSize: '15px'}} >(1465-1472)</Typography >
                            </Box>
                            <Box style={{width:"50%" , height:"30%" ,   overflow: "auto",fontSize: "19px",color: "#1A1A1A",lineHeight: "1.688",fontFamily: "Assistant",borderRight:"2px dashed rgb(0 71 70 / 32%)"}}>
                            
                            </Box>
                        </Box>
                        <Box sx={{width:"40%"}} style={{backgroundImage: `url(${Img29})`,position:"relative",  backgroundSize: 'cover',backgroundPosition: 'center'}}>
                        <Typography variant="h2" gutterBottom  style={{position:"absolute",bottom:"3vh",left:"3vh",textAlign:"center",color:"white",fontFamily: "merriweather",lineHeight: "30px",fontWeight: "normal"}} sx={{fontSize: {xs:'19px',sm:'19px',md:'25px',lg:'35px'}}} >Moulay Driss Zerhoun</Typography >
                        </Box>
                    </Box>
                    <Box style={{display:"flex",justifyContent:"space-evenly"}}>
                    <Box sx={{marginTop:"10vh",width:"40%"}} style={{backgroundImage: `url(${Img30})`,position:"relative",  backgroundSize: 'cover',backgroundPosition: 'center'}}>
                        <Typography variant="h2" gutterBottom  style={{position:"absolute",bottom:"3vh",left:"3vh",textAlign:"center",color:"white",fontFamily: "merriweather",lineHeight: "30px",fontWeight: "normal"}} sx={{fontSize: {xs:'19px',sm:'19px',md:'25px',lg:'35px'}}} >Almoravid Qubba</Typography >
                        </Box>
                        <Box sx={{width:"30%",display:"flex",flexDirection: "column",height: "58vh"}}>
                        <Box style={{width:"50%" , height:"20vh" ,   overflow: "auto",fontSize: "19px",color: "#1A1A1A",lineHeight: "1.688",fontFamily: "Assistant",borderRight:"2px dashed rgb(0 71 70 / 32%)"}}>
                            
                            </Box>
                            <Box style={{textTransform: "uppercase",paddingTop:"4vh",height: "220px", borderRadius: "134px",margin:"0 auto" ,width:"160px",backgroundColor:"rgb(191 39 16 / 94%)",  overflow: "auto",fontSize: "17px",color: "#1A1A1A",lineHeight: "1.688",fontFamily: "Assistant"}}>
                                <Typography variant="h2" gutterBottom  style={{textAlign:"center",color:"white",fontFamily: "merriweather",lineHeight: "30px",fontWeight: "normal",fontStyle: "italic"}} sx={{fontSize: {xs:'13px',sm:'13px',md:'19px',lg:'22px'}}} >Almoravid Dynasty</Typography >
                                <Box style={{display: "flex",alignItems: "center",justifyContent: "center"}}>
                                    <img  src={Img28} alt="" />
                                </Box>
                                <Typography variant="h2" gutterBottom  style={{textAlign:"center",color:"white",fontFamily: "merriweather",fontWeight: "normal",marginTop:"2vh"}} sx={{fontSize: '15px'}} >(1060-1147)</Typography >
                            </Box>
                            <Box style={{width:"50%" , height:"30%" ,   overflow: "auto",fontSize: "19px",color: "#1A1A1A",lineHeight: "1.688",fontFamily: "Assistant",borderRight:"2px dashed rgb(0 71 70 / 32%)"}}>
                            
                            </Box>
                        </Box>

                        <Box sx={{marginTop:"10vh",width:"40%"}}>
                            <Typography variant="h2" gutterBottom  style={{fontFamily: "merriweather",lineHeight: "50px",fontWeight: "normal",fontStyle: "italic"}} sx={{fontSize: {xs:'25px',sm:'25px',md:'30px',lg:'35px'}}} >Almoravid Dynasty</Typography >
                            <Box style={{    height: "40vh",overflow: "auto",fontSize: "19px",color: "#1A1A1A",lineHeight: "1.688",fontFamily: "Assistant"}}>
                            After the Idrissides, a new dynasty began reigning over the country and obtained shares of the Maghreb soil : the Almoravids. Destroying the African reign before attacking the north, the Almoravids founded Marrakech in 1062. They managed to reign over the whole Maghreb and Al-Andalus and named Marrakech as their capital. This unprecedented accomplishment was followed by the second imperial city which became the centre of trade and a bridge between sub-Saharan Africa and the Maghreb. Among the religious artefacts that has been built there, mosques such as the Koutoubia mosque, whose construction began during the Almoravid reign, Koranic medersas, ramparts and palaces. In addition, they also built an irrigation centre to provide water for the entire region.
                            </Box>
                        </Box>
                    </Box>
                    <Box style={{display:"flex",justifyContent:"space-evenly"}}>

                        <Box sx={{marginTop:"10vh",width:"40%"}}>
                            <Typography variant="h2" gutterBottom  style={{fontFamily: "merriweather",lineHeight: "50px",fontWeight: "normal",fontStyle: "italic"}} sx={{fontSize: {xs:'25px',sm:'25px',md:'30px',lg:'35px'}}} >Almohad dynasty</Typography >
                            <Box style={{    height: "40vh",overflow: "auto",fontSize: "19px",color: "#1A1A1A",lineHeight: "1.688",fontFamily: "Assistant"}}>
                            The Almohads won over the Almoravid dynasty in conquering Morocco. Guided at first by Îbn Toumert, the Almohads declared war against the Almoravids under religious pretext. Their Arabic name, implying the uniqueness "Attawhid", was the object of their proclamation. The architecture and culture - the two key pillars of this dynasty - are still embeded in the emblematic monuments of the city of Marrakech, the Almohad capital, through the redesign of the Koutoubia mosque, whose architecture is inspired from Giralda in Seville. The Almohad dynasty reigned thus for half a century and faded away following a defeat against the Christians in 1212.
                            </Box>
                        </Box>
                        <Box sx={{width:"30%",display:"flex",flexDirection: "column",height: "58vh"}}>
                        <Box style={{width:"50%" , height:"20vh" ,   overflow: "auto",fontSize: "19px",color: "#1A1A1A",lineHeight: "1.688",fontFamily: "Assistant",borderRight:"2px dashed rgb(0 71 70 / 32%)"}}>
                            
                            </Box>
                            <Box style={{textTransform: "uppercase",paddingTop:"4vh",height: "220px", borderRadius: "134px",margin:"0 auto" ,width:"160px",backgroundColor:"rgb(191 39 16 / 94%)",  overflow: "auto",fontSize: "17px",color: "#1A1A1A",lineHeight: "1.688",fontFamily: "Assistant"}}>
                                <Typography variant="h2" gutterBottom  style={{textAlign:"center",color:"white",fontFamily: "merriweather",lineHeight: "30px",fontWeight: "normal",fontStyle: "italic"}} sx={{fontSize: {xs:'13px',sm:'13px',md:'19px',lg:'22px'}}} >ALMOHAD DYNASTY</Typography >
                                <Box style={{display: "flex",alignItems: "center",justifyContent: "center"}}>
                                    <img  src={Img28} alt="" />
                                </Box>
                                <Typography variant="h2" gutterBottom  style={{textAlign:"center",color:"white",fontFamily: "merriweather",fontWeight: "normal",marginTop:"2vh"}} sx={{fontSize: '15px'}} >(1145-1248)</Typography >
                            </Box>
                            <Box style={{width:"50%" , height:"30%" ,   overflow: "auto",fontSize: "19px",color: "#1A1A1A",lineHeight: "1.688",fontFamily: "Assistant",borderRight:"2px dashed rgb(0 71 70 / 32%)"}}>
                            
                            </Box>
                        </Box>
                        <Box sx={{marginTop:"10vh",width:"40%"}} style={{backgroundImage: `url(${Img32})`,position:"relative",  backgroundSize: 'cover',backgroundPosition: 'center'}}>
                        <Typography variant="h2" gutterBottom  style={{position:"absolute",bottom:"3vh",left:"3vh",textAlign:"center",color:"white",fontFamily: "merriweather",lineHeight: "30px",fontWeight: "normal"}} sx={{fontSize: {xs:'19px',sm:'19px',md:'25px',lg:'35px'}}} >The Kasbah of Oudayas</Typography >
                        </Box>

                    </Box>
                </Box>
                <Box style={{backgroundImage: `url(${Img31})`,  backgroundSize: 'contain',backgroundPosition: 'right',backgroundRepeat: "no-repeat"}} sx={{padding:"0 10vw 0"}}>
                
                    <Box style={{display:"flex",justifyContent:"space-evenly"}}>


<Box sx={{marginTop:"10vh",width:"40%"}} style={{backgroundImage: `url(${Img33})`,position:"relative",  backgroundSize: 'cover',backgroundPosition: 'center'}}>
<Typography variant="h2" gutterBottom  style={{position:"absolute",bottom:"3vh",left:"3vh",textAlign:"center",color:"white",fontFamily: "merriweather",lineHeight: "30px",fontWeight: "normal"}} sx={{fontSize: {xs:'19px',sm:'19px',md:'25px',lg:'35px'}}} >Medersa of Salé</Typography >
</Box>


<Box sx={{width:"30%",display:"flex",flexDirection: "column",height: "58vh"}}>
<Box style={{width:"50%" , height:"20vh" ,   overflow: "auto",fontSize: "19px",color: "#1A1A1A",lineHeight: "1.688",fontFamily: "Assistant",borderRight:"2px dashed rgb(0 71 70 / 32%)"}}>
    
    </Box>
    <Box style={{textTransform: "uppercase",paddingTop:"4vh",height: "220px", borderRadius: "134px",margin:"0 auto" ,width:"160px",backgroundColor:"rgb(191 39 16 / 94%)",  overflow: "auto",fontSize: "17px",color: "#1A1A1A",lineHeight: "1.688",fontFamily: "Assistant"}}>
        <Typography variant="h2" gutterBottom  style={{textAlign:"center",color:"white",fontFamily: "merriweather",lineHeight: "30px",fontWeight: "normal",fontStyle: "italic"}} sx={{fontSize: {xs:'13px',sm:'13px',md:'19px',lg:'22px'}}} >DYNASTIE MÉRINIDE</Typography >
        <Box style={{display: "flex",alignItems: "center",justifyContent: "center"}}>
            <img  src={Img28} alt="" />
        </Box>
        <Typography variant="h2" gutterBottom  style={{textAlign:"center",color:"white",fontFamily: "merriweather",fontWeight: "normal",marginTop:"2vh"}} sx={{fontSize: '15px'}} >(1244-1465)</Typography >
    </Box>
    <Box style={{width:"50%" , height:"30%" ,   overflow: "auto",fontSize: "19px",color: "#1A1A1A",lineHeight: "1.688",fontFamily: "Assistant",borderRight:"2px dashed rgb(0 71 70 / 32%)"}}>
    
    </Box>
</Box>

<Box sx={{marginTop:"10vh",width:"40%"}}>
    <Typography variant="h2" gutterBottom  style={{fontFamily: "merriweather",lineHeight: "50px",fontWeight: "normal",fontStyle: "italic"}} sx={{fontSize: {xs:'25px',sm:'25px',md:'30px',lg:'35px'}}} >Marinid dynasty</Typography >
    <Box style={{    height: "40vh",overflow: "auto",fontSize: "19px",color: "#1A1A1A",lineHeight: "1.688",fontFamily: "Assistant"}}>
    Founded by the Amazigh Chief Abou Yahia, with Fez as its capital, the Merinid dynasty overthrew the Almohads by driving them out of the Maghreb. Their reign didn’t last long, the Merinids were defeated by the Portuguese who attacked the coast through Ceuta and the Strait of Gilbraltar. Motivated by the transmission of religious values, the Merinids built several Zaouias, mosques and Koranic medersas such as the one in Salé. Several achievements and foundations symbolize this dynasty, the decorations in wood and stucco, roofs with glazed tiles, glazed ceramics, etc. The necropolis of Chellah, located in Rabat, contains vestiges that best represents the wealth of this dynasty in terms of culture, history, architecture and religious institutions.
    </Box>
</Box>
</Box>


<Box style={{display:"flex",justifyContent:"space-evenly"}}>

<Box sx={{marginTop:"10vh",width:"40%"}}>
    <Typography variant="h2" gutterBottom  style={{fontFamily: "merriweather",lineHeight: "50px",fontWeight: "normal",fontStyle: "italic"}} sx={{fontSize: {xs:'25px',sm:'25px',md:'30px',lg:'35px'}}} >Saadian dynasty</Typography >
    <Box style={{    height: "40vh",overflow: "auto",fontSize: "19px",color: "#1A1A1A",lineHeight: "1.688",fontFamily: "Assistant"}}>
    The Saadian dynasty had overthrown the Merinids and initially had Fez as its capital before winning Marrakech. They had declared war against the Portuguese and recovered several cities including the city of Agadir. The Saadians took Spain as their ally to protect themselves against Turkish threats. During the reign of the Saadians, Morocco experienced several years of glory which was demonstrated through culture, knowledge and wealth. The Saadians had endowed themselves with the gold of Sudan after defeating the African Empire of Songhai. They channelled their exploits by building several artistic artefacts. In Fez, they built the Borjs and gave a rejuvenation to the Al Qarawiyine mosque. In Marrakech, they built the tombs of the Saadians, the Ben Youssef medersa and the El Badiî Palace.
    </Box>
</Box>




<Box sx={{width:"30%",display:"flex",flexDirection: "column",height: "58vh"}}>
<Box style={{width:"50%" , height:"20vh" ,   overflow: "auto",fontSize: "19px",color: "#1A1A1A",lineHeight: "1.688",fontFamily: "Assistant",borderRight:"2px dashed rgb(0 71 70 / 32%)"}}>
    
    </Box>
    <Box style={{textTransform: "uppercase",paddingTop:"4vh",height: "220px", borderRadius: "134px",margin:"0 auto" ,width:"160px",backgroundColor:"rgb(191 39 16 / 94%)",  overflow: "auto",fontSize: "17px",color: "#1A1A1A",lineHeight: "1.688",fontFamily: "Assistant"}}>
        <Typography variant="h2" gutterBottom  style={{textAlign:"center",color:"white",fontFamily: "merriweather",lineHeight: "30px",fontWeight: "normal",fontStyle: "italic"}} sx={{fontSize: {xs:'13px',sm:'13px',md:'19px',lg:'22px'}}} > SAADIAN DYNASTIE</Typography >
        <Box style={{display: "flex",alignItems: "center",justifyContent: "center"}}>
            <img  src={Img28} alt="" />
        </Box>
        <Typography variant="h2" gutterBottom  style={{textAlign:"center",color:"white",fontFamily: "merriweather",fontWeight: "normal",marginTop:"2vh"}} sx={{fontSize: '15px'}} >(1554-1659)</Typography >
    </Box>
    <Box style={{width:"50%" , height:"30%" ,   overflow: "auto",fontSize: "19px",color: "#1A1A1A",lineHeight: "1.688",fontFamily: "Assistant",borderRight:"2px dashed rgb(0 71 70 / 32%)"}}>
    
    </Box>
</Box>
<Box sx={{marginTop:"10vh",width:"40%"}} style={{backgroundImage: `url(${Img34})`,position:"relative",  backgroundSize: 'cover',backgroundPosition: 'center'}}>
<Typography variant="h2" gutterBottom  style={{position:"absolute",bottom:"3vh",left:"3vh",textAlign:"center",color:"white",fontFamily: "merriweather",lineHeight: "30px",fontWeight: "normal"}} sx={{fontSize: {xs:'19px',sm:'19px',md:'25px',lg:'35px'}}} >Saadian Tombs</Typography >
</Box>

</Box>
<Box style={{display:"flex",justifyContent:"space-evenly",paddingBottom:"15vh"}}>


<Box sx={{marginTop:"10vh",width:"40%"}} style={{backgroundImage: `url(${Img35})`,position:"relative",  backgroundSize: 'cover',backgroundPosition: 'center'}}>
<Typography variant="h2" gutterBottom  style={{position:"absolute",bottom:"3vh",left:"3vh",textAlign:"center",color:"white",fontFamily: "merriweather",lineHeight: "30px",fontWeight: "normal"}} sx={{fontSize: {xs:'19px',sm:'19px',md:'25px',lg:'35px'}}} >Hassan II Mosque</Typography >
</Box>


<Box sx={{width:"30%",display:"flex",flexDirection: "column",height: "58vh"}}>
<Box style={{width:"50%" , height:"20vh" ,   overflow: "auto",fontSize: "19px",color: "#1A1A1A",lineHeight: "1.688",fontFamily: "Assistant",borderRight:"2px dashed rgb(0 71 70 / 32%)"}}>
    
    </Box>
    <Box style={{textTransform: "uppercase",paddingTop:"4vh",height: "200px", borderRadius: "134px",margin:"0 auto" ,width:"160px",backgroundColor:"rgb(191 39 16 / 94%)",  overflow: "auto",fontSize: "17px",color: "#1A1A1A",lineHeight: "1.688",fontFamily: "Assistant"}}>
        <Typography variant="h2" gutterBottom  style={{textAlign:"center",color:"white",fontFamily: "merriweather",lineHeight: "30px",fontWeight: "normal",fontStyle: "italic"}} sx={{fontSize: {xs:'13px',sm:'13px',md:'19px',lg:'22px'}}} >ALAOUITE DYNASTY</Typography >
        <Box style={{display: "flex",alignItems: "center",justifyContent: "center"}}>
            <img  src={Img28} alt="" />
        </Box>
        <Typography variant="h2" gutterBottom  style={{textAlign:"center",color:"white",fontFamily: "merriweather",fontWeight: "normal",marginTop:"2vh"}} sx={{fontSize: '15px'}} >(1666-present)</Typography >
    </Box>

</Box>

<Box sx={{marginTop:"10vh",width:"40%"}}>
    <Typography variant="h2" gutterBottom  style={{fontFamily: "merriweather",lineHeight: "50px",fontWeight: "normal",fontStyle: "italic"}} sx={{fontSize: {xs:'25px',sm:'25px',md:'30px',lg:'35px'}}} >Alaouite dynasty</Typography >
    <Box style={{    height: "40vh",overflow: "auto",fontSize: "19px",color: "#1A1A1A",lineHeight: "1.688",fontFamily: "Assistant"}}>
    The Saadians were dethroned by the Alaouite dynasty. Originating from Tafilalt, the Alaouite dynasty drove out the Saadians for the sake of power. After taking Fez as a capital, itw as up to Meknes under the reign of Sultan Moulay Ismail, the finally to Rabat, which has been the current capital of Morocco since 1912. Thanks to this dynasty, the city of Fez was rejuvenates, embellishing the whole city and creating protective walls such as the famous Bab El-Mansour gate. The dynasty continued its reign until today. Muhammad VI is the twenty-third ruler of this succession, ensuring the unification of the Kingdom and the transmission of all religious values.
    </Box>
</Box>
</Box>

                </Box>
                <Box style={{position:"relative",backgroundImage: `url(${Img36})`,  backgroundSize: 'cover',backgroundPosition: 'center',backgroundRepeat: "no-repeat",height:"100vh"}} sx={{padding:"0 10vw 0"}}>
                    <Box style={{overflow:"hidden",padding:"10vh auto",backgroundColor:'#5C190F',borderRadius: "200px",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",height:"80vh"}} sx={{width:{sm:"40%",md:"33%",lg:"25%"}}}>
                    <Box style={{display: "flex",flexDirection:"column",padding:"10vh 0"}}>
                        <Box style={{textAlign: "center"}}>
                    <img  src={Img37} alt="" />
                    </Box>
                    <Box style={{textAlign: "center"}}>
                    <img  src={Img38} alt="" />
                    </Box>
                    <Box style={{marginBottom:"5vh",fontSize:"17px",textAlign: "center",color:"white",fontWeigth:"bold" ,fontWeight: "600"}}>
                    Stay informed on our latest news!
                    </Box>

                    <Box style={{position:"relative",margin:"0 auto 3vh",height:"7.5vh",color:'#5C190F',width:"70%",textAlign: "center",backgroundColor:"white"}}>
                        <Typography style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"100%",fontWeight:"bold"}}>Enter Your address E-mail</Typography>
                        </Box>
                    <Box style={{textAlign: "center",marginBottom:"3vh"}}>
                    <Chip label="Send" style={{color:"white",padding:"3vh",fontSize:"15px",fontWeight:"bold",backgroundColor:"#a33c2d"}} onClick={handleClick} />
                    </Box>
                    </Box>
                    </Box>
                </Box>
                
            <Box style={{position:"relative",fontSize: '19px',color: '#5C190F',textAlign:"center",backgroundColor: '#F1EBE6',height:"15vh"}}>
            <img  src={Img40} alt="" style={{position:"absolute",top:"100%",left:"50%",transform:"translate(-50%,-50%)  scale(0.75)",zIndex:"10"}} />
            </Box>
            <Divider  sx={{backgroundColor:'rgb(191 39 16 / 94%)',zIndex:"5"}}  />
                <Box   display="flex"  justifyContent="space-evenly"  sx={{rowGap:'15vh',columnGap:'5vw',flexWrap: "wrap",alignItems:"center",backgroundColor: '#F1EBE6',padding:"12vh 10vw"}}>
                    <Box data-aos="zoom-in" >
                    <Typography sx={{fontWeight:"bold",fontSize: '23px',color: '#5C190F',fontFamily: 'Assistant',lineHeight: "23px"}}>lorem ipsum target</Typography>
                        <br/>
                        <StyledTypography >lorem ipsum target</StyledTypography>
                        <br/>
                        <StyledTypography >lorem ipsum </StyledTypography>
                        <br/>
                        <StyledTypography >lorem ipsum target</StyledTypography>
                        <br/>
                        <StyledTypography >lorem ipsum </StyledTypography>
                        <br/>
                        <StyledTypography >Tanger ,2022</StyledTypography>
                    </Box>
                    <Box data-aos="zoom-in" >
                        <Typography sx={{fontWeight:"bold",fontSize: '23px',color: '#5C190F',fontFamily: 'Assistant',lineHeight: "23px"}}>lorem ipsum target</Typography>
                        <br/>
                        <StyledTypography >lorem ipsum target</StyledTypography>
                        <br/>
                        <StyledTypography >lorem ipsum target</StyledTypography>
                        <br/>
                        <StyledTypography >lorem ipsum </StyledTypography>
                        <br/>
                        <StyledTypography >lorem ipsum target</StyledTypography>
                        <br/>
                        <StyledTypography >Tanger ,2022</StyledTypography>
                    </Box>
                    <Box data-aos="zoom-in" >
                        <Typography sx={{fontWeight:"bold",fontSize: '23px',color: '#5C190F',fontFamily: 'Assistant',lineHeight: "23px"}}>lorem ipsum target</Typography>
                        <br/>
                        <StyledTypography>lorem ipsum target</StyledTypography>
                        <br/>
                        <StyledTypography>lorem ipsum </StyledTypography>
                        <br/>
                        <StyledTypography >lorem ipsum </StyledTypography>
                        <br/>
                        <StyledTypography >lorem ipsum target</StyledTypography>
                        <br/>
                        <StyledTypography>Tanger ,2022</StyledTypography>
                    </Box>
                    <Box data-aos="zoom-in" >
                        <Typography sx={{fontWeight:"bold",fontSize: '23px',color: '#5C190F',fontFamily: 'Assistant',lineHeight: "23px"}}>lorem ipsum target</Typography>
                        <br/>
                        <StyledTypography>lorem ipsum target</StyledTypography>
                        <br/>
                        <StyledTypography>lorem ipsum </StyledTypography>
                        <br/>
                        <StyledTypography >lorem ipsum target</StyledTypography>
                        <br/>
                        <StyledTypography >lorem ipsum </StyledTypography>
                        <br/>
                        <StyledTypography>Tanger ,2022</StyledTypography>
                    </Box>
            </Box>
            <Divider  sx={{backgroundColor:'rgb(191 39 16 / 94%)'}}  />
            <Box style={{fontSize: '16px',color: '#5C190F',textAlign:"center",backgroundColor: '#F1EBE6',padding:"4vh 0"}}>
            Copyright © 2023, Logiciel et Systeme Intelligent.
            </Box>
                </>
    )
}

export default Gallery