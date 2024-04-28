import React, { useEffect, useState, createContext } from "react";

const CloudinaryScriptContext = createContext();

const UploadWidget = ({ uwConfig, setState }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadCloudinaryScript = () => {
      const cloudinaryScript = document.createElement("script");
      cloudinaryScript.src =
        "https://upload-widget.cloudinary.com/global/all.js";
      cloudinaryScript.onload = () => setLoaded(true);
      document.body.appendChild(cloudinaryScript);

      // Cleanup function to remove the script when component unmounts
      return () => {
        document.body.removeChild(cloudinaryScript);
      };
    };

    // Load Cloudinary script if not already loaded
    if (!window.cloudinary) {
      loadCloudinaryScript();
    } else {
      setLoaded(true); // Cloudinary script is already loaded
    }
  }, []);

  const handleUploadClick = () => {
    if (loaded) {
      const myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        // {
        //   cloudName: "faisalrehman",
        //   uploadPreset: "real-estate",
        // },
        (error, result) => {
          if (!error && result && result.event === "success") {
            // console.log("Done! Here is the image info: ", result.info);
            setState((prev) => [...prev, result.info.secure_url]);
          }
        }
      );

      myWidget.open();
    } else {
      console.log("Cloudinary SDK is still loading.");
    }
  };

  return (
    <button
      id="upload_widget"
      className="cloudinary-button"
      onClick={handleUploadClick}
      disabled={!loaded} // Disable the button if Cloudinary SDK is not yet loaded
    >
      {loaded ? "Upload" : "Loading..."}
    </button>
  );
};

export default UploadWidget;
export { CloudinaryScriptContext };
