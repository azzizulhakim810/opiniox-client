import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Login = () => {
  const {googleLogin, signin} = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);
  const axiosSecure = useAxiosSecure();

  // if(loading) {
  //   return <span className="loading loading-spinner text-error text-6xl mx-auto flex justify-center items-center py-5 "></span>
  // }

    const handleSignIn = (e) => {

    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const user = { email, password};
    // console.log(user);
    form.reset();
   
 /*    const user = {
      name, 
      email, 
      photoURL,
      badge : 'Bronze',
      postCount: 0,
      role: 'user'
      
    }; */

    signin(email, password)
    .then(res => { 
      console.log(res.user);
      Swal.fire(
        'Great!',
        "Successfully Logged In",
        'success'
      )
      

      navigate(location?.state ? location?.state : '/');
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.error(error.message);
      // setErrorMessage(errorMessage);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${errorMessage}`,
      });
    });
  }


    const handleGoogleSignin = () => {
    googleLogin()
    .then(res => {
      console.log(res.user);
      Swal.fire(
        'Great!',
        "Successfully Logged In",
        'success'
      )
      const googleUser = {
        name: res.user?.displayName,
        email:res.user?.email,
        photoURL: res.user?.photoURL,
        badge: 'Bronze',
        postCount: 0,
        role: 'user'
      }

      axiosSecure.post('/addUser', googleUser)
      .then(res => console.log(res.data))

      navigate(location?.state ? location.state : '/')
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.error(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${errorMessage}`,
      });
    });
  }
  return (
    <div>
      <div className="grid grid-cols-2 gap-20 justify-between items-center h-[100vh]  ">

        <div className="relative bg-cyan-500 h-full flex  items-center">
          <img
            className="absolute w-[150px] top-0 "
            src="https://i.ibb.co/M2vWyMS/top-ornamate.png"
            alt=""
          />
          <div className="w-full absolute left-0 bg-gray-100 bg-opacity-10 py-0 rounded-full">
            <img
              className="w-[350px] -mb-12 -mt-2 pl-4"
              src="https://i.ibb.co/Jk7B2wN/door.png"
              alt=""
            />
          </div>
          <img
            className="absolute w-[100px] right-0 bottom-0"
            src="https://i.ibb.co/VQ0BWHL/bottom-ornamate.png"
            alt=""
          />
          <img
            className="absolute w-[100px] -right-3 top-0 -rotate-90"
            src="https://i.ibb.co/VQ0BWHL/bottom-ornamate.png"
            alt=""
          />
        </div>

        <div className=" bg-white m-8 ">
          {/* Logo  */}
          <div className="w-52 mx-auto mb-3">
          <Link to='/'>
            <img
              src="https://i.ibb.co/gMVVZXK/Logo.png"
              className="w-52" />
          </Link>
          </div>
          {/* Form  */}
          <div className="border-[1px] border-gray-200 rounded-lg p-8">
            <h4 className="block font-sans text-3xl font-bold leading-snug tracking-normal text-blue-gray-900 antialiased">
              Sign In to your account
            </h4>
            <p className="mt-1 block font-sans text-base font-normal leading-relaxed text-gray-500 antialiased">
              By signing in, you understand and agree to our Terms and
              Conditions.
            </p>

            {/* <Google Button  */}
            <div className="flex justify-center w-full py-5">
              <button
                onClick={handleGoogleSignin}
                className="flex select-none items-center gap-3 rounded-lg border border-blue-gray-500 py-3.5 w-full justify-center align-middle font-sans text-sm font-bold uppercase text-blue-gray-500 transition-all hover:opacity-75 focus:ring focus:ring-blue-gray-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                data-ripple-dark="true"
              >
                <FcGoogle></FcGoogle>
                Continue with Google
              </button>
            </div>

            <div className="flex flex-col w-full border-opacity-80 -mt-5">
  
  <div className="divider">OR</div>
  
</div>
            
            <form onSubmit={handleSignIn} className="mt-8 mb-2 md:w-full sm:w-96">
              <div className="mb-4 flex flex-col gap-6">
                
                <div className="relative h-11 w-full">
                  <input name="email"
                    className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-1 outline-gray-300 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    required
                    placeholder=" "
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Email
                  </label>
                </div>
                <div className="relative h-11 w-full ">
                  <input name="password"
                    type="password"
                    className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-1 outline-gray-300 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    required
                    placeholder=" "
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Password
                  </label>
                </div>
              </div>
              <div className="inline-flex items-center">
                <label
                  className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3"
                  htmlFor="checkbox"
                  data-ripple-dark="true"
                >
                  <input
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-cyan-500 checked:bg-cyan-500 checked:before:bg-cyan-500 hover:before:opacity-10"
                    id="checkbox" required
                  />
                  <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
                <label
                  className="mt-px cursor-pointer select-none font-light text-gray-700"
                  htmlFor="checkbox"
                >
                  <p className="flex items-center font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
                    I agree the
                    <a
                      className="font-medium transition-colors hover:text-cyan-500"
                      href="#"
                    >
                      &nbsp;Terms and Conditions
                    </a>
                  </p>
                </label>
              </div>
              <button
                className="mt-6 block w-full select-none rounded-lg bg-cyan-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                required
                type="submit"
                data-ripple-light="true"
              >
                Sign In
              </button>
              <p className="mt-4 block text-left font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                Don't Have An Account?
                <Link
                  className="font-medium text-cyan-500 transition-colors hover:text-blue-700"
                  to='/signup'
                >
                  &nbsp; SignUp
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
