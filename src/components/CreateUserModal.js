import React from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {createUser} from "../services/UserService";

const CreateUserModal = (props) => {

    const handleSubmit = (e) => {
      e.preventDefault();
      createUser(e.target)
          .then((res) => {
                    alert(res);
                    props.setUpdated(true);
              },
              (err) => {
                alert(err);
          });
      props.onHide();
    };

    return(
        <div className="container">
            <Modal {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                <Modal.Header>
                  <Modal.Title id="contained-modal-title-vcenter">Create user</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="first_name">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control type="text" name="First name" required placeholder="" />
                                </Form.Group>
                                <Form.Group controlId="last_name">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control type="text" name="Last name" required placeholder="" />
                                </Form.Group>
                                <Form.Group controlId="age">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control type="text" name="Age" required placeholder="" />
                                </Form.Group>
                                <Form.Group controlId="gender">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control type="text" name="Gender" required placeholder="" />
                                </Form.Group>
                                <Form.Group controlId="city">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="text" name="City" required placeholder="" />
                                </Form.Group>
                                <Form.Group>
                                    <br/>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" type="submit" onClick={props.onHide}>
                        Close
                </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CreateUserModal;