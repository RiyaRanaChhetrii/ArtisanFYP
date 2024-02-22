import React from "react"
import PropTypes from 'prop-types'


// Functional component for displaying a star rating
const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      {/* Star icons for different rating levels */}
      <span>
        <i style={{color}}
          className={
            value >= 1
              ? "fas fa-star"
              : value >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i style={{color}}
          className={
            value >= 2
              ? "fas fa-star"
              : value >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i style={{color}}
          className={
            value >= 3
              ? "fas fa-star"
              : value >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i style={{color}}
          className={
            value >= 4
              ? "fas fa-star"
              : value >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i style={{color}}
          className={
            value >= 5
              ? "fas fa-star"
              : value >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      {/* Display additional text (if provided) */}
      <span>{text && text}</span>
    </div>
  );
};

// Default props for the Rating component
Rating.defaultProps = {
    color: '#f8e825', // Default star color
}

// Prop types validation for Rating component
Rating.proptype = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  
}

export default Rating;
