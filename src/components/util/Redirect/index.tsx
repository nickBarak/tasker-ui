import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../resources";

const Redirect = ({ to = routes.HOME }: { to: string }) => {
  const navigate = useNavigate();
  useEffect(() => navigate(to), []);

  return <></>;
};

export default Redirect;
