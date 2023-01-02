import { Link } from "react-router-dom";
import AnimatedIcon from "./AnimatedIcon";

const Page404 = () => {
  return (
    <div className="page404">
      <AnimatedIcon />
      <div>
        <h1>
          Oops<span>!</span>
        </h1>
        <h2>Looks like the page you're trying to access doesn't exist</h2>
        <Link to="/">Return to Homepage</Link>
      </div>
    </div>
  );
};

export default Page404;
