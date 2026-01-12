import React, { Component } from 'react';

import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';

import { PlusCircle, X, Upload, Globe, Building, GeoAlt, Person, Envelope, TextLeft } from 'react-bootstrap-icons';

import 'bootstrap/dist/css/bootstrap.min.css';

import { countries, placeData } from '../data/Countries';

import './addpost.css';

class AddPost extends Component {
  constructor(props) {
    super(props);
    
    // Initialize from sessionStorage or empty state
    let obj = JSON.parse(sessionStorage.getItem('addPostDraft'));
    this.state = obj ? obj : {
      category: 'Place',
      country: 'Pakistan',
      city: '',
      title: '',
      name: '',
      email: '',
      desc: '',
      image: null,
      errors: {},
      isSubmitting: false
    };

    // Initialize cities based on country
    this.state.cities = this.getCities(this.state.country);
  }

  getCities = (country) => {
    if (country && placeData[country]) {
      return placeData[country];
    }
    return [];
  };

  handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    let newState = {
      ...this.state,
      [name]: files ? files[0] : value,
      errors: { ...this.state.errors, [name]: null }
    };

    // If country changes, update cities
    if (name === 'country') {
      newState.cities = this.getCities(value);
      newState.city = ''; // Reset city when country changes
    }

    this.setState(newState, () => {
      // Save to sessionStorage
      const { errors, cities, isSubmitting, ...draft } = this.state;
      sessionStorage.setItem('addPostDraft', JSON.stringify(draft));
    });
  };

  validateForm = () => {
    const errors = {};
    const { title, desc, email, category } = this.state;

    if (!title.trim()) {
      errors.title = 'Title is required';
    } else if (title.length < 5) {
      errors.title = 'Title must be at least 5 characters';
    }

    if (!desc.trim()) {
      errors.desc = 'Description is required';
    } else if (desc.length < 50) {
      errors.desc = 'Description must be at least 50 characters';
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!category) {
      errors.category = 'Please select a category';
    }

    return errors;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = this.validateForm();
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    this.setState({ isSubmitting: true });

    // Prepare post data
    const postData = {
      category: this.state.category,
      country: this.state.country,
      city: this.state.city,
      title: this.state.title,
      name: this.state.name || 'Anonymous',
      email: this.state.email,
      body: this.state.desc,
      // In a real app, you would upload the image here
      image: this.state.image
    };

    try {
      // Call the parent's add function
      this.props.addButtonClick(postData);
      
      // Clear form and sessionStorage on success
      this.clearForm();
      
    } catch (error) {
      this.setState({
        errors: { submit: 'Failed to submit post. Please try again.' },
        isSubmitting: false
      });
    }
  };

  clearForm = () => {
    const emptyState = {
      category: 'Place',
      country: 'Pakistan',
      city: '',
      title: '',
      name: '',
      email: '',
      desc: '',
      image: null,
      errors: {},
      isSubmitting: false,
      cities: this.getCities('Pakistan')
    };
    
    this.setState(emptyState);
    sessionStorage.removeItem('addPostDraft');
  };

  handleClose = () => {
    this.clearForm();
    this.props.onClose();
  };

  renderCategoryIcon = (category) => {
    switch(category) {
      case 'Place': return <GeoAlt size={20} />;
      case 'Hotel': return <Building size={20} />;
      case 'Food': return <span>🍽️</span>;
      default: return <Globe size={20} />;
    }
  };

  render() {
    const { trigger } = this.props;
    const { category, country, city, title, name, email, desc, errors, isSubmitting, cities } = this.state;

    return (
      <Modal
        show={trigger}
        onHide={this.handleClose}
        centered
        backdrop="static"
        className="add-post-modal"
        size="lg"
      >
        <Modal.Header className="modal-header-custom">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="d-flex align-items-center gap-2">
              <PlusCircle size={24} />
              <div>
                <Modal.Title className="modal-title-custom mb-0">
                  Add New Post
                </Modal.Title>
                <small className="text-white-50">Share your travel experiences with the community</small>
              </div>
            </div>
            <Button
              variant="link"
              onClick={this.handleClose}
              className="close-btn-custom p-0"
            >
              <X size={24} color="white" />
            </Button>
          </div>
        </Modal.Header>

        <Modal.Body className="modal-body-custom p-4">
          {errors.submit && (
            <Alert variant="danger" className="mb-4">
              {errors.submit}
            </Alert>
          )}

          <Form onSubmit={this.handleSubmit} id="addPostForm">
            {/* Category Selection */}
            <div className="mb-4">
              <h6 className="mb-3 fw-medium">What are you sharing?</h6>
              <div className="d-flex flex-wrap gap-2">
                {['Place', 'Hotel', 'Food'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`category-select-btn ${
                      category === cat ? 'active' : ''
                    }`}
                    onClick={() => this.handleInputChange({
                      target: { name: 'category', value: cat }
                    })}
                  >
                    <span className="category-icon">
                      {this.renderCategoryIcon(cat)}
                    </span>
                    <span className="category-label">{cat}</span>
                  </button>
                ))}
              </div>
              {errors.category && (
                <div className="text-danger small mt-1">{errors.category}</div>
              )}
            </div>

            {/* Location Details */}
            <div className="mb-4">
              <h6 className="mb-3 fw-medium">Location Details</h6>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-medium d-flex align-items-center gap-2">
                      <Globe size={16} />
                      Country
                    </Form.Label>
                    <Form.Select
                      name="country"
                      value={country}
                      onChange={this.handleInputChange}
                      className="form-select-custom"
                    >
                      {countries.map((countryName, index) => (
                        <option key={index} value={countryName}>
                          {countryName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-medium d-flex align-items-center gap-2">
                      <GeoAlt size={16} />
                      City
                    </Form.Label>
                    <Form.Select
                      name="city"
                      value={city}
                      onChange={this.handleInputChange}
                      className="form-select-custom"
                      isInvalid={!!errors.city}
                    >
                      <option value="">Select a city</option>
                      {cities.map((cityName, index) => (
                        <option key={index} value={cityName}>
                          {cityName}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.city && (
                      <Form.Control.Feedback type="invalid">
                        {errors.city}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </div>

            {/* Post Details */}
            <div className="mb-4">
              <h6 className="mb-3 fw-medium">Post Details</h6>
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">Post Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={title}
                  onChange={this.handleInputChange}
                  placeholder="Give your post a descriptive title"
                  isInvalid={!!errors.title}
                  className="form-control-custom"
                />
                {errors.title && (
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-medium d-flex align-items-center gap-2">
                  <TextLeft size={16} />
                  Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="desc"
                  value={desc}
                  onChange={this.handleInputChange}
                  placeholder="Share your experience in detail..."
                  rows={5}
                  isInvalid={!!errors.desc}
                  className="form-control-custom"
                />
                <div className="d-flex justify-content-between mt-1">
                  <Form.Text className={errors.desc ? 'text-danger' : 'text-muted'}>
                    {errors.desc || `${desc.length}/2000 characters (min 50)`}
                  </Form.Text>
                  <Form.Text className="text-muted">
                    Markdown supported
                  </Form.Text>
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-medium d-flex align-items-center gap-2">
                  <Upload size={16} />
                  Add Photos (Optional)
                </Form.Label>
                <div className="image-upload-container">
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={this.handleInputChange}
                    accept="image/*"
                    className="form-control-custom"
                  />
                  <div className="upload-hint">
                    <small className="text-muted">Supported: JPG, PNG, GIF. Max size: 5MB</small>
                  </div>
                </div>
              </Form.Group>
            </div>

            {/* Author Information */}
            <div className="mb-4">
              <h6 className="mb-3 fw-medium">About You (Optional)</h6>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-medium d-flex align-items-center gap-2">
                      <Person size={16} />
                      Your Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={name}
                      onChange={this.handleInputChange}
                      placeholder="How should we credit you?"
                      className="form-control-custom"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-medium d-flex align-items-center gap-2">
                      <Envelope size={16} />
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      onChange={this.handleInputChange}
                      placeholder="your.email@example.com"
                      isInvalid={!!errors.email}
                      className="form-control-custom"
                    />
                    {errors.email && (
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    )}
                    <Form.Text className="text-muted">
                      We'll never share your email
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer className="modal-footer-custom border-top-0">
          <div className="d-flex justify-content-between w-100">
            <Button
              variant="outline-secondary"
              onClick={this.clearForm}
              className="px-4"
              disabled={isSubmitting}
            >
              Clear Form
            </Button>
            <div className="d-flex gap-3">
              <Button
                variant="outline-primary"
                onClick={this.handleClose}
                className="px-4"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="addPostForm"
                variant="primary"
                className="px-4 submit-post-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Publishing...
                  </>
                ) : (
                  <>
                    <PlusCircle size={18} className="me-2" />
                    Publish Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddPost;