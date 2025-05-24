
import './App.css';
import LoginButton from './components/LoginButton'; // Verify the file exists or correct the path
import LogoutButton from './components/LogoutButton'; // Ensure the file exists in the specified path
import Dashboard from './components/Dashboard'; // Ensure the file exists in the specified path

function App() {
  

  return (
    <>
      <div className="bg-gray-200 absolute top-0 left-0 w-75 h-full shadow-sm p-10 invisible md:visible">
      
      <img src="/favicon.png" alt="Logo" className="w-12 h-12 mb-4" />
      <h1 className="text-lg font-bold text-gray-800">Project 01</h1> 
      <nav className="mt-6 ">
        
      </nav>
      
        <footer className="fixed bottom-10 left-18 text-center">
          <small className="text-gray-500 cursor-pointer"><LogoutButton/></small><br></br>
          <small className="text-gray-500 cursor-pointer"><LoginButton/></small><br></br>
          <small className="text-gray-500">© retailmedia.dev</small>
        </footer>
    </div>
    <div className="visible md:invisible text-center place-items-center">
      <h1> I'm not visible on mobile, please check me out on a desktop</h1>
    </div>
      <main className="invisible md:visible">
        <Dashboard/>
      </main>    
    </>
  );
}

export default App;
