import React, { useEffect } from 'react';

const Loader = () => {
  useEffect(() => {
    // Add the keyframes to the head of the document
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `;
    document.head.appendChild(styleTag);

    // Cleanup function to remove the style tag when component unmounts
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <div style={styles.container}>
      <img 
        src="/Loading.png" 
        alt="Loading..." 
        style={styles.rotatingImage}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    backgroundColor: '#ffffff', // Solid white background
    position: 'fixed', // Fixed position to cover the whole viewport
    top: 0,
    left: 0,
    zIndex: 9999, // High z-index to ensure it's on top
  },
  rotatingImage: {
    animation: 'spin 1.5s linear infinite',
    width: '100px', // Image size
    height: '100px', // Image size
  }
};

export default Loader;