import React from "react";
import "./ProductSkeleton.css"; // we’ll create this CSS

const ProductSkeleton = () => {
  return (
    <div className="container">
      <div className="wrapper">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div className="wrapper-cell" key={idx}>
            <div className="image animated-background"></div>
            <div className="text">
              <div className="text-line animated-background"></div>
              <div className="text-line animated-background"></div>
              <div className="text-line animated-background"></div>
              <div className="text-line animated-background"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSkeleton;
