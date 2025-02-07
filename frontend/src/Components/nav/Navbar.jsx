import { NavLink } from "react-router-dom";
import { miscImages } from "../../assets/assets";

function Navbar() {
  return (
    <nav className="text-white bg-[#1f4959] flex justify-between px-15 items-center">
      <span><NavLink to="/"><img src={miscImages.logo} className="w-20 py-1"/></NavLink></span>
      <div>
        <ul className="flex gap-3 p-3">
          <li className="">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative after:absolute after:left-0 after:bottom-[-0.5rem] 
                  after:scale-x-0 hover:after:scale-x-100 after:h-[1px] after:w-full 
                 after:bg-black after:transition-transform after:duration-300 after:ease-in-out 
                 ${isActive ? "text-cyan-600" : ""}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative after:absolute after:left-0 after:bottom-[-0.5rem] 
                  after:scale-x-0 hover:after:scale-x-100 after:h-[1px] after:w-full 
                 after:bg-black after:transition-transform after:duration-300 after:ease-in-out 
                 ${isActive ? "text-cyan-600" : ""}`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/personalisation"
              className={({ isActive }) =>
                `relative after:absolute after:left-0 after:bottom-[-0.5rem] 
                  after:scale-0 hover:after:scale-100 after:h-[1px] after:w-full 
                 after:bg-black after:transition-transform after:duration-300 after:ease-in-out 
                 ${isActive ? "text-cyan-600" : ""}`
              }
            >
              Personalisation
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        <button className="bg-[#011425] px-5 py-2.5 rounded-tl-2xl cursor-pointer">
         <NavLink to="/login">         
          login
         </NavLink>   
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
