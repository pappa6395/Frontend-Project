import React, { useState } from 'react';
import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import LoginForm from '../components/Login/LoginForm';
import LoginHome from '../components/Login/LoginHome';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FormDataProps, LoginProps } from '../Utils/types';


const Login: React.FC<LoginProps> = ({ 
    showLoginForm, 
    setShowLoginForm, 
    handleToggleLogin,
    errors,
    setErrors 
    }) => {

    const [isSignup, setIsSignup] = useState(true);

    const navigate = useNavigate();

    const notifySuccess = (message: string) => toast.success(message);
    const notifyError = (message: string) => toast.error(message);

    const handleSubmit = async (data: FormDataProps) => {

        const { email, password, confirmPassword, name } = data;

        let formErrors = { ...errors };
        let isValid = true;


        if (isSignup) {
            if (!name) {
                formErrors.name = 'Name is required';
                isValid = false;
            } else {
                formErrors.name = '';
            }
            if (!email) {
                formErrors.email = 'Email address is required';
                isValid = false;
            } else {
                formErrors.email = '';
            }
            if (!password) {
                formErrors.password = 'Password is required';
                isValid = false;
            } else {
                formErrors.password = '';
            }
            if (password !== confirmPassword) {
                notifyError("Passwords do not match!");
                formErrors.confirmPassword = 'Passwords do not match';
                isValid = false;
                return;
            } else if (!confirmPassword) {
                formErrors.confirmPassword = 'Confirm pasword is required';
                isValid = false;
            } else {
                formErrors.confirmPassword = '';
            }
            if (!name || !email || !password || !confirmPassword) {
                toast.error('Please fill in your informations.')
            }
            

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                //Set display name
                await updateProfile(user, { displayName: name })

                //save user profile in firestore
                await setDoc(doc(db, "users", user.uid), {
                    name,
                    email:user.email,
                    photoURL: user.photoURL,
                    created_at: new Date()
                })
                console.log("User registered");
                notifySuccess("Registration successful!");
                navigate('/dashboard');
            } catch (error) {
                console.log("Signup failed", error);
                notifyError("Registration failed");
            }

        } else {

            
            if (!email) {
                formErrors.email = 'Email address is required';
                isValid = false;
            } else {
                formErrors.email = '';
            }
            if (!password) {
                formErrors.password = 'Password is required';
                isValid = false;
            } else {
                formErrors.password = '';
            }

            if (!email || !password) {
                toast.error('Please fill in your informations.')
            }

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log('User logged in');

                const user = userCredential.user;
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    console.log("User data fetched:", userData);
                    
                }
                notifySuccess("Logged in successfully!");
                navigate('/dashboard');
            } catch (error) {
                console.log('Login failed', error)
                notifyError("Login failed")
            }
        }
    setErrors(formErrors)
    return isValid;  
    };

    const handleToggle = () => {
        setIsSignup((prev) => !prev);
        setErrors({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''})
      };
    
    return (
        <div>
            <Header showLogout={false} handleWalletConnect={function (): void {
                throw new Error('Function not implemented.');
            } } walletInfo={null} handleLogout={function (): void {
                throw new Error('Function not implemented.');
            } } handleDisconnect={function (): void {
                throw new Error('Function not implemented.');
            } } handleToggleLogin={handleToggleLogin} handleToggleSideContent={function (): void {
                throw new Error('Function not implemented.');
            } }/>
            <LoginHome 
                handleToggleLogin={handleToggleLogin}/>
            {showLoginForm && (
                <LoginForm 
                    setShowLoginForm={setShowLoginForm}
                    handleToggle={handleToggle}
                    handleSubmit={handleSubmit}
                    isSignup={isSignup}
                    errors={errors}
                    />
                )
            }
        </div>
    )
}

export default Login