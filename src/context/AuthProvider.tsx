import { useEffect, useState, createContext, useContext, ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import userDefaultImage from "../components/Asset/user_default.png"


interface UserProfileProps {
    uid: string;
    displayName: string | null;
    photoURL: string | null;
    email: string | null;
}

type AuthContextType = UserProfileProps | null;
const AuthContext = createContext<AuthContextType>(null);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AuthContextType>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const userDocRef = doc(db, "users", firebaseUser.uid);
                    const userDoc = await getDoc(userDocRef);

                    const userData = userDoc.exists() ? userDoc.data() : {};
                    setUser({
                        uid: firebaseUser.uid,
                        displayName: firebaseUser.displayName || userData.displayName || "Anonymous",
                        photoURL: firebaseUser.photoURL || userData.photoURL || userDefaultImage,
                        email: firebaseUser.email || userData.email,
                });
                } catch (error) {
                    console.error("Error fetching user document", error);
                } 
            } else {
                setUser(null);
            }
        });
        
        return () => unsubscribe();
    }, []);

    return (

        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>

    )
}

export default AuthProvider;