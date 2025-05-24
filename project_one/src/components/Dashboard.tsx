import { useAuth0 } from '@auth0/auth0-react';


const Dashboard = () => {
    const { isAuthenticated } = useAuth0();
    
    return (
        isAuthenticated && (
            <div className="">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                <p className="mb-4">Welcome to your dashboard!</p>
            
            </div>
        )
    );
};

export default Dashboard;