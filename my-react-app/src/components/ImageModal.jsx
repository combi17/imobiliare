import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

const ImageModal = ({
    images,
    currentIndex,
    onClose,
    onNext,
    onPrev,
    title,
    totalImages
}) => {

  const [scale, setScale] = useState(1);
  const modalRef = useRef(null);

  //handle wheel in care sa functioneze preventDefault
  useEffect(() => {
    const element = modalRef.current;
    
    const handleWheel = (e) => {
      //e.preventDefault();       nu mai e nevoie pentru ca elem e pasiv

    const zoom = e.deltaY < 0 ? 0.1 : -0.1;
    setScale((prev) => Math.min(Math.max(prev + zoom, 1), 3));
  };

    element.addEventListener("wheel", handleWheel, { passive : "false" });

    document.body.style.overflow = "hidden";
  
    return () => {
      element.removeEventListener("wheel", handleWheel);
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleDoubleClick = () => {
    setScale((prev) => (prev === 1 ? 2 : 1));
  };

  return (
    <>
        <div className="lightbox-backdrop" onClick={onClose}>
          <button className="lightbox-close-btn" onClick={onClose}>
            <X size={32} />
          </button>
          
          <button className="lightbox-arrow prev" onClick={onPrev}>
            <ArrowLeft size={32} />
          </button>
          
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
          >
            <img 
              src={images[currentIndex]} 
              alt={`${title} - imagine ${currentIndex + 1}`} 
              className="lightbox-image"
              onDoubleClick={handleDoubleClick}
              style= {{ 
                transform: `scale(${scale})`,
                cursor : scale > 1 ? "zoom-out" : "zoom-in",
              }}
            />
          </div>
          
          <button className="lightbox-arrow next" onClick={onNext}>
            <ArrowRight size={32} />
          </button>

          <div className="lightbox-counter">
            {currentIndex + 1} / {totalImages}
          </div>

        </div>    
    </>
  )
}

export default ImageModal;