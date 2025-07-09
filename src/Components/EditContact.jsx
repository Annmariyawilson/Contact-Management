import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { updateContact as updateContactApi } from "../Services/AllApis";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Spinner,
  FloatingLabel,
} from "react-bootstrap";

function EditContact({ contact, onCancel, onUpdate = () => {} }) {
  const [updatedContact, setUpdatedContact] = useState({
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUpdatedContact({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedContact((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const result = await updateContactApi(contact.id, updatedContact);
    const updated = result?.data || result; // handle both cases
    toast.success("Contact updated successfully!");
    onUpdate(updated); 
    onCancel(); 
  } catch (error) {
    toast.error("Failed to update contact.");
    console.error("Update contact error:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="modal-backdrop">
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <Row className="justify-content-center w-100">
          <Col xs={12} md={8} lg={6} xl={5}>
            <Card className="border-0 shadow-lg overflow-hidden">
              <Card.Header
                className="py-3"
                style={{ backgroundColor: "#4e44dc" }}
              >
                <h4 className="mb-0 text-center text-white">Edit Contact</h4>
              </Card.Header>
              <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                  <FloatingLabel
                    controlId="formName"
                    label="Full Name"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      name="name"
                      value={updatedContact.name}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      className="border-top-0 border-start-0 border-end-0 rounded-0"
                      style={{ borderBottom: "2px solid #dee2e6" }}
                    />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="formEmail"
                    label="Email Address"
                    className="mb-3"
                  >
                    <Form.Control
                      type="email"
                      name="email"
                      value={updatedContact.email}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      className="border-top-0 border-start-0 border-end-0 rounded-0"
                      style={{ borderBottom: "2px solid #dee2e6" }}
                    />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="formPhone"
                    label="Phone Number"
                    className="mb-4"
                  >
                    <Form.Control
                      type="text"
                      name="phone"
                      value={updatedContact.phone}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      className="border-top-0 border-start-0 border-end-0 rounded-0"
                      style={{ borderBottom: "2px solid #dee2e6" }}
                    />
                  </FloatingLabel>

                  <div className="d-flex justify-content-end gap-3 pt-2">
                    <Button
                      variant="outline-secondary"
                      onClick={onCancel}
                      className="px-4 rounded-3"
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={loading}
                      className="px-4 rounded-3"
                      style={{ backgroundColor: "#4e44dc", border: "none" }}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

EditContact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
};

export default EditContact;
