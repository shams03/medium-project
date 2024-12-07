import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export const useBlog = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const response = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          signal: controller.signal,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setBlogs(res.data);
        setLoading(false);
      } catch(e) {
        console.log("Error while getting blogs from the hook",e);
      }
    };
    response();
    return ()=> controller.abort();
  }, []);
  return [loading, blogs];
};
