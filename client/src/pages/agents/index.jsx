import React, { useState } from "react";

// Sample agent data
const agents = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Senior Agent",
    email: "alice.johnson@example.com",
    phone: "+49 123 456 789",
    image:
      "https://images.aiscribbles.com/c791ec4f2fb542efab385f3808f92d38.png?v=72f1fb",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Junior Agent",
    email: "bob.smith@example.com",
    phone: "+49 987 654 321",
    image:
      "https://images.aiscribbles.com/cbc64717ac274ecaa4bb2f9d8a49e359.png?v=9a6b13",
  },
  // Add more agents as needed
];

const Agents = () => {
  const [search, setSearch] = useState("");

  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section
      id="agents"
      className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-20 py-10 md:py-20 text-center"
    >
      {" "}
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
        Our Agents
      </h1>
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search agents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Agent List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAgents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
          >
            <img
              src={agent.image}
              alt={agent.name}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {agent.name}
            </h2>
            <p className="text-gray-600 mb-2">{agent.role}</p>
            <p className="text-gray-600 mb-2">
              <strong>Email:</strong> {agent.email}
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> {agent.phone}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Agents;
