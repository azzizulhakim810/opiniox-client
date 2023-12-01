import { Link, NavLink } from "react-router-dom";
// import logo from "/logo.png";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
    // Menu Item Creation
    const menuItem = (
      <div className="text-[15px] font-medium lg:flex grid grid-cols-1">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? " capitalize py-1 px-2 mx-2"
              : "  py-1 px-2 mx-2"
          }
        >
          Home
        </NavLink>
  
        <NavLink
          to="/membership"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? " capitalize py-1 px-2 mx-2 "
              : "  py-1 px-2 mx-2"
          }
        >
          Membership
        </NavLink>
  
      </div>
    );
  return (
    <div>
     
<footer className="grid md:grid-cols-3 grid-cols-1 md:gap-0 gap-3 px-10 py-4 border-t bg-gray-200 items-center justify-center">

  <aside className="items-center flex cols-span-1 md:justify-normal justify-center">
    <img className="lg:w-40 w-32" src="https://i.ibb.co/gMVVZXK/Logo.png" alt="" />
    <span className="hidden lg:flex">{menuItem}</span>
  </aside> 


    <div className=" cols-span-1 text-center -ml-0 md:-ml-8 lg:-ml-0 md:order-none order-3">
    <p>2023© OpinioX. All Rights Resereved</p>
    </div>


  <nav className="cols-span-1 order-2 md:order-none">
  <Link to='#'  className="flex md:justify-end justify-center lg:gap-8 md:gap-4 gap-3 text-2xl text-cyan-500">
      <FaFacebook/> 
      <FaGithub/> 
      <FaInstagram/> 
      <FaLinkedin/>
      </Link>
  </nav>
</footer>
    </div>
  );
};

export default Footer;