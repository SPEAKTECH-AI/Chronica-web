document.addEventListener("DOMContentLoaded", () => {

    const forms = document.querySelectorAll(".waitlist-form");

    forms.forEach((form) => {

        form.addEventListener("submit", async (e) => {

            e.preventDefault();

            const button = form.querySelector('button[type="submit"]');

            const originalButtonText = button.innerHTML;

            button.disabled = true;
            button.innerHTML = "Joining...";

            const formData = new FormData(form);

            try {

                const response = await fetch("/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: new URLSearchParams(formData).toString()
                });

                if (!response.ok) {
                    throw new Error("Form submission failed.");
                }

                form.reset();

                form.style.display = "none";

                const successMessage = document.createElement("p");

                successMessage.className = "success-message";

                successMessage.textContent =
                    "You're in. We'll let you know when Chronica opens.";

                form.parentNode.insertBefore(
                    successMessage,
                    form.nextSibling
                );

            } catch (error) {

                console.error(
                    "Chronica waitlist error:",
                    error
                );

                button.disabled = false;

                button.innerHTML = originalButtonText;

                alert(
                    "Something went wrong. Please try again."
                );
            }

        });

    });

});