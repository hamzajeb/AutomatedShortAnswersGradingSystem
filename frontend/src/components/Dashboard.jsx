import { AppBar, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import { useState, useEffect, useRef } from "react";
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Img7 from './img/img7.jpg';
import {useQuery} from '@apollo/client';
import { Route, Navigate } from 'react-router-dom';
import "./css/Navbar.css";
import { Pie } from 'react-chartjs-2';
import { GET_ALL_SCORES } from '../GraphQl/Queries';
import Card from './Card'
import AverageScoresChart from './AverageScoresChart'




const findBestUser = (scores) => {
  const questionCounts = {};

  Object.values(scores).forEach((score) => {
    const { userName } = score;
    if (questionCounts[userName]) {
      questionCounts[userName]++;
    } else {
      questionCounts[userName] = 1;
    }
  });

  let maxQuestionCount = 0;
  let userName = null;
  let image = null;

  Object.entries(questionCounts).forEach(([name, questionCount]) => {
    if (questionCount > maxQuestionCount) {
      maxQuestionCount = questionCount;
      userName = name;
      image = scores.find((score) => score.userName === userName)?.image;
    }
});

  return {userName,image,maxQuestionCount};
};


const findLoser = (scores) => {
  const questionCounts = {};

  Object.values(scores).forEach((score) => {
    const { userName } = score;
    if (questionCounts[userName]) {
      questionCounts[userName]++;
    } else {
      questionCounts[userName] = 1;
    }
  });

  let minQuestionCount = Infinity;
  let userName = null;
  let image = null;

  Object.entries(questionCounts).forEach(([name, questionCount]) => {
    if (questionCount < minQuestionCount) {
      minQuestionCount = questionCount;
      userName = name;
      image = scores.find((score) => score.userName === userName)?.image;
    }
  });

  return {userName,image,minQuestionCount};
};
const PieChart = ({ countById }) => {
 
  const data = {
    labels: Object.keys(countById).map((key) => `Question ${key}`),
    datasets: [
      {
        data: Object.values(countById),
        backgroundColor: ['#9e3822', '#f0d1a4', '#927469','#df9b61','#3c3132','#d1a08c','#dae2de','#8aa5b1','#4e361d','#fda526'], // Colors of the chart sectors
      },
    ],
  };

  return <Pie data={data} />;
};




function Dashboard() {
  const [image, setImage] = useState(null);
  const [TotalMax, setTotalMax] = useState(null);
  const [nameBest, setNameBest] = useState(null);
  const [userBestScore, setUserBestScore] = useState(null);
  const [nombreLoser, setnombreLoser] = useState(null);
  const [nombreBest, setnombreBest] = useState(null);
  const [nameLoser, setNameLoser] = useState(null);
  const [imgBest, setImgBest] = useState(null);
  const [imgLoser, setImgLoser] = useState(null);
  const [chartData, setChartData] = useState({});
  const [averageScores, setaverageScores] = useState({});
    const {error,loading,data}=useQuery(GET_ALL_SCORES,  {
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
      
      useEffect(() => {
        // console.log(data)
        if(Cookies.get("token")){
          if ( data) {
        
            const countById = data.scoresAlluser.reduce((count, score) => {
              const { idQuestion } = score;
              count[idQuestion] = (count[idQuestion] || 0) + 1;
              return count;
            }, {});
            console.log(data)
            setChartData(countById);
            
            const nameBest = findBestUser(data.scoresAlluser).userName;
            const imgBest = findBestUser(data.scoresAlluser).image;
            const nombreBest = findBestUser(data.scoresAlluser).maxQuestionCount+" Questions";
            
            setNameBest(nameBest);
            setImgBest(imgBest);
            setnombreBest(nombreBest)

            const nameLoser = findLoser(data.scoresAlluser).userName;
            const imgLoser = findLoser(data.scoresAlluser).image;
            const nombreLoser = findLoser(data.scoresAlluser).minQuestionCount+" Questions";
            
            setNameLoser(nameLoser);
            setImgLoser(imgLoser);
            setnombreLoser(nombreLoser)
         

            const averageScores = {};

data.scoresAlluser.forEach(score => {
  const { idQuestion, score: scoreValue } = score;

  if (!averageScores[idQuestion]) {
    averageScores[idQuestion] = { total: 0, count: 0, average: 0 };
  }

  averageScores[idQuestion].total += parseInt(scoreValue);
  averageScores[idQuestion].count += 1;
  averageScores[idQuestion].average = averageScores[idQuestion].total / averageScores[idQuestion].count;
});

console.log(averageScores);

setaverageScores(averageScores)


let userBestScore = '';
let TotalMax = -Infinity;
let image = null;

const userScores = {};

data.scoresAlluser.forEach(score => {
  const { userName, score: scoreValue } = score;

  if (!userScores[userName]) {
    userScores[userName] = { total: 0, count: 0, average: 0 };
  }

  userScores[userName].total += parseInt(scoreValue);
  userScores[userName].count += 1;
});

Object.keys(userScores).forEach(userName => {
  const { total, count } = userScores[userName];
  

  if (total > TotalMax) {
    TotalMax = total ;
    userBestScore = userName;
    image = data.scoresAlluser.find((score) => score.userName === userName)?.image;
  }
});


setUserBestScore(userBestScore)
setImage(image)
setTotalMax(TotalMax)

          }
        }
       }, [data]);
       

       

       
    return (
      
        <Box>
      
      <div style={{display: 'flex',marginTop:'10%'}}>
      <div style={{width: '50%', marginTop: '5%',boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",marginLeft: '6%',marginBottom: '5%'}}>
      {Object.keys(chartData).length > 0 ? (
        <PieChart style={{padding: '30px'}} countById={chartData}  />
      ) : (
        <div>Loading...</div>
      )}
      
      <h5 style={{ textAlign: 'center' }}>Questions utilisation</h5>
      </div>

      <div style={{width: '50%', marginTop: '5%',marginRight: '6%',marginBottom: '5%',marginLeft: '4%',boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
      <AverageScoresChart averageScores={averageScores} />
      </div>
      </div>
     

      <div style={{marginTop:'4%',display: 'flex', marginLeft: '8%',marginRight: '8%',marginBottom: '5%'}}>
      <Card imageUrl={`data:image/jpeg;base64,${imgLoser}`} title={nameLoser} color="white" contenu="L'utilisateur qui a donné le moins de réponses" nombre={nombreLoser}/>
      <Card imageUrl={`data:image/jpeg;base64,${imgBest}`} title={nameBest} color="#fceacf" contenu=" L'utilisateur qui a donné le plus grand nombre de réponses" nombre={nombreBest}/>
      </div>
      <div style={{ marginLeft: '8%',marginRight: '8%',marginBottom: '5%'}}>
      <Card imageUrl={`data:image/jpeg;base64,${image}`} title={userBestScore} color="#e3fae7" contenu=" L'utilisateur qui a eu le meilleur score" nombre={TotalMax} unite=" Points"/>
      </div>
      
 
      
    



      
        </Box>
        
    );
}

export default Dashboard;