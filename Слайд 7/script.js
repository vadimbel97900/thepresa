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

        const value = Math.round((left / trackRect.width) * 25); // Значение ползунка на шкале от 0 до 25

        cursorElement.style.left = `${left - cursorElement.offsetWidth / 2}px`;
        highlightElement.style.width = `${left}px`;

        const numbers = sliderElement.querySelectorAll('.number');
        numbers.forEach((number, index) => {
            number.style.backgroundColor = index + 1 === value ? 'red' : 'transparent';
        });
        
        // Сохранение текущего значения
        slider.currentValue = value;
    }

    function initializeSliders() {
        sliders.forEach(slider => {
            const sliderElement = document.getElementById(slider.id);
            const cursorElement = document.getElementById(slider.cursor);
            const highlightElement = document.getElementById(slider.highlight);
            const trackElement = sliderElement.querySelector('.track');
            const trackRect = trackElement.getBoundingClientRect();

            // Установка начальной позиции
            const initialLeft = (slider.start / 25) * trackRect.width;
            cursorElement.style.left = `${initialLeft - cursorElement.offsetWidth / 2}px`;
            highlightElement.style.width = `${initialLeft}px`;

            slider.currentValue = slider.start; // Сохраняем начальное значение
        });
    }

    function updateOnResize() {
        sliders.forEach(slider => {
            const sliderElement = document.getElementById(slider.id);
            const cursorElement = document.getElementById(slider.cursor);
            const highlightElement = document.getElementById(slider.highlight);
            const trackElement = sliderElement.querySelector('.track');
            const trackRect = trackElement.getBoundingClientRect();

            // Пересчет позиции курсора по сохраненному значению
            const percentage = (slider.currentValue / 25);
            const newLeft = percentage * trackRect.width;
            cursorElement.style.left = `${Math.max(0, Math.min(newLeft, trackRect.width)) - cursorElement.offsetWidth / 2}px`;
            highlightElement.style.width = `${Math.max(0, Math.min(newLeft, trackRect.width))}px`;

            // Обновление цвета фона за номером
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

            // Определение значения на основе индекса ползунка
            let value = index === 0 ? value1 : value2;
            let left = (value / 25) * trackRect.width; // Позиция курсора в пикселях
            let displayValue = value; // Значение для отображения

            cursorElement.style.left = `${left - cursorElement.offsetWidth / 2}px`;
            highlightElement.style.width = `${left}px`;

            const numbers = sliderElement.querySelectorAll('.number');
            numbers.forEach((number, index) => {
                number.style.backgroundColor = index + 1 === displayValue ? 'red' : 'transparent';
            });

            slider.currentValue = displayValue; // Сохраняем значение
        });
    }

    function setDefaultValues() {
        const value1 = 8; // Начальное значение для первого ползунка
        const value2 = 22; // Начальное значение для второго ползунка

        setValues(value1, value2);
    }

    // Инициализация ползунков
    initializeSliders();

    // Установка начальных значений после загрузки страницы
    setDefaultValues();

    // Обработчик события для кнопки
    document.querySelector('.button').addEventListener('click', () => {
        const value1 = 3; // Значение для первого ползунка
        const value2 = 24; // Значение для второго ползунка

        setValues(value1, value2);
    });

    // Обработчики событий для ползунков
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

    // Обработчик изменения размера окна
    window.addEventListener('resize', updateOnResize);
});
