// src/components/Card.js
export const Card = ({ children }) => (
  <div className="border rounded-xl shadow p-4 bg-white mb-6">{children}</div>
);

export const CardHeader = ({ children }) => (
  <div className="mb-2">{children}</div>
);

export const CardTitle = ({ children }) => (
  <h3 className="text-xl font-bold">{children}</h3>
);

export const CardContent = ({ children }) => (
  <div className="mt-2">{children}</div>
);
