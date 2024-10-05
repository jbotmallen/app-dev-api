document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("registerButton");
  const logoutButton = document.getElementById("logoutButton");

  // Action to login
  loginButton.addEventListener("click", async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: "my-username-123",
          password: "123456789",
        }),
      });

      const data = await response.json();

      if (data.status === 200) {
        alert("Login successful");
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  });

  // Action to register
  registerButton.addEventListener("click", async () => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "example@host.com",
          username: "my-username-123",
          password: "123456789",
        }),
      });
      const data = await response.json();

      if (data.status === 201) {
        alert("Registration successful");
      } else {
        alert("Registration failed: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  });

  // Action to logout
  logoutButton.addEventListener("click", async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.status === 200) {
        alert("Logout successful");
      } else {
        alert("Logout failed: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  });
});
