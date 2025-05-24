import { useAuth0 } from '@auth0/auth0-react';


const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();
    
    return (
        isAuthenticated && (
            <button className="cursor-pointer text-center" onClick={() => logout()}>
                Log Out
            </button>
        )
    );
};

export default LogoutButton;