const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputPath = path.join(__dirname, 'outputs');

if (!fs.existsSync(outputPath)) {
    try {
        fs.mkdirSync(outputPath, { recursive: true });
        console.log(`Output directory ${outputPath} created successfully`);
    } catch (error) {
        console.error(`Error creating output directory ${outputPath}:`, error);
    }
}

const executeJava = (filepath, inputPath) => {
    const jobId = path.basename(filepath).split(".")[0];
    // The jobId is already the class name, no need to add prefix again
    const className = jobId; // The filename already contains the correct class name
    const outputFilename = `${className}.java`;
    const outPath = path.join(outputPath, outputFilename);
    
    console.log(`executeJava - Input filepath: ${filepath}`);
    console.log(`executeJava - Extracted jobId: ${jobId}`);
    console.log(`executeJava - Class name: ${className}`);
    console.log(`executeJava - Output filename: ${outputFilename}`);

    return new Promise((resolve, reject) => {
        // Copy the Java file to the output directory
        fs.copyFile(filepath, outPath, (copyError) => {
            if (copyError) {
                console.error(`Error copying file to output directory:`, copyError);
                reject(`Error copying file: ${copyError.message}`);
                return;
            }

            // Read input from the input file
            fs.readFile(inputPath, 'utf8', (readError, inputData) => {
                if (readError) {
                    console.error(`Error reading input file:`, readError);
                    reject(`Error reading input file: ${readError.message}`);
                    return;
                }

                // Command to compile and run Java with input from the file
                const isWindows = process.platform === 'win32';
                const compileCmd = `cd "${outputPath}" && javac "${outputFilename}"`;
                const runCmd = isWindows
                    ? `cd /d "${outputPath}" && java ${className} < "${inputPath}"`
                    : `cd "${outputPath}" && java ${className} < "${inputPath}"`;
                const command = `${compileCmd} && ${runCmd}`;
                console.log(`Executing command: ${command}`);
                console.log(`Class name: ${className}`);
                console.log(`File path: ${outPath}`);

                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Execution error:`, error);
                        reject(`Execution error: ${error.message}`);
                        return;
                    }

                    if (stderr) {
                        console.warn(`Execution stderr:`, stderr);
                        reject(`Execution stderr: ${stderr}`);
                        return;
                    }

                    resolve(stdout);
                });
            });
        });
    });
};

module.exports = executeJava;
