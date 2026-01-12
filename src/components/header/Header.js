import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';

import {   
  Hospital,
  EggFried, 
  Building, 
  GeoAlt,
  PlusCircle, 
  Search, 
  Globe
} from 'react-bootstrap-icons';

import {PLACE, FOOD, HOTEL, ALL} from '../../data/utils.js';

import './Header.css';

function Header({ setAddPost, setShowSearch, onCatClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onCatClick(category);
  };

  const categories = [
    { name: ALL, icon: <Hospital size={18} className="me-2" />, label: 'Home' },
    { name: FOOD, icon: <EggFried size={18} className="me-2" />, label: 'Food' },
    { name: HOTEL, icon: <Building size={18} className="me-2" />, label: 'Hotels' },
    { name: PLACE, icon: <GeoAlt size={18} className="me-2" />, label: 'Places' },
  ];

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      className={`nav-styling ${scrolled ? 'scrolled' : ''}`}
    >
      <Container fluid className="px-lg-5">
        {/* Brand/Logo */}
        <Navbar.Brand href="#" className="d-flex align-items-center brand">
          <Globe size={28} className="me-2" />
          <span className="brand-text">Country Charm</span>
          <span className="brand-tagline d-none d-md-inline">Discover Hidden Gems</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggle">
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Categories Navigation */}
          <Nav className="mx-auto categories-nav">
            {categories.map((category) => (
              <Nav.Link
                key={category.name}
                className={`nav-link-category ${
                  activeCategory === category.name ? 'active' : ''
                }`}
                onClick={() => handleCategoryClick(category.name)}
              >
                <span className="category-content">
                  {category.icon}
                  <span className="category-label">{category.label}</span>
                </span>
                {activeCategory === category.name && (
                  <span className="active-indicator"></span>
                )}
              </Nav.Link>
            ))}
          </Nav>

          {/* Action Buttons */}
          <Nav className="action-buttons">
            <button
              className="btn-action search-btn"
              onClick={setShowSearch}
            >
              <Search size={18} className="me-2" />
              <span>Search</span>
            </button>
            <button
              className="btn-action add-post-btn"
              onClick={setAddPost}
            >
              <PlusCircle size={18} className="me-2" />
              <span>Add Post</span>
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;