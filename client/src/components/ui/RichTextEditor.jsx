import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ input, setInput }) => {
  const handleChange = (content) => {
    setInput({ ...input, description: content }); // Update the description in the input state
  };
  const containerStyle = {
    backgroundColor: "#ffffff", // Clean white background
    border: "1px solid #d1d5db", // Light gray border
    borderRadius: "10px", // Smooth border radius
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Subtle shadow for a modern look
    fontFamily: "Roboto, sans-serif",
    padding: "10px", // Spacing around editor
  };

  // Styling for the toolbar
  const toolbarStyle = {
    backgroundColor: "#f8fafc", // Soft gray background
    border: "none",
    borderBottom: "1px solid #d1d5db", // Divider at the bottom
    borderRadius: "10px 10px 0 0", // Rounded edges for the top
  };

  // Styling for the editor area
  const editorStyle = {
    minHeight: "200px", // Taller editor for better usability
    fontSize: "15px",
    lineHeight: "1.7", // Improved readability
    color: "#374151", // Dark gray text
    padding: "10px", // Padding inside the editor
    outline: "none",
    backgroundColor: "#f9fafb", // Light gray editor background
    borderRadius: "0 0 10px 10px", // Smooth bottom edges
  };

  return (
    <ReactQuill
      theme="snow"
      value={input?.description || ""} // Safely access description or fallback to an empty string
      onChange={handleChange} // Handle content change
    />
  );
};

export default RichTextEditor;
