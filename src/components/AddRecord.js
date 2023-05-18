import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Home from './Home';
import {abi, contractAddress} from "./constants";
import { ethers } from "ethers";
function AddRecord() {
  async function getcontract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    return contract;
  }
  
  const registerrecord = async(event)=>{
    event.preventDefault();
    console.log("inside registerrecord");
    // const address=event.target.address.value;
    console.log(event.target.doctorid);
    const doctorid=event.target.doctorid.value;
    const patientid=event.target.patientid.value;
    const recordid=event.target.recordid.value;
    const diagnosis=event.target.diagnosis.value;
    const treatment=event.target.treatment.value;
    const prescription=event.target.prescription.value;
    const tests=event.target.tests.value;
    const date=event.target.date.value;
    console.log("health record values are: ")
    console.log("=====================================");
    console.log("="+doctorid+"="+patientid+"="+recordid+"="+diagnosis+"="+treatment+"="+prescription+"="+tests+"="+date);
    console.log("=====================================");



    console.log("getting contract for addrecord");
    const contract = await getcontract();
    console.log("adding record");
    const  transaction = await contract.addRecord(recordid,patientid,doctorid,diagnosis,treatment,prescription,tests,date);
    console.log("added record");
    console.log(transaction);


    
  }
  

  
  return (
    <div className="container">

   <Home/>
    <Form   onSubmit= {registerrecord}>
    <Form.Group className="mb-6" controlId="doctorid">
      <Form.Label>Enter Doctor Id</Form.Label>
      <Form.Control  name="doctorid" size="sm"  type="number" placeholder="Enter id" />
    </Form.Group>
    
 
    <Form.Group className="mb-6" controlId="Patientid">
      <Form.Label>Enter Patient Id</Form.Label>
      <Form.Control  name="patientid" size="sm"  type="number" placeholder="Enter id" />
    </Form.Group>
    <Form.Group className="mb-6" controlId="recordid">
      <Form.Label>Enter record Id</Form.Label>
      <Form.Control  name="recordid" size="sm"  type="number" placeholder="Enter id" />
    </Form.Group>
    <Form.Group className="mb-6" controlId="Diagnosis">
      <Form.Label>Diagnosis</Form.Label>
      <Form.Control name="diagnosis" size="sm" type="text" placeholder="Enter Diagnosis" />
    </Form.Group>
    <Form.Group className="mb-6" controlId="treatment">
      <Form.Label>treatment</Form.Label>
      <Form.Control name="treatment" size="sm"  type="text" placeholder="treatment" />
    </Form.Group>
    <Form.Group className="mb-6" controlId="prescription">
      <Form.Label>prescription</Form.Label>
      <Form.Control   name="prescription"size="sm" type="text" placeholder="prescription" />
    </Form.Group>
    <Form.Group className="mb-6" controlId="tests">
      <Form.Label>tests</Form.Label>
      <Form.Control   name="tests" size="sm" type="text" placeholder="tests" />
    </Form.Group>    <Form.Group className="mb-6" controlId="date">
      <Form.Label>date</Form.Label>
      <Form.Control   name="date"size="sm"  type="text" placeholder="date" />
    </Form.Group>
    
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  </div>
  );
}

export default AddRecord;