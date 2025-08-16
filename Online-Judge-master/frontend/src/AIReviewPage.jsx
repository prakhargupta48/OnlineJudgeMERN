import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import "./AIReviewPage.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CodeDisplay = ({ code, language }) => {
  return (
    <div className="code-display">
      <h3>Your Code</h3>
      <pre className="code-block">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const ReviewDisplay = ({ aiReview, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="review-display">
        <h3>AI Review</h3>
        <div className="loading-placeholder">
          <div className="loading-spinner"></div>
          <p>Generating AI Review...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="review-display">
        <h3>AI Review</h3>
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="review-display">
      <h3>AI Review</h3>
      <div className="markdown-content">
        {aiReview ? (
          <ReactMarkdown>{aiReview}</ReactMarkdown>
        ) : (
          <p className="placeholder-text">AI Review will appear here</p>
        )}
      </div>
    </div>
  );
};

function AIReviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [aiReview, setAiReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Get the code from the location state
  const { code, language, problemId } = location.state || {};

  useEffect(() => {
    if (code) {
      fetchAIReview();
    }
  }, [code]);

  const fetchAIReview = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/ai-review`,
        { code },
        { withCredentials: true }
      );

      if (response.data.success) {
        setAiReview(response.data.aiReview);
      } else {
        setError(response.data.error || "Failed to generate AI review");
      }
    } catch (error) {
      console.error("Error fetching AI review:", error);
      setError(
        error.response?.data?.error || "An error occurred while generating the AI review"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(`/problem/${problemId}`);
  };

  const goHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  if (!code) {
    return (
      <div className="ai-review-page">
        <div className="navbar">
          <header className="header">
            <h1 className="logo">
              <a href="#" onClick={goHome}>
                Judge My Code
              </a>
            </h1>
          </header>
        </div>
        <div className="error-container">
          <h2>No Code Found</h2>
          <p>Please submit your code first to get an AI review.</p>
          <button onClick={() => navigate('/')} className="go-back-button">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-review-page">
      <div className="navbar">
        <header className="header">
          <h1 className="logo">
            <a href="#" onClick={goHome}>
              Judge My Code
            </a>
          </h1>
        </header>
      </div>

      <div className="ai-review-container">
        <div className="ai-review-header">
          <h2>AI Code Review</h2>
          <button onClick={handleGoBack} className="go-back-button">
            Go Back
          </button>
        </div>

        <div className="ai-review-content">
          <div className="left-panel">
            <CodeDisplay code={code} language={language} />
          </div>
          <div className="right-panel">
            <ReviewDisplay
              aiReview={aiReview}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIReviewPage;
