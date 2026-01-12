import React from 'react';

import { Modal, Button } from 'react-bootstrap';

import { X, Calendar, Tag } from 'react-bootstrap-icons';

import getImage from '../../data/images';

function CompletePost({ post, onClose }) {
  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      size="lg"
      className="complete-post-modal"
      backdrop="static"
    >
      <Modal.Header className="modal-header-custom">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="d-flex align-items-center gap-3">
            <span className="modal-category-badge">
              <Tag size={14} className="me-1" />
              {post.category}
            </span>
            <small className="d-flex align-items-center">
              <Calendar size={14} className="me-1" />
              {new Date().toLocaleDateString()}
            </small>
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
      
      <Modal.Body className="modal-body-custom">
        <div className="modal-image-container">
          <img
            src={getImage(post.id, post.category)}
            alt={post.title}
            className="modal-image"
          />
        </div>
        
        <h2 className="modal-title-custom mb-4">{post.title}</h2>
        
        <div className="post-content">
          {post.body.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-3" style={{ lineHeight: '1.8' }}>
              {paragraph}
            </p>
          ))}
        </div>
      </Modal.Body>
      
      <Modal.Footer className="border-top-0 justify-content-center py-3">
        <Button
          variant="outline-primary"
          onClick={onClose}
          className="px-4 py-2"
        >
          Close Article
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CompletePost;