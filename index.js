const formElement = document.getElementById("form");

formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(formElement);
    const hexColor = formData.get('color').slice(1);

    fetch(`https://www.thecolorapi.com/scheme?hex=${hexColor}&mode=${formData.get('mode')}&count=5`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            for (let i = 0; i < data.colors.length; i++) {
                const colorValue = data.colors[i].hex.value;
                const colorElement = document.getElementById(`color-${i + 1}`);
                const textElement = document.getElementById(`color${i + 1}t`);

                // Store the function in a variable
                const copyColorValue = () => {
                    navigator.clipboard.writeText(colorValue).then(() => {
                        alert(`Copied ${colorValue} to clipboard`);
                    });
                };

                // If the elements have existing event listeners, remove them
                if (colorElement.copyListener) {
                    colorElement.removeEventListener('click', colorElement.copyListener);
                }
                if (textElement.copyListener) {
                    textElement.removeEventListener('click', textElement.copyListener);
                }

                // Add the event listeners
                colorElement.addEventListener('click', copyColorValue);
                textElement.addEventListener('click', copyColorValue);

                // Store the function reference for future removal
                colorElement.copyListener = copyColorValue;
                textElement.copyListener = copyColorValue;

                // Update the UI
                colorElement.style.backgroundColor = colorValue;
                colorElement.classList.add('pointer');
                textElement.textContent = colorValue;
                textElement.classList.add('pointer');
            }
        });
});

