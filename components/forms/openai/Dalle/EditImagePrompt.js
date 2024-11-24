import React, { useEffect, useRef, useState } from "react";
import ImageFileSection from "./ImageFileSection";
import EditImageFileInputSection from "./EditImageFIleInputSection";
import axios from "axios";
import AWS from "aws-sdk";
const EditImagePrompt = () => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [prompt, setPrompt] = useState("");
  const [openaiJSONResponse, setOpenaiJSONResponse] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [dots, setDots] = useState([]); // Store dots coordinates
  const canvasRef = useRef(null);

  const uploadBase64ToS3 = async (base64Image) => {
    // Set up AWS credentials (if you're not using environment variables or AWS CLI config)
    AWS.config.update({
      region: "us-east-1", // your region
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    });

    // Initialize S3
    const s3 = new AWS.S3();

    // Prepare the image data
    const base64Data = new Buffer.from(
      base64Image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const type = base64Image.split(";")[0].split("/")[1];

    // Set the S3 upload parameters
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME, // Your S3 bucket name
      Key: `uploads/${Date.now()}.${type}`, // Dynamic file name
      Body: base64Data,
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };

    try {
      const { Location } = await s3.upload(params).promise();
      return Location; // S3 URL
    } catch (error) {
      console.error("Error uploading to S3:", error);
      throw new Error("Error uploading image");
    }
  };

  const editSubmit = async (event) => {
    event.preventDefault();

    if (!inputValue) {
      setError("Please enter a prompt");
      setResult("");
      setPrompt("");
      setOpenaiJSONResponse("");
      return;
    }

    if (!uploadedImage) {
      setError("Please upload an image");
      return;
    }

    try {
      // Upload the base64 image to S3
      const imageUrl = await uploadBase64ToS3(uploadedImage);
      console.log("Image uploaded successfully:", imageUrl);

      // After uploading, use this URL for further API calls
      const img = new Image();
      img.src = imageUrl;
      await new Promise((resolve) => {
        img.onload = resolve; // Wait until image is loaded
      });

      const originalWidth = img.width;
      const originalHeight = img.height;

      const maxWidth = 500;
      const maxHeight = 500;

      let width = originalWidth;
      let height = originalHeight;

      // Calculate the scaling factor
      if (width > maxWidth || height > maxHeight) {
        const aspectRatio = width / height;
        if (width > height) {
          width = maxWidth;
          height = maxWidth / aspectRatio;
        } else {
          height = maxHeight;
          width = maxHeight * aspectRatio;
        }
      }

      const scalingFactorX = width / originalWidth;
      const scalingFactorY = height / originalHeight;

      // Adjust the dots based on the scaling factors
      const scaledMarkedPoints = dots.map((dot) => ({
        x: dot.x * scalingFactorX,
        y: dot.y * scalingFactorY,
      }));

      // Now make the API call with the scaled points
      const response = await axios.post("/api/openai/dalle/edit-image", {
        imageURL: imageUrl, // Pass the S3 URL here
        points: scaledMarkedPoints,
        prompt: inputValue,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data); // You can inspect the whole response in the console

      setImageUrls(data.imageResponse.data);
      setPrompt(inputValue); // Set the prompt
      setOpenaiJSONResponse(JSON.stringify(data, null, 2)); // Format and set the whole JSON response
      setError("");
      setInputValue("");
    } catch (error) {
      console.error(error);
      setResult("");
      setError("An error occurred while submitting the form");
    }
  };

  useEffect(() => {
    if (uploadedImage && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = uploadedImage;

      img.onload = () => {
        const maxWidth = 500;
        const maxHeight = 500;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const aspectRatio = width / height;
          if (width > height) {
            width = maxWidth;
            height = maxWidth / aspectRatio;
          } else {
            height = maxHeight;
            width = maxHeight * aspectRatio;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
      };
    }
  }, [uploadedImage]);

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setDots((prevDots) => [...prevDots, { x, y }]);
    const ctx = canvas.getContext("2d");
    const dotRadius = 5;
    ctx.beginPath();
    ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
  };

  const drawImageAndMask = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!uploadedImage) return;

    const img = new Image();
    img.src = uploadedImage;

    img.onload = () => {
      // Clear the canvas before drawing the new shape
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the uploaded image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Redraw all the dots
      dots.forEach((dot) => {
        const dotRadius = 5;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
      });

      // Draw the mask shape if enough dots are available
      if (dots.length >= 3) {
        ctx.beginPath();
        ctx.moveTo(dots[0].x, dots[0].y);

        dots.forEach((dot, index) => {
          if (index > 0) ctx.lineTo(dot.x, dot.y);
        });

        ctx.closePath();
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // Semi-transparent mask color
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
      }
    };
  };

  // Call drawImageAndMask whenever the dots change to ensure only the latest mask shape shows
  useEffect(() => {
    drawImageAndMask();
  }, [dots]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) canvas.addEventListener("click", handleCanvasClick);
    return () => {
      if (canvas) canvas.removeEventListener("click", handleCanvasClick);
    };
  }, []);

  return (
    <>
      <div className="col-lg-12">
        <div className="panel">
          <div className="panel-header">
            <h5>User Input</h5>
          </div>
          <div className="panel-body">
            <form className="row g-3" onSubmit={editSubmit}>
              <div className="col-md-12">
                <label htmlFor="inputCity" className="form-label">
                  Text
                </label>
                <input
                  type="text"
                  placeholder="Please enter your query here..."
                  className="form-control"
                  id="inputCity"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        <EditImageFileInputSection setImage={setUploadedImage} />
      </div>
      <div className="col-lg-12 mt-3">
        <canvas
          ref={canvasRef}
          style={{ border: "1px solid #ccc", maxWidth: "100%" }}
        />
      </div>
    </>
  );
};

export default EditImagePrompt;
