import React, { useEffect, useRef, useState } from 'react';
import { auth, db } from "../../firebaseConfig";
//import { updateProfile } from 'firebase/auth';
//import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { FaPlusCircle } from 'react-icons/fa';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthProvider';
import { toast } from 'react-toastify';

// interface UserProfileProps {
//   uid: string;
//   displayName: string | null;
//   photoURL: string | null;
//   email: string | null;
// }

const Profile: React.FC = () => {

  const user = useAuth();

  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [profile, setProfile] = useState(user);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    
      const file = event.target.files?.[0]
      const uid = auth.currentUser?.uid;

      if (file && uid) {

        const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
        if (!allowedTypes.includes(file.type)) {
          notifyError('Invalid file type, Please upload file in .jpg, .jpeg, .png or .svg image.')
          return;
        }

        const reader = new FileReader();
        setIsUploading(true)

        reader.onloadend = () => {
          const base64Image = reader.result as string;

          // Store the image in localStorage (scheck size before storing)
          if (base64Image.length < 2 * 1024 * 1024) {
            localStorage.setItem('profilePhoto', base64Image);
            setProfilePhoto(base64Image);
            notifySuccess('File is successfully uploaded.')
          } else {
            notifyError('File size is too large. Please upload an image smaller then 2MB.');
          }
        };
        reader.readAsDataURL(file);
        setIsUploading(false)
      }

      // if (file && uid) {
      //     const storageRef = ref(storage, `profile_photos/${auth.currentUser?.uid}`);
      //     const uploadTask = uploadBytesResumable(storageRef, file);

      //     setIsUploading(true);

      //     uploadTask.on(
      //       "state_changed",
      //       null,
      //       (error) => {
      //         console.error("Upload failed", error);
      //         setIsUploading(false);
      //       },
      //       async () => {
      //         const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      //         setProfilePhoto(downloadURL);

      //         //update user's profile in Firebase Auth
      //         await updateProfile(auth.currentUser!, { photoURL: downloadURL })

      //         //update user profile in Firestore
      //         await updateUserProfile(uid, { photoURL: downloadURL });
      //         setIsUploading(false)

      //       }
      //     )
      // }
  };

      // const updateUserProfile = async (uid: string, updateData: Partial<UserProfileProps>) => {
      //   const userDocRef = doc(db, "users", uid);
        
      //   try {
      //     await updateDoc(userDocRef, updateData);
      //     console.log("Profile updated successfully!");
          
      //   } catch (error) {
      //     console.error("Error updating profile:", error);
          
      //   }
      // }


  useEffect(() => {
    const fetchUserProfile = async () => {
        if (user) {
          setProfile(user);
        } else {
          const authUser = auth.currentUser;
          if (authUser) {
            await getDoc(doc(db,"users", authUser.uid));
            // if (userDoc.exists()) {
            //   setProfile({
            //     uid: authUser.uid,
            //     displayName: authUser.displayName || userDoc.data()?.displayName,
            //     photoURL: authUser.photoURL || userDoc.data()?.photoURL,
            //     email: authUser.email,
            //   });
            // }
          }
        }
    };
    const savedProfilePhoto = localStorage.getItem('profilePhoto');
    if (savedProfilePhoto) {
      setProfilePhoto(savedProfilePhoto)
    } else {
      setProfilePhoto(profilePhoto)
    }
    fetchUserProfile();
}, [user]);

if (!profile) {
  return <div>Loading...</div>;
}

  return (

    <div className='relative flex flex-row justify-start items-center mt-2 p-6 bg-white shadow-md rounded-lg space-x-3'>
        <div className='relative -translate-y-2'>
          <img 
            src={profilePhoto || auth.currentUser?.photoURL || "/src/components/Asset/user_default.png"} 
            alt="Profile" 
            className="profile-picture w-12 h-12 rounded-full cursor-pointer"
            />
            <label htmlFor="fileInput" className='absolute text-green-500 text-lg 
            cursor-pointer hover:text-green-600 -my-2 mx-8'>
              {isUploading ? (
                <span className='text-gray-500'>...</span>
              ) : (<span><FaPlusCircle /></span>) }
            </label>
        </div>
        <input
          id="fileInput"
          type="file" 
          ref={fileInputRef} 
          className='hidden' 
          accept='.jpg, .jpeg, .png, .svg' 
          onChange={handleFileChange}/>
        <div className='flex flex-col -translate-y-2'>
          <h1 className='p-1 text-lg font-semibold text-gray-500'>
            {auth.currentUser?.displayName || "User Name"}
          </h1>
          <hr className='border border-gray-500' />
          <p className='p-1 text-sm font-semibold text-gray-500'>
            {auth.currentUser?.email}
          </p>
        </div>
        
    </div>

  )
}

export default Profile