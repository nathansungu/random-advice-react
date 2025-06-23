import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import "./App.css";
import axios from "axios";

function App() {
  const [advice, setAdvice] = useState(null);
  const [error, setError] = useState("");
  const [loading, setDisableLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setDisableLoading(true);
      try {
        const responce = await axios.get("https://api.adviceslip.com/advice");
        const { advice } = responce.data.slip;
        setAdvice(advice);
      } catch (e) {
        setError("Oops! Something went wrong.");
      } finally {
        setDisableLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <>
      <h1 className="title">random abvice page</h1>

      <div className="body">
        

        {loading && <ClipLoader />}
        {advice && <p className="advice"> {advice}</p>}
        {error && <p className="error">{error}</p>}

        <form>
          <button disabled={loading}>
            {loading ? "please..." : "random advice"}
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
