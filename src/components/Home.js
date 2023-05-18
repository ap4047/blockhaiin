import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {abi,contractAddress} from './constants';
// import { ethers } from "ethers";

function Home() {
 
  const  connect = async ()=>{
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("connected");
        document.getElementById("connectbtn").innerHTML="connected";
      } else {
        console.log("Intall metamask");
      }
}






  
  return (
    <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        
        <Navbar.Brand href="#home">MediChain</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
           
            <NavDropdown title="Patient" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/patientlogin">Patient Login</NavDropdown.Item>
              <NavDropdown.Item href="/addpatient">
               Patient Registration
              </NavDropdown.Item>
              {/* <NavDropdown.Item href=>AddPatient</NavDropdown.Item> */}
            
            </NavDropdown>
        
           
           <NavDropdown title="Doctor" id="collasible-nav-dropdown">
             <NavDropdown.Item href="/doctorlogin">Doctor Login</NavDropdown.Item>
        
             <NavDropdown.Item href="/adddoctor">Register Doctor</NavDropdown.Item>
             <NavDropdown.Item href="/addrecord">Add Record</NavDropdown.Item>
           </NavDropdown>
           
         </Nav>
         <Nav className="d-flex m-3">
         <Button variant="outline-success" onClick={connect} id="connectbtn">Connect</Button>
         </Nav>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>

   
  
   </div>
  );
}

export default Home;