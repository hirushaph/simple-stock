function page() {
  return (
    <div className="bg-white w-[400px] p-6 shadow-md rounded-md">
      <h1 className="text-xl uppercase font-semibold text-center">Register</h1>
      <p className="text-sm text-gray-500 text-center mt-1">
        Regitser new account
      </p>

      <div className=" bg-red-100 border border-red-200 p-3 mt-4 text-sm">
        Please contact system administartor to create an account
      </div>

      <div>
        <p className="text-center text-sm text-gray-800 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default page;
