// import { useNavigate } from "react-router-dom";

const ErrorPage = ({error}:{error ?:string}) => {
  // const navigate=useNavigate();
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-black text-slate-400 font-semibold text-3xl">
      <div >Error Occured</div>
      <div className="text-xl">{error==null? "Something Broke" : error}</div>
      {/* <div onClick={()=>{
        navigate("/")
      }}> Go back to home page ?</div> */}

    </div>
  );
};

export default ErrorPage;
