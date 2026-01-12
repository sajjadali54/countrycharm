import React, { useState, useEffect } from 'react';

import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

import { Search, X, Filter, Globe, Building, GeoAlt } from 'react-bootstrap-icons';

import { countries, placeData } from '../data/Countries';

import './searchpost.css';

function SearchPost({ trigger, onSearchClick, onClose }) {
  const [formData, setFormData] = useState({
    category: 'All',
    country: '',
    city: ''
  });
  const [cities, setCities] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Initialize cities when country changes
  useEffect(() => {
    if (formData.country && placeData[formData.country]) {
      setCities(placeData[formData.country]);
    } else {
      // Combine all cities when no country selected or "All Countries"
      const allCities = Object.values(placeData).flat();
      setCities([...new Set(allCities)]); // Remove duplicates
    }
  }, [formData.country]);

  // Initialize form when modal opens
  useEffect(() => {
    if (trigger) {
      setFormData({
        category: 'All',
        country: '',
        city: ''
      });
    }
  }, [trigger]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchClick(formData);
  };

  const handleReset = () => {
    setFormData({
      category: 'All',
      country: '',
      city: ''
    });
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Place': return <GeoAlt className="me-1" />;
      case 'Hotel': return <Building className="me-1" />;
      case 'Food': return <span className="me-1">🍽️</span>;
      default: return <Globe className="me-1" />;
    }
  };

  return (
    <Modal
      show={trigger}
      onHide={onClose}
      centered
      backdrop="static"
      className="search-modal"
      size="lg"
    >
      <Modal.Header className="modal-header-custom">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="d-flex align-items-center gap-2">
            <Search size={24} />
            <div>
              <Modal.Title className="modal-title-custom mb-0">
                Search Posts
              </Modal.Title>
              <small className="text-white-50">Find specific posts by category, location, or keywords</small>
            </div>
          </div>
          <Button
            variant="link"
            onClick={onClose}
            className="close-btn-custom p-0"
          >
            <X size={24} color="white" />
          </Button>
        </div>
      </Modal.Header>

      <Modal.Body className="modal-body-custom p-4">
        <Form onSubmit={handleSubmit} id="searchForm">
          {/* Quick Filters */}
          <div className="quick-filters mb-4">
            <h6 className="mb-3 text-muted">Quick Categories</h6>
            <div className="d-flex flex-wrap gap-2">
              {['All', 'Place', 'Hotel', 'Food'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`quick-filter-btn ${
                    formData.category === cat ? 'active' : ''
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, category: cat }))}
                >
                  {getCategoryIcon(cat)}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Main Search Form */}
          <Row className="g-3">
            {/* Category Selection */}
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium d-flex align-items-center gap-2">
                  <Filter size={16} />
                  Category
                </Form.Label>
                <div className="category-select">
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-select-custom"
                  >
                    <option value="All">All Categories</option>
                    <option value="Place">Places</option>
                    <option value="Hotel">Hotels</option>
                    <option value="Food">Food & Restaurants</option>
                  </Form.Select>
                  <div className="select-icon">
                    {getCategoryIcon(formData.category)}
                  </div>
                </div>
              </Form.Group>
            </Col>

            {/* Country Selection */}
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium d-flex align-items-center gap-2">
                  <Globe size={16} />
                  Country
                </Form.Label>
                <Form.Select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="form-select-custom"
                >
                  <option value="">All Countries</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* City Selection */}
            <Col md={12}>
              <Form.Group>
                <Form.Label className="fw-medium d-flex align-items-center gap-2">
                  <GeoAlt size={16} />
                  City
                </Form.Label>
                <Form.Select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="form-select-custom"
                  disabled={!formData.country && cities.length === 0}
                >
                  <option value="">All Cities</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </Form.Select>
                {!formData.country && (
                  <Form.Text className="text-muted">
                    Select a country to see specific cities
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>

          {/* Advanced Search Toggle */}
          <div className="mt-4">
            <Button
              variant="link"
              className="text-decoration-none p-0"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <span className="d-flex align-items-center gap-2">
                {showAdvanced ? '▲' : '▼'}
                Advanced Search Options
              </span>
            </Button>
            
            {showAdvanced && (
              <div className="advanced-search mt-3 p-3 border rounded">
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Date Range</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Rating (Minimum)</Form.Label>
                      <Form.Select>
                        <option>Any Rating</option>
                        <option>4+ Stars</option>
                        <option>3+ Stars</option>
                        <option>2+ Stars</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            )}
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer className="modal-footer-custom border-top-0">
        <div className="d-flex justify-content-between w-100">
          <Button
            variant="outline-secondary"
            onClick={handleReset}
            className="px-4"
          >
            Reset Filters
          </Button>
          <div className="d-flex gap-3">
            <Button
              variant="outline-primary"
              onClick={onClose}
              className="px-4"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="searchForm"
              variant="primary"
              className="px-4 search-submit-btn"
            >
              <Search size={18} className="me-2" />
              Search Posts
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default SearchPost;