let currentIndex = 0;
const slides = [];
const overlaySlide = document.getElementById('overlay-slide');
const overlayImage = document.getElementById('overlay-image');
const sliderContainer = document.querySelector('.slider');
const loadingOverlay = document.getElementById('loading-overlay');

// Загрузка всех слайдов из папки
function loadSlides() {
    const basePath = 'Картинки/';
    const slideNumbers = [
        1, 2, 3, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 21, 23, 25, 27, 29,
        31, 33, 35, 38, 40, 42, 44, 46, 48, 50, 52, 54, 55, 57, 59, 61, 63,
        65, 67, 69, 70, 71, 73, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88,
        90, 91, 92, 93, 94, 97, 98, 99, 100, 101, 104, 105, 106, 107, 108,
        110, 111, 112, 113, 114
    ];
    
    const imagesToLoad = [];
    slideNumbers.forEach(num => imagesToLoad.push(`${basePath}p (${num}).png`));
    
    let loadedCount = 0;

    function checkAllLoaded() {
        if (loadedCount >= imagesToLoad.length) {
            updateSlider();
            loadingOverlay.style.display = 'none'; // Скрываем индикатор загрузки
        }
    }

    imagesToLoad.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            loadedCount++;
            checkAllLoaded();
        };
        img.onerror = () => {
            loadedCount++;
            checkAllLoaded();
        };
        slides.push(src); // Добавляем изображение в массив
    });
}

function updateSlider() {
    sliderContainer.innerHTML = slides.map((src, index) => {
        if (src.includes('p (6).png')) {
            return `<iframe src="Слайд 6/6.html" class="slide" frameborder="0"></iframe>`;
        } else if (src.includes('p (7).png')) {
            return `<iframe src="Слайд 7/7.html" class="slide" frameborder="0"></iframe>`;
        } else if (src.includes('p (69).png')) {
            return `<video class="slide" controls>
                        <source src="SPIRIVA.mp4" type="video/mp4">
                        Ваш браузер не поддерживает тег video.
                    </video>`;
        } else {
            return `<img src="${src}" class="slide" alt="Slide ${index + 1}">`;
        }
    }).join('');
    showSlide(currentIndex);
}

function showSlide(index) {
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }
    const offset = -currentIndex * 100;
    document.querySelector('.slider').style.transform = `translateX(${offset}%)`;

    // Скрыть или показать кнопки
    const controls = document.querySelector('.navigation-bottom');
    if (slides[currentIndex].includes('6.html') || slides[currentIndex].includes('p (6).png') ||
        slides[currentIndex].includes('7.html') || slides[currentIndex].includes('p (7).png') ||
        slides[currentIndex].includes('SPIRIVA.mp4') || slides[currentIndex].includes('p (69).png')) {
        controls.style.display = 'none';
    } else {
        controls.style.display = 'flex';
    }
}

// Переключение на следующий слайд
function nextSlide() {
    showSlide(currentIndex + 1);
}

// Переключение на предыдущий слайд
function prevSlide() {
    showSlide(currentIndex - 1);
}

// Открытие оверлея
function showOverlay(imageSrc) {
    document.body.style.overflow = 'hidden'; // Отключение прокрутки
    overlayImage.src = imageSrc;
    overlaySlide.style.display = 'flex'; // Показываем оверлей

    // Обновление позиции крестика
    updateCloseButtonPosition(imageSrc);
}

// Закрытие оверлея
function hideOverlay() {
    document.body.style.overflow = ''; // Включение прокрутки
    overlaySlide.style.display = 'none'; // Скрываем оверлей
}

