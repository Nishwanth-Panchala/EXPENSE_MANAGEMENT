import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import {Link,  useNavigate} from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";
const SignUp=()=>{
  const[profilePic,setProfilePic]=useState(null)
  const[fullName,setFullName]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPasswword]=useState("")
  const[error,setError]=useState(null)
  const {updateUser}=useContext(UserContext)
  const navigate = useNavigate();
  const handleSignUp=async(e)=>{
  e.preventDefault();
  let profileImageUrl=""
  if(!fullName)
  {
    setError("Please enter your name")
    return
  }
  if(!validateEmail(email))
  {
    setError("Please enter valid email")
    return
  }
  if(!password)
  {
    setError("Please enter the password")
    return
  }
  setError("")
  try
  {
    //upload image if present
    if(profilePic)
    {
      const imgUploadRes=await uploadImage(profilePic)
      profileImageUrl=imgUploadRes.imageUrl ||"";
    }

    const response=await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
      fullName,
      email,
      password,
      profileImageUrl
    })
    const {token,user}=response.data
    if(token)
    {
      localStorage.setItem("token",token)
      updateUser(user)
      navigate("/dashboard")
    }
  }
  catch(error)
  {
    if(error.response && error.response.data.message)
    {
      setError(error.response.data.message)
    }
    else
    {
      setError("Something went wrong plese try again")
    }
  }

  }
  return(
    <AuthLayout>
<div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
  <h3 className="text-xl font-semibold text-black">Create an account</h3>
  <p className="text-xs text-slate-700 mt-[5px] mb-6">
    Join us today by entering ur details below.
  </p>
  <form onSubmit={handleSignUp}>
    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input 
      value={fullName}
      onChange={({target})=>setFullName(target.value)}
      label="Full Name"
      placeholder="John"
      type="text"
      />
    </div>
    <Input 
        value={email}
        onChange={({target})=>setEmail(target.value)}
        label="Email Address"
        placeholder="johndoe@example.com"
        type="text"
        />
        <div className="col-span-2">
        <Input 
        value={password}
        onChange={({target})=>setPasswword(target.value)}
        label="Password"
        placeholder="Min 8 Chanracters"
        type="password"
        />
        </div>
         {error && <p className="text-red-500 text-xs pb-2.5 ">{error}</p>}
                <button type="submit" className="btn-primary">
                  SIGNUP
                </button>
                  <p className="text-[13px] text-slate-800 mt-3">
                    Already have an Account?{" "}
                    <Link className="font-medium text-primary underline" to="/login">
                    Login
                    </Link>
                  </p>
  </form>
</div>
    </AuthLayout>
  )
}
export default SignUp;