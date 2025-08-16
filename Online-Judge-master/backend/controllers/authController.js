const path = require('path');
const User = require('../models/User');
const Problems = require('../models/Problems');
const Submission =require('../models/Submissions');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
module.exports.signup_get = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/signup.html'));
}

dotenv.config();

// handling errors
const handleError = (err) => {
    console.log(err.message, err.code);
    let errors = { firstname: '', lastname: '', email: '', password: '' };

    // duplicate error code

    if (err.code === 11000) {
        errors.email = "That email is already registered";
        return errors;
    }

    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;

        });
    }

    return errors;
}




// creating token 
const maxAge = 5 * 60 * 60; //takes in sec
const createToken = function (id) {
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: maxAge }) //payload , secret key , 
}


module.exports.login_get = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));


}

// getting all problems
module.exports.problems = async (req, res) => {
    try {
        const token =req.cookies.jwt;
        console.log("Token ->>>",req.cookies.jwt);  //token
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY); // decoding --got user details like payload given and expiry time
        const user = await User.findById(decodedToken.id); //Fetching by userID
        console.log(user.easyP);
        console.log(user.basicP);
        console.log(user.mediumP);
        console.log(user.hardP);

        const all_problems = await Problems.find();
        //all_problems is an array in which each problem is an object
        res.status(200).json({all_problems:all_problems ,"easySolved" :user.easyP , "basicSolved" :user.basicP  ,"mediumSolved":user.mediumP ,"hardSolved":user.hardP , "user_id":decodedToken.id});
    } catch (error) {
        console.log(error);
        res.status(500).send({ "Error retreiving problems ": error });
    }



}



module.exports.signup_post = async (req, res) => {

    console.log("Request for signup");
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    let password = req.body.password;
    let role = req.body.role;



    // hashing password 
    let errors = { firstname: '', lastname: '', email: '', password: '' };

    if (!password) {
        errors.password = 'Enter your password';
        return res.status(400).json({ errors });
    }

    if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
        return res.status(400).json({ errors });
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    try {
        password = hashedPassword;
        const role = "user"
        const user = await User.create({ firstname, lastname, email, password, role });
        const token = createToken(user._id, user.role);

        // place token inside cookie and send to client as response
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 ,sameSite:'None', secure: true });//cookie expects in milliseconds
        console.log("Account created successfully");
        res.status(201).json({ user: user._id, role: role }); //in above line created account in db , now sending back to frontend  
    }
    catch (error) {
        const errors = handleError(error);
        res.status(400).json({ errors });
    }
}


module.exports.login_post = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    let errors = { email: '', password: '' };

    try {
        const user = await User.findOne({ email: email });

        if (!user) {

            errors.email = 'Email is not registered';
            return res.status(404).json({ errors });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            // Here you can create and return JWT or any other authentication logic
            errors.password = 'Enter correct password';
            return res.status(400).json({ errors });
        }

        const token = createToken(user._id, user.role);

        // place token inside cookie and send to client as response
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 ,sameSite:'None' , secure: true }); //cookie expoects in milliseconds

        res.status(201).json({ user: user._id,jwt: token });
    }



    catch (err) {
        const errors = handleError(err);
        // console.log(errors);
        res.status(400).json({ errors });
        // res
    }


};


// logout
module.exports.logout_get = (req, res) => {
    // changing the jwt to '' and with expiry time of 1 milliseconds

    // Check if user is loged in or not 
    // if logged in then only do logout ,or show any other message
    const token=req.cookies.jwt;
    console.log("asdkjghkjgiug");
    console.log("tokenu is",token);
    res.cookie('jwt', '', { maxAge: 5000 ,sameSite:'None' , secure:true });
    res.send({ logout: "done" });
};



// Getting single problem
module.exports.problem_details = async (req, res) => {
    try {
        const prob_id = req.params.id;
        console.log(req.body);
        const prob = await Problems.findOne({ "_id": prob_id });

        console.log(prob);

        let to_send = {
            name: prob.name,
            description: prob.description,
            difficulty: prob.difficulty,
            tags: prob.tags,
            hints: prob.hints,
            showtc: prob.showtc,
            showoutput: prob.showoutput,
            problemID: prob.id,
            constraints: prob.constraints,
        };

        console.log("Problem details sent for:", prob.name);

        res.json(to_send);
    } catch (error) {

        res.status(400).json({ message: "Internal server error" });
    }
}






