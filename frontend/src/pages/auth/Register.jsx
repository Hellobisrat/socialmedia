import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await register(form);
      toast.success("Account created!");
      navigate("/");
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition">
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?
          <Link to="/login" className="text-primary font-medium ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
