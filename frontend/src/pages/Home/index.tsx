import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
//    navigate("/post");
    window.location.href = "/post";

  }, [navigate]);

  return <></>;
};
