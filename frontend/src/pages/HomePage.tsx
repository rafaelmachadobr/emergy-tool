import { toast } from "sonner";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page of the application.</p>
      <button onClick={() => toast("My first toast")}>Give me a toast</button>
    </div>
  );
};

export default HomePage;
