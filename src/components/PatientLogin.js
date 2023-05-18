import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Home from './Home';
import {abi,contractAddress} from './constants';
import { ethers } from "ethers";
import { useHistory } from 'react-router-dom';
function PatientLogin() {
  async function getcontract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    return contract;
  }
  const history=useHistory();
  const Login = async(event)=>{
    event.preventDefault();
    
    const userid=event.target.userid.value;
    const password=event.target.password.value;
    console.log(userid,password);
    const contract = await getcontract();
    const result = contract.getPatient(userid);
    console.log(result);
    window.alert("patient login successfull");
    history.push({pathname:"/patient",state:{userid:userid}});

    

    
  }
  

  
  return (
    <div className="container">

   <Home/>
    <Form   onSubmit={Login}>
   

    <Form.Group className="mb-6" controlId="doctorid">
      <Form.Label>Enter UserId</Form.Label>
      <Form.Control  name="userid" size="sm"  type="number" placeholder="Enter userid" />
    </Form.Group>
   
    <Form.Group className="mb-6" controlId="tests">
      <Form.Label>password</Form.Label>
      <Form.Control   name="password" size="sm" type="text" placeholder="password" />
    </Form.Group>    
    
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  </div>
  );
}

export default PatientLogin;