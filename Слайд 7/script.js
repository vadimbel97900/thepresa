document.addEventListener('DOMContentLoaded', () => {
    const sliders = [
        { id: 'slider1', cursor: 'cursor1', highlight: 'highlight1', start: 8 },
        { id: 'slider2', cursor: 'cursor2', highlight: 'highlight2', start: 22 }
    ];

    function updateSliderPosition(slider, x) {
        const sliderElement = document.getElementById(slider.id);
        const cursorElement = document.getElementById(slider.cursor);
        const highlightElement = document.getElementById(slider.highlight);
        const trackElement = sliderElement.querySelector('.track');
        const trackRect = trackElement.getBoundingClientRect();

        let left = x - trackRect.left;
        left = Math.max(0, Math.min(left, trackRect.width)); // Ограничение в пределах трека

        cursorElement.style.left = `${left - cursorElement.offsetWidth / 2}px`;
        highlightElement.style.width = `${left}px`;

        const numbers = sliderElement.querySelectorAll('.number');
        numbers.forEach((number, index) => {
            const numberRect = number.getBoundingClientRect();
            const numberCenter = numberRect.left + numberRect.width / 2;

            const isCenterAligned = Math.abs(numberCenter - x) <= trackRect.width / 24 / 2;
            number.style.backgroundColor = isCenterAligned ? 'red' : 'transparent';
        });

        const partWidth = trackRect.width / 24; // Ширина одной части
        const value = Math.round(left / partWidth) + 1; // Значение ползунка на шкале от 1 до 25

        slider.currentValue = value;
    }

    function initializeSliders() {
        sliders.forEach(slider => {
            const sliderElement = document.getElementById(slider.id);
            const cursorElement = document.getElementById(slider.cursor);
            const highlightElement = document.getElementById(slider.highlight);
            const trackElement = sliderElement.querySelector('.track');
            const trackRect = trackElement.getBoundingClientRect();

            const numberElements = sliderElement.querySelectorAll('.number');
            const targetNumberElement = Array.from(numberElements).find(number => number.textContent == slider.start);

            if (targetNumberElement) {
                const numberRect = targetNumberElement.getBoundingClientRect();
                const numberCenter = numberRect.left + numberRect.width / 2;
                const initialLeft = numberCenter - trackRect.left;

                cursorElement.style.left = `${initialLeft - cursorElement.offsetWidth / 2}px`;
                highlightElement.style.width = `${initialLeft}px`;

                slider.currentValue = slider.start;
                numberElements.forEach((number, index) => {
                    number.style.backgroundColor = index + 1 === slider.currentValue ? 'red' : 'transparent';
                });
            }
        });
    }

    function updateOnResize() {
        sliders.forEach(slider => {
            const sliderElement = document.getElementById(slider.id);
            const cursorElement = document.getElementById(slider.cursor);
            const highlightElement = document.getElementById(slider.highlight);
            const trackElement = sliderElement.querySelector('.track');
            const trackRect = trackElement.getBoundingClientRect();

            const percentage = (slider.currentValue / 25);
            const newLeft = percentage * trackRect.width;
            cursorElement.style.left = `${Math.max(0, Math.min(newLeft, trackRect.width)) - cursorElement.offsetWidth / 2}px`;
            highlightElement.style.width = `${Math.max(0, Math.min(newLeft, trackRect.width))}px`;

            const numbers = sliderElement.querySelectorAll('.number');
            numbers.forEach((number, index) => {
                number.style.backgroundColor = index + 1 === slider.currentValue ? 'red' : 'transparent';
            });
        });
    }

    function setValues(value1, value2) {
        sliders.forEach((slider, index) => {
            const sliderElement = document.getElementById(slider.id);
            const cursorElement = document.getElementById(slider.cursor);
            const highlightElement = document.getElementById(slider.highlight);
            const trackElement = sliderElement.querySelector('.track');
            const trackRect = trackElement.getBoundingClientRect();

            let value = index === 0 ? value1 : value2;
            let targetNumberElement = Array.from(sliderElement.querySelectorAll('.number')).find(number => number.textContent == value);

            if (targetNumberElement) {
                const numberRect = targetNumberElement.getBoundingClientRect();
                const numberCenter = numberRect.left + numberRect.width / 2;
                const left = numberCenter - trackRect.left;

                cursorElement.style.left = `${left - cursorElement.offsetWidth / 2}px`;
                highlightElement.style.width = `${left}px`;

                slider.currentValue = value;
                sliderElement.querySelectorAll('.number').forEach((number, index) => {
                    number.style.backgroundColor = index + 1 === value ? 'red' : 'transparent';
                });
            }
        });
    }

    function setDefaultValues() {
        const value1 = 25;
        const value2 = 25;

        setValues(value1, value2);
    }

    initializeSliders();
    setDefaultValues();

    document.querySelector('.button').addEventListener('click', () => {
        const value1 = 3;
        const value2 = 24;

        setValues(value1, value2);
    });

    sliders.forEach(slider => {
        const sliderElement = document.getElementById(slider.id);
        const cursorElement = document.getElementById(slider.cursor);
        const trackElement = sliderElement.querySelector('.track');
        const trackRect = trackElement.getBoundingClientRect();

        let isDragging = false;

        function onMouseMove(event) {
            if (!isDragging) return;

            updateSliderPosition(slider, event.clientX);
        }

        function onMouseDown(event) {
            event.preventDefault();
            isDragging = true;
            updateSliderPosition(slider, event.clientX);
        }

        function onMouseUp() {
            isDragging = false;
        }

        cursorElement.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        cursorElement.addEventListener('touchstart', (event) => {
            event.preventDefault();
            isDragging = true;
            updateSliderPosition(slider, event.touches[0].clientX);
        });

        document.addEventListener('touchmove', (event) => {
            if (!isDragging) return;

            updateSliderPosition(slider, event.touches[0].clientX);
        });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });
    });

    window.addEventListener('resize', updateOnResize);
});
