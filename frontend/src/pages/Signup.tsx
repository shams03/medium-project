import CreateAccount from "../components/CreateAccount";
import Quotes from "../components/Quotes";

const Signup = () => {
  return (
    <div className="h-screen flex  ">
      <div className="w-1/2 flex justify-center items-center">
        <CreateAccount type="signup"/>
      </div>
      <div className="w-1/2 flex justify-center items-center bg-slate-200">
        <Quotes />
      </div>
    </div>
  );
  
};

export default Signup;