// Обработка клика по кнопке литературы
function handleLiteratureClick() {
    // Получаем номер текущего слайда
    const currentSlideNumber = currentIndex + 1;
    
    // Маппинг между номерами слайдов и изображениями литературы
    const literatureMap = {
        1: 'p (4).png',
        2: 'p (4).png',
        3: 'p (4).png',
        4: 'p (11).png',
        5: 'p (11).png',
        6: 'p (11).png',
        7: 'p (11).png',
        8: 'p (11).png',
        9: 'p (13).png',
        10: 'p (15).png',
        11: 'p (17).png',
        12: 'p (19).png',
        13: 'p (22).png',
        14: 'p (22).png',
        15: 'p (24).png',
        16: 'p (26).png',
        17: 'p (28).png',
        18: 'p (30).png',
        19: 'p (32).png',
        20: 'p (34).png',
        21: 'p (36).png',
        22: 'p (39).png',
        23: 'p (41).png',
        24: 'p (43).png',
        25: 'p (45).png',
        26: 'p (47).png',
        27: 'p (49).png',
        28: 'p (51).png',
        29: 'p (53).png',
        30: 'p (56).png',
        31: 'p (56).png',
        32: 'p (58).png',
        33: 'p (60).png',
        34: 'p (62).png',
        35: 'p (64).png',
        36: 'p (66).png',
        37: 'p (68).png',
        38: 'p (68).png',
        39: 'p (68).png',
        40: 'p (72).png',
        41: 'p (74).png',
        42: 'p (76).png',
        43: 'p (78).png',
        44: 'p (80).png',
        45: 'p (80).png',
        46: 'p (80).png',
        47: 'p (80).png',
        48: 'p (80).png',
        49: 'p (80).png',
        50: 'p (80).png',
        51: 'p (80).png',
        52: 'p (89).png',
        53: 'p (89).png',
        54: 'p (89).png',
        55: 'p (89).png',
        56: 'p (89).png',
        57: 'p (95).png',
        58: 'p (95).png',
        59: 'p (95).png',
        60: 'p (95).png',
        61: 'p (95).png',
        62: 'p (102).png',
        63: 'p (102).png',
        64: 'p (102).png',
        65: 'p (102).png',
        66: 'p (102).png',
        67: 'p (109).png',
        68: 'p (109).png',
        69: 'p (109).png',
        70: 'p (109).png',
        71: 'p (109).png',
        72: 'p (109).png'
    };

    // Получаем название изображения литературы для текущего слайда
    const literatureImage = literatureMap[currentSlideNumber];
    
    if (literatureImage) {
        showOverlay(`Литература/${literatureImage}`);
    }
}

// Обновление позиции крестика для каждого изображения литературы
function updateCloseButtonPosition(imageSrc) {
    const closeButton = document.querySelector('.close-button');
    
    // Извлечь имя файла из пути
    const imageName = imageSrc.split('/').pop();
    
    // Получить позицию для текущего изображения
    const position = closeButtonPositions[imageName];
    
    if (position) {
        closeButton.style.top = position.top;
        closeButton.style.left = position.left;
    } else {
        // Установить дефолтные значения, если для изображения нет данных
        closeButton.style.top = '42%';
        closeButton.style.left = '78%';
    }
}

// Маппинг позиций крестика для каждого слайда литературы
const closeButtonPositions = {
    'p (4).png': { top: '18%', left: '78%' },
    'p (11).png': { top: '24%', left: '78%' },
    'p (13).png': { top: '30%', left: '78%' },
    'p (15).png': { top: '27%', left: '78%' },
    'p (17).png': { top: '32%', left: '78%' },
    'p (19).png': { top: '28.3%', left: '78%' },
    'p (22).png': { top: '39%', left: '78%' },
    'p (24).png': { top: '38%', left: '78%' },
    'p (26).png': { top: '38%', left: '78%' },
    'p (28).png': { top: '38%', left: '78%' },
    'p (30).png': { top: '38%', left: '78%' },
    'p (32).png': { top: '38%', left: '78%' },
    'p (34).png': { top: '38%', left: '78%' },
    'p (36).png': { top: '18%', left: '78%' },
    'p (39).png': { top: '32%', left: '78%' },
    'p (41).png': { top: '40%', left: '78%' },
    'p (43).png': { top: '40%', left: '78%' },
    'p (45).png': { top: '40%', left: '78%' },
    'p (47).png': { top: '40%', left: '78%' },
    'p (49).png': { top: '40%', left: '78%' },
    'p (51).png': { top: '10%', left: '78%' },
    'p (53).png': { top: '10%', left: '78%' },
    'p (56).png': { top: '41%', left: '78%' },
    'p (58).png': { top: '34%', left: '78%' },
    'p (60).png': { top: '30%', left: '78%' },
    'p (62).png': { top: '33%', left: '78%' },
    'p (64).png': { top: '31%', left: '78%' },
    'p (66).png': { top: '38%', left: '78%' },
    'p (68).png': { top: '38%', left: '78%' },
    'p (72).png': { top: '39%', left: '78%' },
    'p (74).png': { top: '39%', left: '78%' },
    'p (76).png': { top: '39%', left: '78%' },
    'p (78).png': { top: '42%', left: '78%' },
    'p (80).png': { top: '40%', left: '78%' },
    'p (89).png': { top: '14%', left: '78%' },
    'p (95).png': { top: '25%', left: '78%' },
    'p (102).png': { top: '17%', left: '78%' },
    'p (109).png': { top: '30%', left: '78%' },
    'Посилання.png': { top: '42%', left: '78%' } // Добавлена позиция для "Посилання"
};

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    loadSlides();
    document.querySelector('.links').addEventListener('click', () => showOverlay('Posilanna/Посилання.png'));
    document.querySelector('.literature').addEventListener('click', handleLiteratureClick);
});
