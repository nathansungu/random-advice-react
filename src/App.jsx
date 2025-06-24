import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import "./App.css";
import axios from "axios";

function App() {
  const [advice, setAdvice] = useState(null);
  const [error, setError] = useState("");
  const [loading, setDisableLoading] = useState(false);

  const fetchAdvice = async () => {
    try {
      setDisableLoading(true);
      setAdvice(null);
      const responce = await axios.get("https://api.adviceslip.com/advice");
      const { advice } = responce.data.slip;
      setAdvice(advice);
      return;
    } catch (e) {
      setError("Oops! Something went wrong.");
    } finally {
      setDisableLoading(false);
    }
  };

  useEffect(() => {
    async function getData() {
      setDisableLoading(true);

      try {
        fetchAdvice();
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

        <div className="form">
          <button
            disabled={loading}
            onClick={(e) => {
              fetchAdvice();
            }}
          >
            {loading ? "please wait..." : "random advice"}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
