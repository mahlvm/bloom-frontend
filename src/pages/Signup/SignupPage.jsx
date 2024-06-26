import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authentication";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import "./SignupPage.css"


export const Signup = () => {
        const [first_name, setFirst_name] = useState("");
        const [last_name, setLast_name] = useState("");
        const [username, setUsername] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [password_confirm, setPassword_confirm] = useState("");
        const [address, setAddress] = useState("");
    
        const [signUpError, setError] = useState();
        const navigate = useNavigate();
    
        const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signup(first_name, last_name, username, email, password, password_confirm, address)
            console.log("redirecting...:");
            navigate("/login");
    
        } catch (err) {
            console.error(err);
            setError(err.cause)
            navigate("/signup");
        }
        };
    
        const handleFirstNameChange = (event) => {
            setFirst_name(event.target.value);
        };
    
        const handleLastNameChange = (event) => {
            setLast_name(event.target.value);
        };
    
        const handleUsernameChange = (event) => {
            setUsername(event.target.value);
        };

        const handleEmailChange = (event) => {
            setEmail(event.target.value);
        };

        const handlePasswordChange = (event) => {
            setPassword(event.target.value);
        };

        const handlePasswordConfirmChange = (event) => {
            setPassword_confirm(event.target.value);
        };

        const handleAddressChange = (event) => {
            setAddress(event.target.value);
        };
    

        return (
        
        <>    
            <div className="app-container"> 
        
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <div className="signup-container">
        
            <Form className="signup-form" onSubmit={handleSubmit}>
                <h1 className="white-text">Create Account</h1>
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Control type="text" placeholder="First name" value={first_name} onChange={handleFirstNameChange} />
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Control type="text" placeholder="Last name" value={last_name} onChange={handleLastNameChange} />
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="username">
                    <Form.Control type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="email">
                    <Form.Control type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="password">
                    <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Control type="password" placeholder="Confirm password" value={password_confirm} onChange={handlePasswordConfirmChange} />
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="address">
                    <Form.Control type="text" placeholder="Home address" value={address} onChange={handleAddressChange} />
                </Form.Group>
    
                <Button variant="success" type="submit">Sign Up</Button>
                {signUpError && <div>{signUpError}</div>}
            </Form>
            </div>
        
        </Container>
        </div>
        </>
        );
    };