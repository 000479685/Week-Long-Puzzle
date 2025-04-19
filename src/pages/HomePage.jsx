import { Alert, Box, Button, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Switch, TextField } from "@mui/material";
import React, { useState } from "react";
import {S3Client, PutObjectCommand, GetObjectCommand} from "@aws-sdk/client-s3"
import {Visibility, VisibilityOff} from '@mui/icons-material'
import { useNavigate } from "react-router-dom";

function HomePage()
{
    const s3Client = new S3Client({region:"us-west-2",
        credentials: {
            accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
            secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
        }
    })

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")    
    const [showPassword, setShowPassword] = useState("")
    const [error, setError] = useState("")
    const [logInOrSignUp, setLogInOrSignUp] = useState(false)


    const bucket = "one-week-puzzle-bucket"

    const handleFormSubmission = async(e) =>
    {
        if(logInOrSignUp)
            {
                await handleSignUp(e)
            }
            else
            {
                await handleLogin(e)
            }
    }

    const uploadFileToS3 = async() =>
    {
        const params = {
            Bucket: bucket,
            Key: email,
            Body: JSON.stringify({
                'email' : email,
                'password' : password,
                'progress': 0
            })
        }
        try{
            const command = new PutObjectCommand(params)
            const response = await s3Client.send(command)
            console.log("File uploaded successfully", response)
        }catch(error)
        {
            console.error("Error uploading file: ", error)
        }        
    }

    const readFileFromS3 = async() =>
    {
        const params = {
            Bucket: bucket,
            Key: email,
          };
        
          try {
            const command = new GetObjectCommand(params);
            const response = await s3Client.send(command);
            const fileContent = await response.Body.transformToString();
            // console.log("File content:", fileContent, typeof(fileContent));
            return fileContent;
          } catch (error) {
            console.error("Error reading file:", error);
            throw error;
          }
        
    }

    const handleSignUp = async(e) =>
    {
        e.preventDefault()        
        try {
            // This grabs the data from the s3 bucket
            await uploadFileToS3()
            localStorage.setItem('auth', JSON.stringify([email, password, 0]))
            setEmail("")
            setPassword("")
            setError("")
            setTimeout(navigate("/puzzlePage"), 5000)
        } catch(error) {
            console.error("Error with sign up: ", error)         
            setError(error)   
        }
    }

    const handleLogin = async(e) =>
    {
        e.preventDefault()
        try{
            const fileContent = await readFileFromS3()
            const fileContentAsObject = JSON.parse(fileContent)
            if(fileContentAsObject["email"] != email && fileContentAsObject["password"] != password)
            {
                throw(e) =>
                {
                    console.log("failed to verify")
                }                
            }
            // console.log(fileContentAsObject, fileContentAsObject["email"], fileContentAsObject["password"])            
            console.log("login success")
            localStorage.setItem('auth', JSON.stringify([email, password, fileContentAsObject["progress"]]))
            setEmail("")
            setPassword("")
            setError("")
            setTimeout(navigate("/puzzlePage"), 5000)
        }catch(error) {
            console.error("Error with log in: ", error)         
            setError(error)   
        }
    }

    const toggleShowPassword = () =>
    {
        setShowPassword((prev) => !prev)
    }

    const handleChange = (e) =>
    {
        setLogInOrSignUp(e.target.checked)
    }

    return (
        <>  
            <Box sx={{ flexGrow: 1 }}>
                <FormGroup>
                    <FormControlLabel
                    control={
                        <Switch
                        checked={logInOrSignUp}
                        onChange={handleChange}
                        aria-label="login switch"
                        />
                    }
                    label={logInOrSignUp ? 'Sign Up' : 'Login'}
                    />
                </FormGroup>
            </Box>            
            <Box sx={{background:"White", padding:"5px", width:"750px"}}>
                {error && (
                    <Alert severity="error">
                        {error}
                    </Alert>
                )}                
                <Box component="form" onSubmit={handleFormSubmission} sx={{mt:2}}>
                    <Grid
                        container
                        direction="column"
                        sx={{justifyContent:"center", alignItems:"center"}}
                    >
                        <TextField
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            required
                            type="email"
                            value={email}
                            sx={{width:"450px"}}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <FormControl variant="outlined" sx={{mt:2, width:"450px"}}>
                            <InputLabel htmlFor="outlined-adornment-password">
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={toggleShowPassword}
                                            edge="end"
                                            aria-label={
                                                showPassword ? "Hide password" : "Show password"
                                            }
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"                            
                            />
                        </FormControl>                                                     
                        <Button type="submit"
                            variant="contained"
                            sx={{mt:3}}
                        >
                            {logInOrSignUp ? "Sign up" : "Log in"}
                        </Button>
                    </Grid>
                </Box>
            </Box>          
        </>
    )
}

export default HomePage