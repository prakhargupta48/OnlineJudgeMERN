const fs = require('fs');
const path = require('path');
const {v4:uuid} = require('uuid');

const dirCodes = path.join(__dirname, 'codes');

// if already folder then do not create code folder
if(!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, {recursive: true});
}

const generateJavaFile = (code) => {
    const jobId = uuid();
    // Ensure class name starts with a letter (Java requirement)
    const className = 'Class_' + jobId.replace(/-/g, '_'); // Replace hyphens with underscores for valid class name
    
    // Check if the code already has a class declaration
    if (code.includes('public class') || code.includes('class')) {
        // If code already has a class, we need to replace the class name
        const classRegex = /(public\s+)?class\s+(\w+)/;
        const match = code.match(classRegex);
        
        if (match) {
            // Replace the existing class name with our generated one
            const newCode = code.replace(classRegex, `${match[1] || ''}class ${className}`);
            const filename = `${className}.java`;
            const filePath = path.join(dirCodes, filename);
            fs.writeFileSync(filePath, newCode);
            console.log(`Generated Java file (existing class): ${filePath}`);
            console.log(`Class name: ${className}`);
            return filePath;
        }
    }
    
    // If no class declaration found, wrap the code in a class
    const javaCode = `import java.util.*;
import java.io.*;

public class ${className} {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        try {
            ${code}
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            scanner.close();
        }
    }
}`;
    
    const filename = `${className}.java`;
    const filePath = path.join(dirCodes, filename);
    fs.writeFileSync(filePath, javaCode);
    console.log(`Generated Java file: ${filePath}`);
    console.log(`Class name: ${className}`);
    return filePath;
};

module.exports = generateJavaFile;
