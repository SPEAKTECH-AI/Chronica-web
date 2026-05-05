document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("waitlistForm");
  const successMessage = document.getElementById("successMessage");
  const noteText = document.getElementById("noteText");

  if (!form || !successMessage) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
  form.reset();

  // Hide form completely
  form.style.display = "none";

  // Show success message
  successMessage.hidden = false;
  successMessage.classList.add("show");

  // Replace subtext
  if (noteText) {
    noteText.innerText = "You're in. We’ll let you know when Chronica opens.";
   }
 }
      
      else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }
  });

  const featureItems = document.querySelectorAll(".feature-item");

 const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 120);
      }
    });
  },
  {
    threshold: 0.2,
  }
 );

 featureItems.forEach((item) => {
  observer.observe(item);
 });
});