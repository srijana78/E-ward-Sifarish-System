// import React, { useState, useContext } from "react";
// import {
//   LogOut,
//   User,
//   FileText,
//   ArrowRight,
//   Bell,
//   Mail,
//   Lock,
// } from "lucide-react";
// import { AuthContext } from "../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState(" ");
//   const [password, setPassword] = useState(" ");

//   const [role, setRole] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // const {login} = useContext(AuthContext);// this is object  destructuring

//   // const {login} = useContext(AuthContext);// this is object  destructuring

//   //  suppose AuthContext provide : {
//   //   login: loginFunction,
//   //   logout: logoutFunction,
//   //   user: userData
//   // } and if i want only loging the
//   // const {login} = useContext(AuthContext); means login function from AuthContext then i can call login(...)

//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//   };

//   setTimeout(() => {
//     const mockUserData = {
//       name: role === "Citizen" ? "sriju" : "rijju",
//       email: email,
//       role: role,
//     };

//     //  const mockToken = " mock_jwt_token_123456"// this creates a authentication taken

//     //  Login(mockUserData, mockToken)// calling login()
//     //  setLoading(false);// stopping the loading state

//     // Route based on user role/ checking user's role

//     if (role === "Citizen") {
//       navigate("/citizen-dashboard");
//     } else {
//       navigate("/admin");
//     }
//   }, 800);

//   return (
//     <div className=" min-h-screen bg-slate-950 flex flex-col justify-center  items-center p-4    ">
//       <div className="container bg-slate-900  w-full   border border-slate-800 rounded-2xl shadow-xl p-8 space-y-6 max-w-md  ">
//         <div className="  text-center  space-y-2  ">
//           <div className="bg-blue-600/20 inline-flex p-3 rounded-xl border  border-blue-500/30 text-yellow-400  mb-1">
//             <FileText className="h-8 w-8" />{" "}
//           </div>

//           <h1 className=" text-white text-2xl  font-bold  tracking-wide">
//             Welcome Back
//           </h1>

//           <p className=" text-slate-400  text-xs">
//             E-Ward Sifarish Portal - Government of Nepal
//           </p>
//         </div>

//         {/* Role Toggle Selector */}

//         <div className=" bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 text-xs  font-medium  flex">
//           {["Citizen", "FrontOffice", "Secretary", "Chairperson"].map((r) => {
//             <button
//               key={r}
//               type="button"
//               onClick={() => setRole(r)}
//               className={` flex-1 py-2 rounded-lg transition-all duration-200 cursor-pointer
//         ${
//           role === r
//             ? "bg-blue-600  text-white font-semibold  shadow-md"
//             : "text-slate-400  hover:text-white"
//         }

//         `}
//             >
//               {r === "FrontOffice" ? "Front Desk" : r}
//             </button>;
//           })}
//         </div>

//         {/* Login Form */}

//         <form action="" onSubmit={handleSubmit} className="  space-y-4 ">
//           {/* email input */}
//           <div>
//             <label className="  block text-xs  font-medium text-slate-300  mb-1.5">
//               {" "}
//               Email Address/ Citizen ID
//             </label>

//             <div className="  relative ">
//               <div className="absolute  inset-y-0 left-0  pl-3  flex  items-center pointer-events-none text-slate-500 ">
//                 <Mail className=" h-4 w-4" />
//               </div>

//               <input
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="srijana89@gmail.com"
//                 className=" w-full bg-slate-800/50 pl-10 pr-4 border  py-2.5 border-slate-700  rounded-xl text-sm text-slate-200 placeholder-slate-200  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
//               />
//             </div>
//           </div>

//           {/* Password input */}

//           <div>
//             <label className=" text-xs font-medium text-slate-200 mb-1.5  block">
//               {" "}
//               Password{" "}
//             </label>
//             <div className="relative">
//               <div className=" absolute inset-y-0  left-0  pl-3  flex   items-center  pointer-events-none text-slate-200">
//                 <Lock className="h-4 w-4 " />
//               </div>

