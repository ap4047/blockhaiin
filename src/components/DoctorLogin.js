import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Home from './Home';
import {abi,contractAddress} from './constants';
import { ethers } from "ethers";
// import Doctor from "./Doctor";
import { useHistory } from 'react-router-dom';
function DoctorLogin() {
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
    console.log("getting contract in doctor login");
    const contract = await getcontract();
    console.log("got contract");
    const result = contract.docotorOfId(userid);
    if(result)
    {
      console.log("doctor record fetched",result);
      window.alert("doctor login succesfull");
      const resultPromise = Promise.resolve(result);
resultPromise.then(result => {
  console.log(result[0],result[1],result[2],result[3],result[4],result[5],result[6]);
  console.log(result.contact._hex);
  console.log(parseInt(result.contact._hex,16));
});
      
      history.push({pathname:"/doctor",state:{userid:userid}});
    }else{
      window.alert("login unsuccessfull");
     
    }
   

    
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

export default DoctorLogin;