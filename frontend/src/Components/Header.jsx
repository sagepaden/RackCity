import logo from './../assets/Images/logo.jpg';
import { HiOutlineMagnifyingGlassCircle } from "react-icons/hi2";

function Header() {
  return (
    <div>
          <img src={logo} width={60} height={60} />
          <div>
              <input type='text'/>
          </div>
    </div>
  );
}
export default Header;
