html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('пусто.png') no-repeat center center;
    background-size: cover;
}

.container {
    position: absolute;
    width: 40vw; /* Пропорциональный размер относительно ширины окна */
    height: 40vw; /* Пропорциональный размер относительно ширины окна */
    display: flex;
    justify-content: center;
    align-items: center;
    top: 40%; /* Центрирование по вертикали с поправкой */
    left: 40%; /* Центрирование по горизонтали с поправкой */
    transform: translate(-50%, -50%);
}

.circle {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: url('круг.png') no-repeat center center;
    background-size: cover;
}

.wave {
    position: absolute;
    border-radius: 50%;
    background: rgba(94, 196, 182, 0.1);
    width: 100%;
    height: 100%;
    z-index: 1;
    transform-origin: center;
    transition: opacity 0.3s ease;
    /* Добавляем класс animated, чтобы активировать анимацию */
}

.animated {
    animation: breathe 4s ease-in-out infinite;
}

.hidden {
    opacity: 0; /* Полностью прозрачный */
}

@keyframes breathe {
    0%, 100% {
        transform: scale(0.5);
        opacity: 0.1;
    }
    50% {
        transform: scale(1);
        opacity: 0.6;
    }
}

.buttons {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap; /* Позволяет кнопкам располагаться в нескольких строках, если это необходимо */
    justify-content: center;
    align-items: center;
    pointer-events: auto;
    z-index: 3; /* Находятся выше круга и волн */
}

.button {
    position: absolute;
    width: auto;
    height: auto;
    max-width: 50%; /* Пропорциональный размер кнопок относительно контейнера */
    max-height: 50%; /* Пропорциональный размер кнопок относительно контейнера */
    cursor: pointer;
    z-index: 4;
}

/* Эффект увеличения при наведении */
.button:hover {
    transform: scale(1.1); /* Увеличение кнопки на 10% */
}

/* Расставляем кнопки по вашему дизайну, используя проценты */
.button:nth-child(1) { top: 50%; left: -30%; }
.button:nth-child(2) { top: 5%; left: -22%; }
.button:nth-child(3) { top: 95.4%; left: 90%; }
.button:nth-child(4) { top: 10%; left: 75%; }
.button:nth-child(5) { top: 78%; left: 27%; }
.button:nth-child(6) { top: 97%; left: 27%; }
.button:nth-child(7) { top: 50%; left: 90%; }
.button:nth-child(8) { top: 29%; left: 90%; }
.button:nth-child(9) { top: 73%; left: 90%; }
.button:nth-child(10) { top: 97%; left: -30%; }
.button:nth-child(11) { top: 32%; left: -30%; }
.button:nth-child(12) { top: 78%; left: -30%; }
.button:nth-child(13) { top: -4%; left: 27%; }

/* Стили для переключателя */
.switch {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    align-items: center;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    width: 34px;
    height: 20px;
    background-color: #ccc;
    border-radius: 34px;
    position: relative;
    cursor: pointer;
    transition: .4s;
}

.slider:before {
    content: "";
    position: absolute;
    height: 12px;
    width: 12px;
    border-radius: 50%;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
}

input:checked + .slider {
    background-color: #2196F3;
}

input:checked + .slider:before {
    transform: translateX(14px);
}