//               <input
//                 type="password"
//                 required
//                 placeholder="............"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="  w-full  pl-10 pr-4 py-2.5 bg-slate-400/50   border border-slate-700  rounded-xl text-sm text-slate-200 placeholder-slate-200 focus:outline-none focus:border-blue-500  focus:ring-blue-500 transition
//         tracking-wide "
//               />
//             </div>
//           </div>

//           {/* Options:Remember and forgot */}

//           <div className="flex  justify-betwee  items-center text-xs text-slate-400">
//             <label className=" flex items-center  space-x-2 cursor-pointer  ">
//               <input
//                 type="checkbox"
//                 className=" rounded bg-slate-800 border-slate-700  text-blue-600  focus:ring-0 "
//               />
//               <span>Remember me</span>
//               <a
//                 href="# "
//                 className="text-blue-400 hover:text-blue-500 transition"
//               >
//                 {" "}
//                 Forgot password?
//               </a>
//             </label>
//           </div>

//           {/* Submit Button */}

//           <button
//             className="w-full  bg-blue-600   hover:bg-blue-500 text-white font-semibold py-2.5 rounded-xl transition items-center  space-x-2  shadow-lg shadow-blue-600/25 cursor-pointer disabled:opacity-50"
//             type="submit"
//             disabled={loading}
//           >
//             {loading ? (
//               <span>Signing in...</span>
//             ) : (
//               <>
//                 <span> Sign In as {role}</span>
//                 <ArrowRight className="h-4 w-4" />
//               </>
//             )}
//           </button>
//         </form>

//         {/* Footer link */}
//         <p className=" text-center text-xs text-slate-400  pt-2 border-t  border-slate-800 ">
//           Don't have a citizen account?
//         </p>
//         <Link
//           to="/register"
//           className="text-blue-400  font-semibold hover:text-blue-300"
//         >
//           {" "}
//           Register here
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FileText,
  Mail,
  Lock,
  ShieldCheck,
  ArrowRight,
  UserCheck,
} from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Citizen"); // Default role
  const [loading, setLoading] = useState(false);

  //   const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulated login delay for Step 1 UI testing
    setTimeout(() => {
      const mockUserData = {
        name: role === "Citizen" ? "Ramesh Shrestha" : "Srijana Admin",
        email: email,
        role: role,
      };
      const mockToken = "mock_jwt_token_123456";

      //   login(mockUserData, mockToken);
      //   setLoading(false);

      // Route based on user role
      if (role === "Citizen") {
        navigate("/citizen-dashboard");
      } else {
        navigate("/admin");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4">
      {/* Container */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-8 space-y-6">
        {/* Portal Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-xl bg-blue-600/20 border border-blue-500/30 text-yellow-400 mb-1">
            <FileText className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Welcome Back
          </h1>
          <p className="text-xs text-slate-400">
            E-Ward Sifarish Portal • Government of Nepal
          </p>
        </div>

        {/* Role Toggle Selector */}
        <div className="bg-slate-800/80 p-1 rounded-xl flex border border-slate-700/60 text-xs font-medium">
          {["Citizen", "FrontOffice", "Secretary", "Chairperson"].map(
            (roles) => (
              <button
                key={roles}
                type="button"
                onClick={() => setRole(roles)}
                className={`flex-1 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                  role === roles
                    ? "bg-blue-600 text-white font-semibold shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {roles === "FrontOffice" ? "Front Desk" : roles}
              </button>
            ),
          )}
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Email Address / Citizen ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Options: Remember & Forgot */}
          <div className="flex justify-between items-center text-xs text-slate-400">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-0"
              />
              <span>Remember me</span>
            </label>
            <a
              href="#"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-xl text-sm transition duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/25 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>Signing in...</span>
            ) : (
              <>
                <span>Sign In as {role}</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
          Don't have a citizen account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
