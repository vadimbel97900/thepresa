document.addEventListener('DOMContentLoaded', () => {
    const sliders = [
        { id: 'slider1', cursor: 'cursor1', highlight: 'highlight1', start: 8 },
        { id: 'slider2', cursor: 'cursor2', highlight: 'highlight2', start: 22 }
    ];

    sliders.forEach(slider => {
        const sliderElement = document.getElementById(slider.id);
        const cursorElement = document.getElementById(slider.cursor);
        const highlightElement = document.getElementById(slider.highlight);
        const trackElement = sliderElement.querySelector('.track');
        const trackRect = trackElement.getBoundingClientRect();

        let isDragging = false;

        function updateSliderPosition(x) {
            let left = x - trackRect.left;
            if (left < 0) left = 0;
            if (left > trackRect.width) left = trackRect.width;

            const percentage = left / trackRect.width;
            const value = Math.round(percentage * 24) + 1;

            cursorElement.style.left = `${left - cursorElement.offsetWidth / 2}px`;
            highlightElement.style.width = `${left}px`;

            // Обновить цвет фона за номером
            const numbers = sliderElement.querySelectorAll('.number');
            numbers.forEach((number, index) => {
                number.style.backgroundColor = index + 1 === value ? 'red' : 'transparent';
            });
        }

        function onMouseMove(event) {
            if (!isDragging) return;

            updateSliderPosition(event.clientX);
        }

        function onMouseDown(event) {
            event.preventDefault(); // предотвращаем выделение текста и другие нежелательные действия
            isDragging = true;
            updateSliderPosition(event.clientX);
        }

        function onMouseUp() {
            isDragging = false;
        }

        cursorElement.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        // Поддержка для мобильных устройств
        cursorElement.addEventListener('touchstart', (event) => {
            event.preventDefault(); // предотвращаем прокрутку страницы
            isDragging = true;
            updateSliderPosition(event.touches[0].clientX);
        });

        document.addEventListener('touchmove', (event) => {
            if (!isDragging) return;

            updateSliderPosition(event.touches[0].clientX);
        });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });
    });

    function setPercentages(percent1, percent2) {
        const sliders = [
            { id: 'slider1', cursor: 'cursor1', highlight: 'highlight1' },
            { id: 'slider2', cursor: 'cursor2', highlight: 'highlight2' }
        ];

        sliders.forEach((slider, index) => {
            const sliderElement = document.getElementById(slider.id);
            const cursorElement = document.getElementById(slider.cursor);
            const highlightElement = document.getElementById(slider.highlight);
            const trackElement = sliderElement.querySelector('.track');
            const trackRect = trackElement.getBoundingClientRect();

            let percentage = index === 0 ? percent1 : percent2;
            let left = (percentage / 100) * trackRect.width;
            let value = Math.round((left / trackRect.width) * 24) + 1;

            cursorElement.style.left = `${left - cursorElement.offsetWidth / 2}px`;
            highlightElement.style.width = `${left}px`;

            // Обновить цвет фона за номером
            const numbers = sliderElement.querySelectorAll('.number');
            numbers.forEach((number, index) => {
                number.style.backgroundColor = index + 1 === value ? 'red' : 'transparent';
            });
        });
    }

    function setDefaultValues() {
        // Рассчитать процентное значение для каждого слайдера
        const percent1 = ((8 - 1) / 24) * 100; // Учитываем 24 цифры
        const percent2 = ((22 - 1) / 24) * 100;

        // Установить значения на слайдерах
        setPercentages(percent1, percent2);
    }

    // Вызов функции после загрузки страницы
    setDefaultValues();

    // Обработчик события для кнопки
    document.querySelector('.button').addEventListener('click', () => {
        // Рассчитать процентное значение для 3 и 24
        const percent1 = ((3 - 1) / 24) * 100;
        const percent2 = ((24 - 1) / 24) * 100;

        // Установить значения на слайдерах
        setPercentages(percent1, percent2);
    });
});
