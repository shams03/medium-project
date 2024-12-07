import { ChangeEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@shamsii/medium-project-common/dist/zod";
import axios from "axios";
import { BACKEND_URL } from "../config";
import toast, { Toaster } from "react-hot-toast";

const CreateAccount = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  const userRef = useRef<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    setFormData(userRef.current);
    console.log(formData);
    const loadingToast = toast.loading("Loading...");
    if (type == "signup") {
      try {
        await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, formData);
        toast.success("Signed Up successfully, Sign in to continue", {
          id: loadingToast,
        });
        navigate("/signin");
      } catch {
        toast.error("Error while signing up", { id: loadingToast });
      }
    } else if (type == "signin") {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/user/${type}`,
          formData
        );
        const jwt = response.data;
        localStorage.setItem("token", jwt?.token);
        toast.success(jwt?.message, { id: loadingToast });
        navigate("/blogs");
      } catch {
        toast.error("Error while signing in", { id: loadingToast });
      }
    }
  };

  return (
    <div>
      {" "}
      <Toaster />
      <div className="hover:scale-110 transition-all">
        <div className="text-3xl font-bold ">
          {type == "signup" ? " Create an account " : " Sign in"}
        </div>
        <label htmlFor="loginId" className=" text-slate-700">
          {type == "signup"
            ? "  Already a member ? "
            : " Don't have an account ?"}
        </label>{" "}
        <Link
          id="loginId"
          to={type == "signup" ? "/signin" : "/signup"}
          className="underline text-slate-700"
        >
          {" "}
          {type == "signup" ? "Login " : "Sign Up"}{" "}
        </Link>
        <div className="pt-3 w-fit">
          {type == "signin" ? null : (
            <LabelledInput
              placeholder="Shams Zaman"
              label="Username : "
              id="usernameId"
              value={userRef.current.name || ""}
              onChange={(e) => {
                userRef.current = { ...userRef.current, name: e.target.value };
              }}
            />
          )}
          <div className="pt-2" />
          <LabelledInput
            placeholder="abc@123.com"
            label="Email : "
            id="emailId"
            value={userRef.current.email}
            onChange={(e) => {
              userRef.current = { ...userRef.current, email: e.target.value };
            }}
          />
          <div className="pt-2" />
          <LabelledInput
            placeholder="password"
            label="Password : "
            id="passwordId"
            value={userRef.current.password}
            onChange={(e) => {
              userRef.current = {
                ...userRef.current,
                password: e.target.value,
              };
            }}
          />
          <div className="pt-3"></div>
          <button
            className="bg-black text-slate-200 w-full px-2 py-2 rounded-full"
            onClick={handleSubmit}
          >
            {" "}
            {type == "signup" ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>{" "}
    </div>
  );
};

interface LabelledInputType {
  placeholder: string;
  label: string;
  type?: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void; //alag
}

const LabelledInput = ({
  placeholder,
  label,
  type,
  onChange,
  id, //added
  value, //added
}: LabelledInputType) => {
  return (
    <div>
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>{" "}
      <br></br>
      <input
        type={type || "text"}
        id={id}
        defaultValue={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border-black border pl-2 pt-1 pb-1 pr-2 text-gray-600 placeholder-stone-400"
      />
    </div>
  );
};

export default CreateAccount;
