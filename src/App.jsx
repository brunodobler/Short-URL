import { useContext } from "react";
import { UserContext } from "./context/UserProvider";
import RootRouter from "./routes/RootRouter";
import Spinner from "./components/Spinner";

const App = () => {
  const { user } = useContext(UserContext);

  if (user === false) return <Spinner />;

  return (
    <>
      <RootRouter />
    </>
  );
};

export default App;
