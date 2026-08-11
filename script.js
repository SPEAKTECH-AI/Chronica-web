document.addEventListener("DOMContentLoaded", () => {

    const forms = document.querySelectorAll(".waitlist-form");

    forms.forEach((form) => {

        form.addEventListener("submit", async (e) => {

            e.preventDefault();

            const button = form.querySelector('button[type="submit"]');
            const input = form.querySelector('input[type="email"]');

            const originalButtonText = button.innerHTML;

            button.disabled = true;
            button.innerHTML = "Joining...";

            const formData = new FormData(form);

            try {

                const response = await fetch("/", {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded"
                    },
                    body: new URLSearchParams(formData).toString()
                });

                if (!response.ok) {
                    throw new Error("Form submission failed.");
                }

                /* Clear the email field */
                form.reset();

                /* Restore the button */
                button.disabled = false;
                button.innerHTML = originalButtonText;

                /* Remove any previous success message */
                const oldMessage =
                    form.parentNode.querySelector(".success-message");

                if (oldMessage) {
                    oldMessage.remove();
                }

                /* Create success message */
                const successMessage =
                    document.createElement("p");

                successMessage.className =
                    "success-message";

                successMessage.textContent =
                    "You're in. We'll let you know when Chronica opens.";

                form.parentNode.insertBefore(
                    successMessage,
                    form.nextSibling
                );

                /* Put the cursor back in the email field */
                if (input) {
                    input.focus();
                }

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