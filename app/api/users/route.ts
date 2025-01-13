// app/api/users/route.js
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";

  // Simulating a user database
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
    { id: 4, name: "Bob Brown" },
  ];

  // // Artificial delay function
  // const delay = (ms: number) =>
  //   new Promise((resolve) => setTimeout(resolve, ms));

  // // Adding a 2-second delay
  // await delay(2000);

  if (query) {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
    return new Response(JSON.stringify(filteredUsers), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify([]), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
