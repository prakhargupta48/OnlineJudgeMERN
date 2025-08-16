import React, { useState, useEffect } from "react";
import "./Contribute.css";
import axios from "axios";
import My_image from "./assets/two.png";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import Upload, { TestcasesDownloadLink, OutputsDownloadLink } from "./Upload";
import swal from "sweetalert";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function EditProblem() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [hints, setHints] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [constraints, setConstraints] = useState("");
  const [showtc, setShowtc] = useState("");
  const [showoutput, setShowoutput] = useState("");
  const [testCases, setTestCases] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  const navigate = useNavigate();

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/check_if_admin`, {
          withCredentials: true,
        });
        setIsAdmin(response.data.role === 'admin');
        setAdminLoading(false);
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
        setAdminLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/admin/problems/${id}/edit`, {
          withCredentials: true
        });
        
        const problem = response.data.problem;
        setName(problem.name);
        setTags(problem.tags);
        setDescription(problem.description);
        setHints(problem.hints);
        setDifficulty(problem.difficulty);
        setConstraints(problem.constraints);
        setShowtc(problem.showtc);
        setShowoutput(problem.showoutput);
        setTestCases(problem.testCases);
        setExpectedOutput(problem.expectedOutput);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching problem:", error);
        setError(error.response?.data?.error || "Failed to fetch problem");
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${API_BASE_URL}/admin/problems/${id}`,
        {
          name,
          description,
          difficulty,
          tags,
          hints,
          testCases: TestcasesDownloadLink || testCases,
          expectedOutput: OutputsDownloadLink || expectedOutput,
          showtc,
          showoutput,
          constraints,
        },
        { withCredentials: true }
      );

      const data = response.data;
      if (data.errors) {
        console.error(data.errors);
        swal({
          title: "Error",
          text: "Please fill all required fields correctly.",
          icon: "error",
        });
      } else {
        swal({
          title: "Problem Updated",
          text: "Problem has been updated successfully!",
          icon: "success",
        }).then(() => {
          navigate("/problems");
          setRedirect(true);
        });
      }
    } catch (error) {
      console.log(error);
      swal({
        title: "Error",
        text: error.response?.data?.error || "Failed to update problem",
        icon: "error",
      });
    }
  };

  if (redirect) return <Navigate to="/problems" />;

  if (adminLoading || loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="error-container">
        <h2>Access Denied</h2>
        <p>You need admin privileges to edit problems.</p>
        <button onClick={() => navigate("/problems")}>Back to Problems</button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/problems")}>Back to Problems</button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="left-section">
        <div className="make_contri">Edit</div>
        <div className="make_contri2">Problem ...</div>
        <img className="contri-image" src={My_image} alt="Edit Problem" />

        <div className="instructions">
          <h2 className="instructions_heading">Instructions:</h2>
          <p className="instructions_tagline">Update problem details carefully:</p>
          <p className="instructions_points main_p">
            <span>1.</span> First line of input text must contain number of test cases,
            followed by the inputs.
          </p>
          <p className="instructions_points">
            <span>2.</span> Test cases go in the first file, outputs in the second file.
          </p>
          <p className="instructions_points">
            <span>3.</span> Update description and hints as needed, then submit.
          </p>
        </div>
      </div>

      <div className="right-section">
        <div className="form-container">
          <form onSubmit={handleSubmit} action="POST">
            <label className="probniklenge">
              PROBLEM NAME:
              <input
                className="prob_inp"
                type="text"
                onChange={(e) => setName(e.target.value)}
                required
                value={name}
              />
            </label>
            <br />

            <label className="tagsniklenge">Choose Tags</label>
            <br />
            <select
              className="DropDown"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
            >
              <option value="">Select the best Suited Tag</option>
              <option value="arrays">Arrays</option>
              <option value="Hash-Map">Hash-Map</option>
              <option value="Maths">Maths</option>
              <option value="Binary-Search">Binary-Search</option>
              <option value="Tree">Tree</option>
            </select>
            <br />

            <label className="levelniklenge">Difficulty Level:</label>
            <br />
            <select
              className="DropDown"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              required
            >
              <option value="">Select difficulty level</option>
              <option value="basic">Basic</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <br />

            <div className="label_show_tc">
              Add Sample TC to show it to User
              <textarea
                className="show_tc"
                onChange={(e) => setShowtc(e.target.value)}
                required
                value={showtc}
              />
            </div>

            <div className="label_show_output">
              Add Output to show User
              <textarea
                className="show_output"
                onChange={(e) => setShowoutput(e.target.value)}
                required
                value={showoutput}
              />
            </div>

            <label className="constraintsniklenge">
              <h2>ADD CONSTRAINTS:</h2>
              <textarea
                className="constraints_area"
                onChange={(e) => setConstraints(e.target.value)}
                required
                value={constraints}
              />
            </label>

            <div className="add_desc">
              ADD DESCRIPTION:
              <textarea
                className="desc_area"
                onChange={(e) => setDescription(e.target.value)}
                required
                value={description}
              />
            </div>

            <div className="add_hints">
              HINTS:
              <textarea
                className="hints_area"
                onChange={(e) => setHints(e.target.value)}
                required
                value={hints}
              />
            </div>

            <p className="upload_txt">UPLOAD YOUR TEXT-FILES HERE (Optional - will use existing if not uploaded):</p>
            <Upload />

            <div className="submit">
              <button className="submit-button" type="submit">
                Update Problem
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProblem;
