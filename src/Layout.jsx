import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import BackGround from "./BackGround";
import CustomCursor from "./components/CustomCursor";
import CursorSelector from "./components/CursorSelector";

function Layout() {
  const [bgImageUrl, setBgImageUrl] = useState("https://w.wallhaven.cc/full/vq/wallhaven-vq7698.jpg");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState(bgImageUrl);

  // New state for selected cursor style
  const [selectedCursorStyle, setSelectedCursorStyle] = useState({
    variant: "dot-ring",
    color: "#f0e68c",
    size: "lg",
    blendMode: "difference",
    trailLength: 6,
    hoverScale: 2.5,
    transitionSpeed: 0.15,
  });

  // New state to toggle cursor selector visibility
  const [isCursorSelectorVisible, setIsCursorSelectorVisible] = useState(false);

  // Handle image URL input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Apply the new background image
  const applyBackgroundChange = () => {
    if (!inputValue.trim()) {
      showNotification("Please enter a valid URL", "error");
      return;
    }

    setIsLoading(true);
    
    // Create an image object to test if the URL is valid
    const img = new Image();
    img.onload = () => {
      setBgImageUrl(inputValue);
      setIsInputVisible(false);
      setIsLoading(false);
      showNotification("Background updated successfully!", "success");
    };
    
    img.onerror = () => {
      setIsLoading(false);
      showNotification("Invalid image URL. Please try again.", "error");
    };
    
    img.src = inputValue;
  };

  // Show notification and automatically hide after a delay
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Reset input value when opening the input panel
  useEffect(() => {
    if (isInputVisible) {
      setInputValue(bgImageUrl);
    }
  }, [isInputVisible, bgImageUrl]);

  return (
    <>
<CustomCursor
  variant={selectedCursorStyle.variant}
  color={selectedCursorStyle.color}
  size={selectedCursorStyle.size}
  blendMode={selectedCursorStyle.blendMode}
  trailLength={selectedCursorStyle.trailLength}
  hoverScale={selectedCursorStyle.hoverScale}
  transitionSpeed={selectedCursorStyle.transitionSpeed}
/>

{/* Button to toggle cursor selector */}
<button
  onClick={() => setIsCursorSelectorVisible(!isCursorSelectorVisible)}
  className="fixed top-20 right-10 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-3 rounded-full shadow-xl hover:scale-110 active:scale-90 transition-transform duration-200 ease-in-out z-30 flex items-center justify-center"
  aria-label="Toggle cursor style selector"
  type="button"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
</button>

{isCursorSelectorVisible && (
  <CursorSelector
    selectedStyleId={selectedCursorStyle.id}
    onSelect={(style) => {
      setSelectedCursorStyle(style);
      setIsCursorSelectorVisible(false);
    }}
  />
)}






 <BackGround
        imageUrl={bgImageUrl}
        className="flex justify-center items-center transition-all duration-500 ease-in-out"
      >
        <main className="flex-1 w-full">
          <Header />
          <Outlet />
          <Footer />
        </main>
      </BackGround>

      {/* Button to toggle the input visibility */}
      <button
        onClick={() => setIsInputVisible(!isInputVisible)}
        className="fixed bottom-10 right-10 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 z-10"
        aria-label="Change background"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      {/* Background URL input panel */}
      {isInputVisible && (
        <div className="fixed text-black bottom-24 right-10 p-5 bg-white shadow-xl rounded-lg max-w-sm w-full transition-all duration-300 ease-in-out z-10">
          <h3 className="text-lg font-medium mb-3">Change Background Image</h3>
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter Image URL"
              className="w-full p-3 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setIsInputVisible(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={applyBackgroundChange}
                disabled={isLoading}
                className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Loading..." : "Apply"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification toast */}
      {notification.show && (
        <div 
          className={`fixed bottom-10 left-10 p-4 rounded-lg shadow-lg text-white transition-all duration-300 ease-in-out z-20 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <div className="flex items-center">
            {notification.type === "success" ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            {notification.message}
          </div>
        </div>
      )}
    </>
  );
}

export default Layout;