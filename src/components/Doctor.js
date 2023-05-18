import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Home from "./Home";
import { abi, contractAddress } from "./constants";
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import PatientRecordTable from "./PatientRecordTable";
import DoctorProfile from "./DoctorProfile";

function Doctor(props) {
  const [userid, setuserid] = useState([]);
  const [record, setRecord] = useState([]);
  useEffect(() => {
    setuserid(props.location.state.userid);
  }, []);
  console.log(userid);

  const [pdata, setpdata] = useState([]);
  async function getcontract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    return contract;
  }
  useEffect(() => {
    const login = async () => {
      const contract = await getcontract();
      const result = await contract.docotorOfId(userid);
      setpdata(result);
      console.log(pdata);
    };

    login();
  }, [userid]);

  const getPatientRecords = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    // const password=event.target.password.value;
    console.log(username);
    console.log("getting contract in doctor login");
    const contract = await getcontract();
    console.log("got contract");

    console.log("Patient  record fetched");
    console.log(
      "================================================================"
    );
    const record = await contract.getPatientRecords(username);
    console.log(record);
    console.log("length=", record.length);
    setRecord(record);
  };

  return (
    <div className="container">
      <Home />
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Records</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <DoctorProfile record={pdata} />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <Form onSubmit={getPatientRecords}>
                  <Form.Group className="mb-6" controlId="doctorid">
                    <Form.Label>Enter PatientId</Form.Label>
                    <Form.Control
                      name="username"
                      size="sm"
                      type="number"
                      placeholder="Enter userid"
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
                <PatientRecordTable record={record} />
                {/* <PatientRecordTable record={record} /> */}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default Doctor;
