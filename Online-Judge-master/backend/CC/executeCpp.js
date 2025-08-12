const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Path to store the output
const outputPath = path.join(__dirname, 'outputs');

if (!fs.existsSync(outputPath)) {
    try {
        fs.mkdirSync(outputPath, { recursive: true });
        console.log(`Output directory ${outputPath} created successfully.`);
    } catch (error) {
        console.error(`Error creating output directory ${outputPath}:`, error);
    }
}

const executeCPP = (filepath, inputPath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outputFilename = `${jobId}.out`;
    const outPath = path.join(outputPath, outputFilename);

    return new Promise((resolve, reject) => {
        // Use platform-specific run command
        const isWindows = process.platform === 'win32';
        const runBinary = isWindows ? `${jobId}.out.exe` : `./${jobId}.out`;
        const compileCmd = `g++ "${filepath}" -o "${outPath}${isWindows ? '.exe' : ''}"`;
        const execCmd = isWindows
            ? `cd /d "${outputPath}" && ${runBinary} < "${inputPath}"`
            : `cd "${outputPath}" && ${runBinary} < "${inputPath}"`;
        const command = `${compileCmd} && ${execCmd}`;
        console.log(`Executing command: ${command}`);

        exec(command, async (error, stdout, stderr) => {
            if (error) {
                console.error(`Execution error:`, error);
                reject(`Execution error: ${error.message}`);
                return;
            }

            if (stderr) {
                console.warn(`Execution stderr:`, stderr);
                reject(stderr);
                return;
            }

            // Resolve with stdout
            resolve(stdout);

            // Delete .exe file after execution
            try {
                const binaryPath = isWindows ? `${outPath}.exe` : outPath;
                if (fs.existsSync(binaryPath)) {
                    await deleteFile(binaryPath);
                    console.log(`Deleted ${binaryPath} after execution.`);
                }
            } catch (deleteError) {
                console.error(`Error deleting ${outPath}:`, deleteError);
            }
        });
    });
};

// Function to delete a file
async function deleteFile(filePath) {
    try {
        await fs.promises.unlink(filePath); // Deletes the file
    } catch (error) {
        throw new Error(`Error deleting file ${filePath}: ${error.message}`);
    }
}

module.exports = executeCPP;
