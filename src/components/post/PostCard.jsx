import React, { useState } from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { ArrowRight, XCircle, Calendar } from 'react-bootstrap-icons';
import './post.css';
import CompletePost from './CompletePost';
import getImage from '../../data/images';

function PostCard({ post }) {
  const [isShown, setIsShown] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsShown(current => !current);
  };

  if (isShown) {
    return (
      <div 
        className="post-card-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card
          className={`h-100 shadow-sm border-0 overflow-hidden ${isHovered ? 'post-card-hover' : ''}`}
          style={{
            transition: 'all 0.3s ease',
            borderRadius: '16px',
          }}
        >
          {/* Category Badge */}
          <div className="position-absolute top-0 start-0 m-3 z-1">
            <Badge 
              pill 
              className="category-badge px-3 py-2 fw-medium"
              bg="dark"
            >
              {post.category}
            </Badge>
          </div>

          {/* Image Container */}
          <div className="post-image-container">
            <Card.Img
              variant="top"
              src={getImage(post.id, post.category)}
              alt={post.title}
              className="post-image"
              style={{
                height: '220px',
                objectFit: 'cover',
                transition: 'transform 0.5s ease'
              }}
            />
            <div className="image-overlay"></div>
          </div>

          <Card.Body className="d-flex flex-column p-4">
            {/* Title with limited lines */}
            <Card.Title 
              className="mb-3 fw-bold text-dark"
              style={{
                fontSize: '1.1rem',
                lineHeight: '1.4',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {post.title}
            </Card.Title>

            {/* Post body preview */}
            <Card.Text 
              className="flex-grow-1 text-muted mb-4"
              style={{
                fontSize: '0.95rem',
                lineHeight: '1.6',
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {post.body}
            </Card.Text>

            {/* Metadata and Read More button */}
            <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
              <div className="d-flex align-items-center text-muted">
                <Calendar size={14} className="me-1" />
                <small>{new Date().toLocaleDateString()}</small>
              </div>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleClick}
                className="d-flex align-items-center gap-1 px-3 py-2 read-more-btn"
              >
                Read More
                <ArrowRight size={16} />
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  } else {
    return <CompletePost post={post} onClose={handleClick} />;
  }
}

export default PostCard;