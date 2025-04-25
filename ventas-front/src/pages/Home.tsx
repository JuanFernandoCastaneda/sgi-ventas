import React from "react";
import { useNavigate } from "react-router";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main>
      <button onClick={() => navigate("/ordenes")}>Ordenes</button>
    </main>
  );
};
