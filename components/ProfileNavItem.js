import { useContext, useState } from "react";
import Link from 'next/link'
import { useRouter } from 'next/router'
import { StoreContext } from "../store";
import { logoutFromFirebase } from "../actions";

export default function ProfileNavItem(props) {
    const { children, onClick, to, className, activeClassName, logOut } = props;
    const { state, dispatch } = useContext(StoreContext);
    const router = useRouter();
    const [navhover, setNavhover] = useState(false);

    const handleLogout = () => {
        logoutFromFirebase(dispatch);
        router.push("/");
    };

    return (
        !logOut? (
            <Link href="/profile/[page_name]" as={to}>
                <div
                onClick={onClick}
                onMouseEnter={() => setNavhover(true)}
                onMouseLeave={() => setNavhover(false)}
                className={`
                    ${className} 
                    ${state.profileNavBar.activeItem === to ? activeClassName : ""}`}
                >   
                    <img
                        src="/images/hover-img.png"
                        className={(!navhover) ? "hover-img hover-img-no" : "hover-img hover-img-posts" }
                    />
                    <p>{children}</p>
                </div>
            </Link>
        ) : (
            <div
                onClick={handleLogout}
                onMouseEnter={() => setNavhover(true)}
                onMouseLeave={() => setNavhover(false)}
                className={`${className} profile-logout`}
            >   
                <img
                    src="/images/hover-img.png"
                    className={ (!navhover) ? "hover-img hover-img-no" : "hover-img hover-img-posts" }
                />
                <p>{children}</p>
            </div>
        )
    );
}