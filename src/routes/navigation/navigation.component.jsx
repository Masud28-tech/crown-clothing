import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.util";

import "./navigation.styles.scss";

const Navigation = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext);

    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null);
    }

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
                        <span className="nav-ling" onClick={signOutHandler}> SIGN OUT </span>
                    ) : (
                        <Link className="nav-link" to="/auth"> SIGN IN </Link>
                    )}
                </div>

            </div>

            <Outlet />
        </Fragment>
    );
}

export default Navigation;