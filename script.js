document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll(".waitlist-form");

    forms.forEach((form) => {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const button = form.querySelector('button[type="submit"]');
            const originalButtonText = button ? button.innerHTML : "";

            if (button) {
                button.disabled = true;
                button.innerHTML = "Joining...";
            }

            const data = new URLSearchParams(new FormData(form));

            try {
                const response = await fetch("/", {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded",
                    },
                    body: data.toString(),
                });

                if (response.ok) {
                    form.reset();
                    form.style.display = "none";

                    const successMessage =
                        document.createElement("p");

                    successMessage.className = "success-message";
                    successMessage.textContent =
                        "You're in. We'll let you know when Chronica opens.";

                    form.parentNode.insertBefore(
                        successMessage,
                        form.nextSibling
                    );
                } else {
                    throw new Error("Form submission failed");
                }
            } catch (error) {
                console.error("Waitlist submission error:", error);

                alert(
                    "Something went wrong. Please try again."
                );

                if (button) {
                    button.disabled = false;
                    button.innerHTML = originalButtonText;
                }
            }
        });
    });


    /* =====================================================
       FEATURE REVEAL
    ===================================================== */

    const featureItems =
        document.querySelectorAll(".feature-item");

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




