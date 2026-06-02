export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />

          <button className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition">
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?
          <a href="/login" className="text-primary font-medium ml-1">Login</a>
        </p>
      </div>
    </div>
  );
}
