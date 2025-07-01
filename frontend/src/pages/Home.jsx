import courseImage from "../assets/online_course.jpg";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Online Course Platform</h1>
      <img
        src={courseImage}
        alt="Online Course Illustration"
        className="home-image"
      />
    </div>
  );
}
