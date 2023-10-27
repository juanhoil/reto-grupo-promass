import { useEffect } from "react";
import { set } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
//    navigate("/post");
    setTimeout(()=>{
      window.location.href = "/post";
    },2000)
  }, [navigate]);

  return <></>;
};