// posting problems - now stores test cases and outputs directly in MongoDB
module.exports.postProb = async (req, res) => {
    console.log(req.body);
    
    const { name, description, difficulty, tags, hints, showtc, showoutput, constraints, testCases, expectedOutput } = req.body;

    let errors = { name: '', description: '', difficulty: '', testCases: '', expectedOutput: '', showtc: '', showoutput: '', constraints };

    if (!name) {
        errors.name = 'Enter Problem name';
        return res.status(400).json({ errors });
    }
    if (!description) {
        errors.description = 'Enter Problem description';
        return res.status(400).json({ errors });
    }
    if (!difficulty) {
        errors.difficulty = 'Enter the difficulty level';
        return res.status(400).json({ errors });
    }
    if (!testCases) {
        errors.testCases = "Test cases are required";
        return res.status(400).json({ errors });
    }
    if (!expectedOutput) {
        errors.expectedOutput = "Expected output is required";
        return res.status(400).json({ errors });
    }
    if (!showtc) {
        errors.showtc = "Sample test cases are required for user";
        return res.status(400).json({ errors });
    }
    if (!showoutput) {
        errors.showoutput = "Sample output is required for user";
        return res.status(400).json({ errors });
    }
    if (!constraints) {
        errors.constraints = "Constraints are required";
        return res.status(400).json({ errors });
    }

    try {
        // Create the problem with test cases and outputs stored directly in MongoDB
        const createProblem = await Problems.create({ 
            name, 
            tags, 
            description, 
            difficulty, 
            hints, 
            testCases, 
            expectedOutput, 
            showtc, 
            showoutput, 
            constraints 
        });

        console.log("Problem added successfully", createProblem);
        res.status(201).json({ createProblem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//               SHOWING MY ACCOUNT SECTION HERE



module.exports.my_account =async (req , res)=>{
        const token=req.cookies.jwt;
        
        try {
            const decodedToken= jwt.verify(token, process.env.SECRET_KEY);

            const user_id = decodedToken.id;
   
            const to_send={
                firstname:"",
                lastname:"",
                role:"",
                basicP:0,
                easyP:0,
                mediumP:0,
                hardP:0,
            };


            const user =await User.findById(user_id);
            console.log(user);
            to_send.firstname=user.firstname;
            to_send.lastname=user.lastname;
            to_send.role=user.role;
            to_send.easyP=user.easyP;
            to_send.basicP=user.basicP;
            to_send.mediumP=user.mediumP;
            to_send.hardP=user.hardP;
            to_send.solved_problems = user.solvedProblems;
            // console.log("solv",user.solvedProblems);
            const totalProblems = await Problems.countDocuments();
            // to_send.totalProblems=user.hardP;
            const categoryCounts = await Problems.aggregate([
                {
                  $group: {
                    _id: '$difficulty', // Group by category field
                    count: { $sum: 1 } // Count documents in each category group
                  }
                  }
              ]);
            console.log(categoryCounts);
            console.log(totalProblems);
            to_send.totalProblems=totalProblems;

            to_send.total_question = categoryCounts;




            let a = 0, b = 0, c = 0, d = 0;
            categoryCounts.forEach(category => {
              switch (category._id) {
                case 'easy':
                  a = category.count;
                  break;
                case 'medium':
                  b = category.count;
                  break;
                case 'basic':
                  c = category.count;
                  break;
                case 'hard':
                  d = category.count;
                  break;
                default:
                  break;
              }
            });
        
            // Assign these counts to to_send object
            to_send.easyT = a;
            to_send.mediumT = b;
            to_send.basicT = c;
            to_send.hardT = d;



            res.status(200).json({data:to_send});

        } catch (error) {
            console.log("Error verifying token",error);
            res.json({ error: "Authentication Failed ! Login Again"});
            
        }
}

// Update problem - Admin only
module.exports.updateProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, difficulty, tags, hints, showtc, showoutput, constraints, testCases, expectedOutput } = req.body;

        let errors = { name: '', description: '', difficulty: '', testCases: '', expectedOutput: '', showtc: '', showoutput: '', constraints };

        if (!name) {
            errors.name = 'Enter Problem name';
            return res.status(400).json({ errors });
        }
        if (!description) {
            errors.description = 'Enter Problem description';
            return res.status(400).json({ errors });
        }
        if (!difficulty) {
            errors.difficulty = 'Enter the difficulty level';
            return res.status(400).json({ errors });
        }
        if (!testCases) {
            errors.testCases = "Test cases are required";
            return res.status(400).json({ errors });
        }
        if (!expectedOutput) {
            errors.expectedOutput = "Expected output is required";
            return res.status(400).json({ errors });
        }
        if (!showtc) {
            errors.showtc = "Sample test cases are required for user";
            return res.status(400).json({ errors });
        }
        if (!showoutput) {
            errors.showoutput = "Sample output is required for user";
            return res.status(400).json({ errors });
        }
        if (!constraints) {
            errors.constraints = "Constraints are required";
            return res.status(400).json({ errors });
        }

        const updatedProblem = await Problems.findByIdAndUpdate(
            id,
            { 
                name, 
                tags, 
                description, 
                difficulty, 
                hints, 
                testCases, 
                expectedOutput, 
                showtc, 
                showoutput, 
                constraints,
                updatedAt: Date.now()
            },
            { new: true, runValidators: true }
        );

        if (!updatedProblem) {
            return res.status(404).json({ error: 'Problem not found' });
        }

        console.log("Problem updated successfully", updatedProblem);
        res.status(200).json({ message: 'Problem updated successfully', problem: updatedProblem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete problem - Admin only
module.exports.deleteProblem = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedProblem = await Problems.findByIdAndDelete(id);
        
        if (!deletedProblem) {
            return res.status(404).json({ error: 'Problem not found' });
        }

        console.log("Problem deleted successfully", deletedProblem);
        res.status(200).json({ message: 'Problem deleted successfully', problem: deletedProblem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get problem for editing - Admin only
module.exports.getProblemForEdit = async (req, res) => {
    try {
        const { id } = req.params;
        const problem = await Problems.findById(id);
        
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }

        res.status(200).json({ problem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};