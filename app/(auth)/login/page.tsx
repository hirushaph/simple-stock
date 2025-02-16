import auth from "@/auth";
import { redirect } from "next/navigation";

async function page() {
  const user = await auth.getUser();
  if (user) {
    return redirect("/");
  }

  return (
    <div className="bg-white w-[400px] p-6 shadow-md rounded-md">
      <h1 className="text-xl uppercase font-semibold text-center">Login</h1>
      <p className="text-sm text-gray-500 text-center mt-1">
        Login to your account
      </p>
      <form className="mt-4" action={auth.createSession}>
        <div>
          <label className="text-sm font-normal text-gray-500" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Username"
            defaultValue="shadow@test.com"
            className="w-full border border-gray-300 rounded-md px-2 py-[6px] text-sm font-normal outline-none focus:border-blue-400 focus:shadow-md"
          />
        </div>
        <div className="mt-4 mb-4">
          <label className="text-sm font-normal text-gray-500" htmlFor="email">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            defaultValue="pass1234"
            className="w-full border border-gray-300 rounded-md px-2 py-[6px] text-sm font-normal outline-none focus:border-blue-400 focus:shadow-md"
          />
        </div>
        <div className="error bg-red-100 text-red-600 px-4 py-1 rounded mt-4 mb-2">
          <p className="text-sm text-red-600">email or password incorrect</p>
        </div>
        <div>
          <button
            className="btn w-full py-[6px] rounded-md bg-blue-200 text-blue-700 hover:bg-blue-300 hover:text-blue-800 transition"
            type="submit"
          >
            Login
          </button>
        </div>
        <div>
          <p className="text-center text-sm text-gray-800 mt-4">
            Don&apos;t have an account?
            <a href="/register" className="text-blue-500">
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default page;
