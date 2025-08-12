import React, { useState } from "react";
import "./Contribute.css";
import axios from "axios";
import My_image from "./assets/two.png";
import { useNavigate, Navigate } from "react-router-dom";
import Upload, { TestcasesDownloadLink, OutputsDownloadLink } from "./Upload";
import swal from "sweetalert";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Contribute() {
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [hints, setHints] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [constraints, setConstraints] = useState("");
  const [showtc, setShowtc] = useState("");
  const [showoutput, setShowoutput] = useState("");
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
              const response = await axios.post(
          `${API_BASE_URL}/problems_post`,
          {
            name,
            description,
            difficulty,
            tags,
            hints,
            testCases: TestcasesDownloadLink,
            expectedOutput: OutputsDownloadLink,
            showtc,
            showoutput,
            constraints,
          },
          { withCredentials: true }
        );

      const data = response.data;
      if (data.errors) {
        console.error(data.errors);
      } else {
        swal({
          title: "Question Added",
          text: "Thank you for your Contributions!.",
          icon: "success",
        }).then(() => {
          navigate("/");
          setRedirect(true);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) return <Navigate to="/" />;

  return (
    <div className="container">
      <div className="left-section">
        <div className="make_contri">Make your</div>
        <div className="make_contri2">Contributions ...</div>
        <img className="contri-image" src={My_image} alt="Contribution" />

        <div className="instructions">
          <h2 className="instructions_heading">Instructions:</h2>
          <p className="instructions_tagline">Read instructions carefully :</p>
          <p className="instructions_points main_p">
            <span>1.</span> First line of input text must contain number of test cases,
            followed by the inputs.
          </p>
          <p className="instructions_points">
            <span>2.</span> Test cases go in the first file, outputs in the second file.
          </p>
          <p className="instructions_points">
            <span>3.</span> Add clear description and hints, then submit.
          </p>
        </div>
      </div>

      <div className="right-section">
        <div className="form-container">
          {/* SINGLE FORM */}
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

            <p className="upload_txt">UPLOAD YOUR TEXT-FILES HERE:</p>
            <Upload />

            <div className="submit">
              <button className="submit-button" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contribute;
