import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { toast } from "sonner";

export default function Login() {
  const handleLogin = (e) => {
    e.preventDefault();
    toast.success("Logged in!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome Back</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input placeholder="Email" type="email" required />
          <Input placeholder="Password" type="password" required />
          <Button className="w-full">Login</Button>
        </form>
      </div>
    </div>
  );
}