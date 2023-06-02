export default function RegisterForm() {
  return (
    <form>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            type="email"
            className="form-input w-full text-gray-800 outline-none"
            placeholder="Enter your email address"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password1">
            Password <span className="text-red-600">*</span>
          </label>
          <input
            id="password1"
            type="password"
            className="form-input w-full text-gray-800 outline-none"
            placeholder="Enter your password"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password2">
            Repeat password <span className="text-red-600">*</span>
          </label>
          <input
            id="password2"
            type="password"
            className="form-input w-full text-gray-800 outline-none"
            placeholder="Enter your password"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mt-6">
        <div className="w-full px-3">
          <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Register</button>
        </div>
      </div>
      <div className="text-sm text-gray-500 text-center mt-3">
        By creating an account, you agree to the{" "}
        <a className="underline" href="#0">
          terms & conditions
        </a>
        , and our{" "}
        <a className="underline" href="#0">
          privacy policy
        </a>
        .
      </div>
    </form>
  );
}
