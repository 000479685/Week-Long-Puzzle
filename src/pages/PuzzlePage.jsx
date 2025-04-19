import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const PuzzlePage = () =>
{
    const s3Client = new S3Client({region:"us-west-2",
        credentials: {
            accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
            secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
        }
    })
    const bucket = "one-week-puzzle-bucket"
    
    const [userData, setUserData] = useState(null)
    const [progress, setProgress] = useState(0)

    useEffect(()=> {
        const authFromLocalStorage = JSON.parse(localStorage.getItem('auth'))
        if(authFromLocalStorage)
        {
            // console.log(authFromLocalStorage[2])
            setProgress(authFromLocalStorage[2])
            setUserData(authFromLocalStorage)
        }
    }, [])

    const puzzleSolved = async(e) =>
    {
        e.preventDefault();
        try{
            const params = {
                Bucket : bucket,
                Key : authFromLocalStorage[0],
                Body: JSON.stringify({
                    'email' : authFromLocalStorage[0],
                    'password' : authFromLocalStorage[1],
                    'progress' : (progress + 1)
                }) 
            }

            const command = new PutObjectCommand(params)
            const response = await s3Client.send(command)
            console.log("Object updated successfully", response)

            setProgress((prev) => prev + 1)            
        }
        catch (error){
            console.error("Error when performing put")
        }
    }


    // Supposed to load different puzzles depending on what the 'progress' is
    const loadPuzzle = () =>
    {
        return(
            <Box>
                <Typography>
                    Test
                </Typography>
                <Button onClick={puzzleSolved}>
                    Solved The Puzzle
                </Button>
            </Box>
        )
    }
    
    
    return (
        <>
        <Box>
            {loadPuzzle()}
        </Box>
        </>
    )
}

export default PuzzlePage