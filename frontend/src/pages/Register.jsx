import React, { useState } from "react";
import {
  FileText,
  ArrowRight,
  User,
  Mail,
  Phone,
  CreditCard,
  Lock,
} from "Lucide-react";
import { Link } from "react-router-dom";



function Register() {

const [formData, setFormData] =useState(
  {
    fullName:'',
    email:'',
    phone:'',
    citizenshipNo:'',
    password:'',
    confirmPassword:''

  }
);

const [loading, setLoading] = useState(false);
// const navigate= useNavigate();


const handleChange = (e)=>{
  setFormData({...formData, [e.target.name]: e.target.value})
};



const handleSubmit = (e)=>{
  e.preventDefault();

  if(formData.password !== formData.confirmPassword){
    alert("Password do not match !");
    // return ;
  }
 setLoading(true);

 // simulated registration delay

 setTimeout(()=>{
  setLoading(false);
  alert("Account created successfully ! Please log in .")
  // Navigate("/login");
 },800)

};

// }





  return (
    <div className="bg-slate-950 text-white min-h-screen  flex justify-center  items-center  flex-col   ">
      <div className=" bg-slate-900  rounded-2xl shadow-xl border border-slate-800  w-full space-y-3 max-w-md py-8 px-8 ">
        <div className=" text-center space-y-2  ">
          <div className=" p-3  rounded-xl bg-blue-600/20 inline-flex py-3 px-3  text-yellow-400 border border-blue-500/30">
            <FileText className="h-8 w-8" />
          </div>

          <h1 className=" text-2xl font-bold  text-white tracking-wide">
            Citizen Registration
          </h1>
          <p className=" text-xs  text-slate-400">
            Create an account to apply & track Ward Sifarish requests online
          </p>
        </div>

        <form action="" className="  space-y-4  mt-8  ">
          <div className=" ">
            <label className="block text-xs font-medium text-slate-300 mb-1.5"> Full Name</label>
            <div className="relative  ">
              <div className="  absolute text-slate-300  inset-y-0  pl-3 left-0 flex items-center   pointer-events-none  ">
                <User className="h-4 w-4 " />
              </div>

              <input
                className=" w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                type="text"
                placeholder="Bob Dylan"
                 required
                  value={formData.fullName}
                  onChange={handleChange}


              />
            </div>
          </div>

          <div className=" ">
            <label className="block text-xs font-medium text-slate-300 mb-1.5"> Email Address</label>
            <div className="relative  ">
              <div className="  absolute text-slate-300  inset-y-0  pl-3 left-0 flex items-center   pointer-events-none  ">
                <Mail className="h-4 w-4 " />
              </div>

              <input
                className="  w-full
                 pl-10 py-2.5 pr-4 
                 bg-slate-800/50  border border-slate-700   
                 rounded-xl 
                 text-sm 
                  text-white  placeholder-slate-300 
                  focus:outline-none
                  focus:border-blue-500
               
                    transition"
                type="email"
                placeholder="name@gmail.com"
                name="email"
                value={formData.email}
                onChange={handleChange}

              />
            </div>
          </div>

          <div className=" ">
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Phone Number </label>
            <div className="relative  ">
              <div className="  absolute text-slate-300  inset-y-0  pl-3 left-0 flex items-center   pointer-events-none  ">
                <Phone className="h-4 w-4 " />
              </div>

              <input
                className="  w-full
                 pl-10 py-2.5 pr-4 
                 bg-slate-800/50  border border-slate-700   
                 rounded-xl 
                 text-sm 
                  text-white  placeholder-slate-300 
                  focus:outline-none
                  focus:border-blue-500
               
                    transition"
                type="phone"
                placeholder="98XXXXXXXX"
                onChange={handleChange}
                value={formData.phone}

              />
            </div>
          </div>

          <div className=" ">
            <label className="block text-xs font-medium text-slate-300 mb-1.5"> citizenship Card Number </label>
            <div className="relative  ">
              <div className="  absolute text-slate-300  inset-y-0  pl-3 left-0 flex items-center   pointer-events-none  ">
                <CreditCard className="h-4 w-4 " />
              </div>

              <input
                className="  w-full
                 pl-10 py-2.5 pr-4 
                 bg-slate-800/50  border border-slate-700   
                 rounded-xl 
                 text-sm 
                  text-white  placeholder-slate-300 
                  focus:outline-none
                  focus:border-blue-500
               
                    transition"
                    onChange={handleChange}
                    name="citizenshipNo"
                    value={formData.citizenshipNo}
                    required

                type="text"
                placeholder=" 24-02-34-23455"
              />
            </div>
          </div>

          <div className=" ">
            <label className="block text-xs font-medium text-slate-300 mb-1.5"> Password</label>
            <div className="relative  ">
              <div className="  absolute text-slate-300  inset-y-0  pl-3 left-0 flex items-center   pointer-events-none  ">
                <Lock className="h-4 w-4 " />
              </div>

              <input
                className="  w-full
                 pl-10 py-2.5 pr-4 
                 bg-slate-800/50  border border-slate-700   
                 rounded-xl 
                 text-sm 
                  text-white  placeholder-slate-300 
                  focus:outline-none
                  focus:border-blue-500
               
                    transition"
                type="password"
                required
                placeholder="....."
                name="password"
                onChange={handleChange}
                value={formData.password}

              />
            </div>
          </div>

          <div className=" ">
            <label className=""> Confirm Password</label>
            <div className="relative  ">
              <div className="  absolute text-slate-300  inset-y-0  pl-3 left-0 flex items-center   pointer-events-none  ">
                <Lock className="h-4 w-4 " />
              </div>

              <input
                className="  w-full
                 pl-10 py-2.5 pr-4 
                 bg-slate-800/50  border border-slate-700   
                 rounded-xl 
                 text-sm 
                  text-white  placeholder-slate-300 
                  focus:outline-none
                  focus:border-blue-500
               
                    transition"
                type="password"
                required
                placeholder="......."
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}

              />
            </div>
          </div>

          {/* Submit button */}
          <button 
          type="submit"
          disabled={loading}

          className="w-full  bg-blue-600 hover:bg-blue-500   text-white font-semibold py-2.5 rounded-xl text-sm  transition  duration-200 flex items-center  justify-center  space-x-2  shadow-lg  shadow-blue-600/50  cursor-pointer mt-3  tracking-wide disabled:opacity-50 "
          >
            {loading? (<span>Creating Account..</span>):(<>
            <span>Register Account</span>

            <ArrowRight className="h-4 w-4" />
            </>)}
       
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800  tracking-wide  "> Already registered? {' '}
          <Link
            to="/register"
            className="text-blue-400  hover:text-blue-300 font-semibold"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
