import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.util";

import "./navigation.styles.scss";

const Navigation = () => {

    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
        <Fragment>
            <div className="navigation">

                {/* CROWN-CLOTHING LOGO IN NAVBAR */}
                <Link className="logo-container" to="/">
                    <CrownLogo className="logo" />
                </Link>

                {/* OTHER PAGE LINKS  */}
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop"> SHOP </Link>

                    {currentUser ? (
                        <span className="nav-ling" onClick={signOutUser}> SIGN OUT </span>
                    ) : (
                        <Link className="nav-link" to="/auth"> SIGN IN </Link>
                    )}

                    <CartIcon />
                </div>
                
                {isCartOpen && <CartDropdown />}

            </div>

            <Outlet />
        </Fragment>
    );
}

export default Navigation;