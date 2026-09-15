const API_URL = `${import.meta.env.VITE_API_URL}/api`;

// Log once on load so you can confirm the right backend is being hit
console.log("API base URL:", API_URL);

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  let response;
  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });
  } catch (networkErr) {
    // Backend unreachable, CORS block, no internet, etc.
    throw new Error("Could not reach the server. Please check your connection and try again.");
  }

  // Safely read the body — works whether it's JSON, empty, or plain text
  const text = await response.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!response.ok) {
    throw new Error(data?.message || `Request failed with status ${response.status}`);
  }

  return data;
};