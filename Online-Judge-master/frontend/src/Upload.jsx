import React, { useState, useEffect } from "react";
import "./Upload.css";

// Variables to store file contents
let TestcasesDownloadLink = "";
let OutputsDownloadLink = "";

function Upload() {
  const [testcases, setTestcases] = useState(undefined);
  const [outputs, setOutputs] = useState(undefined);
  const [tcperc, setTcperc] = useState(0);
  const [outperc, setOutperc] = useState(0);
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    if (testcases) handleFileUpload(testcases, "testcasesUrl");
  }, [testcases]);

  useEffect(() => {
    if (outputs) handleFileUpload(outputs, "outputsUrl");
  }, [outputs]);

  const handleFileUpload = (file, fileType) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target.result;
      setInputs((prev) => ({ ...prev, [fileType]: content }));
      
      if (fileType === "testcasesUrl") {
        TestcasesDownloadLink = content;
        setTcperc(100);
      } else {
        OutputsDownloadLink = content;
        setOutperc(100);
      }
    };
    
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
    
    reader.readAsText(file);
  };

  return (
    <div className="upload">
      <div>
        <label className="upload_heading" htmlFor="testcases">TESTCASES:</label>{" "}
        {tcperc > 0 && `Uploading ${tcperc}%`}
        <br />
        <input
          type="file"
          name="testcases"
          id="testcases"
          onChange={(e) => setTestcases(e.target.files[0])}
        />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label className="upload_heading" htmlFor="outputs">OUTPUT:</label>{" "}
        {outperc > 0 && `Uploading ${outperc}%`}
        <br />
        <input
          type="file"
          name="outputs"
          id="outputs"
          onChange={(e) => setOutputs(e.target.files[0])}
        />
      </div>
    </div>
  );
}

export default Upload;
export { TestcasesDownloadLink, OutputsDownloadLink };
