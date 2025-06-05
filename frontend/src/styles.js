import { css } from '@emotion/react';  

// General Styles  
export const globalStyles = css`  
    body {  
        font-family: 'Roboto', sans-serif;  
        margin: 0;  
        padding: 0;  
        box-sizing: border-box;  
        background-color: #f8f9fa;  
    }  
`;  

// Header Styles  
export const headerStyles = css`  
    display: flex;  
    justify-content: space-between;  
    align-items: center;  
    background-color: #1F2833;  
    padding: 15px 30px;  
    color: white;  
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);  
`;  

// Hero Section Styles  
export const heroStyles = css`  
    text-align: center;  
    padding: 70px 20px;  
    background-image: linear-gradient(to bottom right, #1F2833, #0B0C10);  
    color: white;  

    h2 {  
        font-size: 2.5rem;  
        margin-bottom: 10px;  
    }  

    p {  
        font-size: 1.2rem;  
        margin-bottom: 20px;  
    }  

    .search-container {  
        display: flex;  
        justify-content: center;  
        flex-wrap: wrap;  
        margin-top: 20px;  

        input, select, button {  
            padding: 12px;  
            margin: 5px;  
            font-size: 1rem;  
            border: 1px solid #ddd;  
            border-radius: 5px;  
        }  

        button {  
            background-color: #45A29E;  
            color: white;  
            border: none;  
            cursor: pointer;  
            transition: background-color 0.3s;  
            &:hover {  
                background-color: #66FCF1;  
            }  
        }  
    }  
`;  

// Features Styles  
export const featuresStyles = css`  
    display: grid;  
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));  
    gap: 20px;  
    padding: 40px;  
    background-color: #f8f9fa;  
`;  

// Footer Styles  
export const footerStyles = css`  
    background-color: #1F2833;  
    color: white;  
    text-align: center;  
    padding: 15px 0;  
    margin-top: 20px;  

    p {  
        margin: 0;  
        font-size: 0.9rem;  
    }  
    
    a {  
        color: #66FCF1;  
        text-decoration: none;  
        &:hover {  
            text-decoration: underline;  
        }  
    }  
`;