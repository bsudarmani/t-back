// const express=require('express');
// const app=express();
// const jwt=require('jsonwebtoken');
// const dotenv = require('dotenv');
// app.use(express.json());
// dotenv.config();
// const posts=[
//     {
//         "id":1,
//          "username":"user1",
//          "title":"post 1"
//     },
//     {
//         "id":2,
//         "username":"user2",
//         "title":"post 2"
//     }
// ] 
// app.get('/',(req,res)=>
// {
//     res.send("server response");
// })
// app.get('/login',(req,res)=>
// {
//     // Authenticate
//     const username=req.body.username;
//     const user={name:username};
//     const accesstoken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
//     res.json({accesstoken:accesstoken});
// })
// app.listen(3000 );
// const express = require('express');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// const app = express();

// app.use(express.json());
// dotenv.config();

// const posts = [
//     {
//         "username": "user1",
//         "title": "post 1"
//     },
//     {
//         "username": "user2",
//         "title": "post 2"
//     }
// ];
// let refreshToken = []
// app.post('/token', (req, res) => {
//     const refreshToken = req.body.token;
//     if (refreshToken == null) return res.sendStatus(401);

//     // Assuming you have a list of stored refresh tokens, e.g., `refreshTokens`
//     if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);

//         const accessToken = generateAccessToken({ name: user.name });
//         res.json({ accessToken: accessToken });
//     });
// });

// // Mock user authentication (you can replace this with actual database query)
// function authenticateUser(username, password) {
//     // Example: Check if username and password match
//     return username === 'user1' && password === 'password';
// }

// // app.get('/posts', authenticatetoken,(req, res) => 
// // {
// //      res.json(posts.filter(post=>post.username === req.user.name))
// // });

// app.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     // Mock authentication
//     if (authenticateUser(username, password)) {
//         // Create JWT token 
//         const user = { name: username };
//         const accessToken = generateAccessToken(user);
//         const refreshToken=jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)
//         refreshToken.push(refreshToken)
//         res.json({ accessToken: accessToken,refreshToken:refreshToken});
//     } else {
//          res.status(401).json({ error: 'Authentication failed true' });
//     }
// });
// function generateAccessToken(user)
// {
//     return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15s'})
// }
// // function  authenticatetoken(req,res,next)
// // {
// //     const authHeader=req.headers['authorization'];
// //     // console.log(authHeader + "authheader");
// //     const token=authHeader && authHeader.split(' ')[1];
// //     // console.log(token + "header");
// //     if(token==null)
// //         return res.sendStatus(401);
// //     // return res.json("error ");
// //     jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>
// //     {
// //      if(err) 
// //     return res.sendStatus(403);
// //     req.user=user;
// //     next() 
// //     })
// // }
// app.listen(4000, () => {
//     console.log('Server running on port 4000');
// });
 

const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const app = express();

app.use(express.json());
dotenv.config();

const posts = [
    {
        "username": "user1",
        "title": "post 1"
    },
    {
        "username": "user2",
        "title": "post 2"
    }
];
let refreshTokens = []; // Define refreshTokens array here

app.post('/token', (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);

    // Check if refreshToken exists in refreshTokens array
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        const accessToken = generateAccessToken({ name: user.name });
        res.json({ accessToken: accessToken });
    });
});
app.delete('/logout',(req,res)=>
{
    refreshTokens=refreshTokens.filter(token=>token!==req.body.token);
    res.sendStatus(204);
})
// Mock user authentication (you can replace this with actual database query)
function authenticateUser(username, password) {
    // Example: Check if username and password match
    return username === 'user1' && password === 'password';
}

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Mock authentication
    if (authenticateUser(username, password)) {
        // Create JWT tokens
        const user = { name: username };
        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        
        refreshTokens.push(refreshToken); // Store refreshToken in refreshTokens array
        
        res.json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
        res.status(401).json({ error: 'Authentication failed' });
    }
});

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

app.listen(4000, () => {
    console.log('Server running on port 4000');
});
