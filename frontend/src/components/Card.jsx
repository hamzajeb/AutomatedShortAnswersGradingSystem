import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.css';

export default function Card({ imageUrl, title, color , contenu, nombre, unite}) {
  return (
       
          <MDBContainer>
               <div style={{boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",borderRadius: '20px'}}>
            <MDBRow className="justify-content-center">
              <MDBCol >
                <MDBCard style={{ border: 'white 15px', backgroundColor: color }}>
                  <MDBCardBody className="p-4 text-black">
                    <div>
                      <MDBTypography tag='h6' style={{color:"#b76536"}}>{contenu}</MDBTypography>
                     
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <div className="flex-shrink-0">
                        <MDBCardImage
                          style={{ width: '120px' ,height: '120px'}}
                          className="img-fluid rounded-circle border border-2"
                          src={imageUrl}
                          alt='Generic placeholder image'
                          fluid />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <div className="d-flex flex-row align-items-center mb-2">
                          <h3 className="mb-0 me-2" style={{color:"#b76536"}}>{title}</h3>
                          
    
                        </div>
                      
                      </div>
                    </div>

                    <hr />
                <MDBCardText style={{color:"#b76536"}}>{nombre} {unite} </MDBCardText>
                   
                  
                  
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
            </div>
          </MDBContainer>
        
  );
}

