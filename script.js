let currentIndex = 0;
let startX;
let isSwiping = false;
const slides = [];
const overlaySlide = document.getElementById('overlay-slide');
const overlayImage = document.getElementById('overlay-image');
const sliderContainer = document.querySelector('.slider');

// Загрузка всех слайдов из папки
function loadSlides() {
	const basePath = 'Картинки/'; // Путь к папке с изображениями
	const slideNumbers = [
		1,
		2,
		3,
		6,
		7,
		8,
		9,
		10,
		12,
		14,
		16,
		18,
		20,
		21,
		23,
		25,
		27,
		29,
		31,
		33,
		35,
		38,
		40,
		42,
		44,
		46,
		48,
		50,
		52,
		54,
		55,
		57,
		59,
		61,
		63,
		65,
		67,
		69,
		70,
		71,
		73,
		75,
		77,
		79,
		81,
		82,
		'82+1',
		83,
		84,
		85,
		86,
		87,
		88,
		90,
		91,
		92,
		93,
		94,
		97,
		98,
		99,
		100,
		101,
		104,
		105,
		106,
		107,
		108,
		110,
		'110+1',
		10,
		14,
		18,
		21,
		23,
		2,
		111,
		108,
		46,
		2,
		112,
		99,
		100,
		101,
		2,
		113,
		35,
		52,
		69,
		2,
		114,
		38,
		44,
		52,
		2
	];
	slideNumbers.forEach(num => slides.push(`${basePath}p (${num}).png`));
	updateSlider();
}

function updateSlider() {
	sliderContainer.innerHTML = slides
		.map((src, index) => {
			if (src.includes('p (6).png')) {
				return `<iframe src="Слайд 6/6.html" class="slide" frameborder="0"></iframe>`;
			} else if (src.includes('p (7).png')) {
				return `<iframe src="Слайд 7/7.html" class="slide" frameborder="0"></iframe>`;
			} else if (src.includes('p (8).png')) {
				return `<iframe src="8.html" class="slide" frameborder="0"></iframe>`;
			} else if (src.includes('p (69).png')) {
				return `<video class="slide" controls>
                        <source src="SPIRIVA.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>`;
			} else {
				return `<img src="${src}" class="slide" alt="Slide ${index + 1}">`;
			}
		})
		.join('');
	showSlide(currentIndex);
}

// Переход на первый слайд
function goToFirstSlide() {
	showSlide(0); // Переход на первый слайд (индекс 0)
}

// Переход на шестой слайд
function showSixSlide() {
	showSlide(5); // Переход на шестой слайд (индекс 5, так как индексация начинается с 0)
}

document.addEventListener('DOMContentLoaded', () => {
	// Добавляем обработчик кликов на кнопки
	document.querySelectorAll('.button').forEach(button => {
		button.addEventListener('click', () => {
			const slideNumber = parseInt(button.getAttribute('data-slide'), 10);
			showSlide(slideNumber - 1); // -1, потому что индексы в массиве начинаются с 0
		});
	});
});



// Функция для отображения слайда по индексу
function showSlide(index) {
	if (index >= slides.length) {
		currentIndex = 0;
	} else if (index < 0) {
		currentIndex = slides.length - 1;
	} else {
		currentIndex = index;
	}
	const offset = -currentIndex * 100;
	sliderContainer.style.transform = `translateX(${offset}%)`;

	// Обновление номера текущего слайда
	const slideNumberElement = document.querySelector('.slide-number');
	if (slideNumberElement) {
		slideNumberElement.textContent = `Слайд ${currentIndex + 1} из ${
			slides.length
		}`;
	}

	// Загрузка контента для текущего, предыдущего и следующего слайдов
	updateSlideContents();

	// Скрыть или показать кнопки
	const controls = document.querySelector('.navigation-bottom');
	if (
		slides[currentIndex].includes('SPIRIVA.mp4') ||
		slides[currentIndex].includes('p (69).png')
		// || currentIndex === 3
	) {
		controls.style.display = 'none';
	} else {
		controls.style.display = 'flex';
	}
}

function updateSlideContents() {
	// Загрузка текущего и ближайших слайдов
	const currentSlide = document.querySelector(
		`.slide:nth-child(${currentIndex + 1})`
	);
	const prevSlide = document.querySelector(
		`.slide:nth-child(${currentIndex === 0 ? slides.length : currentIndex})`
	);
	const nextSlide = document.querySelector(
		`.slide:nth-child(${
			currentIndex === slides.length - 1 ? 1 : currentIndex + 2
		})`
	);

	loadSlideContent(currentSlide);
	if (prevSlide) loadSlideContent(prevSlide);
	if (nextSlide) loadSlideContent(nextSlide);
}

function loadSlideContent(slide) {
	if (slide) {
		const media = slide.querySelector('img, iframe, video');
		if (media) {
			const src = media.src;
			if (src) {
				console.log(`Loading content for ${src}`);
				// Здесь можно реализовать логику загрузки контента, если требуется
			}
		}
	}
}

// Предварительная загрузка изображений и видео
function preloadImages(imageUrls) {
	imageUrls.forEach(url => {
		const img = new Image();
		img.src = url;
	});
}

function preloadVideo(url) {
	const video = document.createElement('video');
	video.preload = 'auto';
	video.src = url;
}

function getSlidesToPreload() {
	return slides; // Включает все пути слайдов
}

function getLiteratureToPreload() {
	const literatureMap = {
		1: 'p (4).png',
		2: 'p (4).png',
		3: 'p (4).png',
		4: 'p (300).png',
		5: 'p (301).png',
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

		45: 'p (110).png',
		46: 'p (110).png',
		47: 'p (110).png',
		48: 'p (110).png',
		49: 'p (110).png',
		50: 'p (110).png',
		51: 'p (110).png',
		52: 'p (110).png',

		53: 'p (89).png',
		54: 'p (89).png',
		55: 'p (89).png',
		56: 'p (89).png',
		57: 'p (89).png',
		58: 'p (95).png',
		59: 'p (95).png',
		60: 'p (95).png',
		61: 'p (95).png',
		62: 'p (95).png',
		63: 'p (102).png',
		64: 'p (102).png',
		65: 'p (102).png',
		66: 'p (102).png',
		67: 'p (102).png',
		68: 'p (109).png',
		69: 'p (109).png',
		70: 'p (109).png',
		71: 'p (109).png',
		72: 'p (109).png',
		73: 'p (109).png',
		74: 'p (109).png'
	};
	return Object.values(literatureMap).map(image => `Литература/${image}`);
}

function getVideosToPreload() {
	return ['SPIRIVA.mp4']; // Список ваших видео
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
	console.log(currentSlideIndex);

	// Маппинг между номерами слайдов и изображениями литературы
	const literatureMap = {
		1: 'p (4).png',
		2: 'p (4).png',
		3: 'p (4).png',
		4: 'p (300).png',
		5: 'p (301).png',
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

		45: 'p (110).png',
		46: 'p (110).png',
		47: 'p (110).png',
		48: 'p (110).png',
		49: 'p (110).png',
		50: 'p (110).png',
		51: 'p (110).png',
		52: 'p (110).png',

		53: 'p (89).png',
		54: 'p (89).png',
		55: 'p (89).png',
		56: 'p (89).png',
		57: 'p (89).png',
		58: 'p (95).png',
		59: 'p (95).png',
		60: 'p (95).png',
		61: 'p (95).png',
		62: 'p (95).png',
		63: 'p (102).png',
		64: 'p (102).png',
		65: 'p (102).png',
		66: 'p (102).png',
		67: 'p (102).png',
		68: 'p (109).png',
		69: 'p (109).png',
		70: 'p (109).png',
		71: 'p (109).png',
		72: 'p (109).png',
		73: 'p (109).png',
		74: 'p (109).png'
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
	'p (11).png': { top: '31%', left: '78%' },
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
	'p (89).png': { top: '23%', left: '78%' },
	'p (95).png': { top: '25%', left: '78%' },
	'p (102).png': { top: '26%', left: '78%' },
	'p (109).png': { top: '30%', left: '78%' },
	'p (110).png': { top: '36%', left: '78%' },
	'p (300).png': { top: '18%', left: '78%' },
	'p (301).png': { top: '20%', left: '78%' },
	'Посилання 21.png': { top: '10%', left: '78%' },
	'Посилання.webp': { top: '42%', left: '78%' } // Добавлена позиция для "Посилання"
};

document.addEventListener('DOMContentLoaded', () => {
	loadSlides();
	document
		.querySelector('.nav.literature')
		.addEventListener('click', handleLiteratureClick);
		document
		.querySelector('.nav.links')
		.addEventListener('click', () => {
			if (currentIndex + 1 === 21) {
				showOverlay('Posilanna/Посилання 21.png');
			} else {
				showOverlay('Posilanna/Посилання.webp');
			}
		});
	
	document
		.querySelector('.close-button')
		.addEventListener('click', hideOverlay);

	// Предварительная загрузка изображений и видео
	preloadImages(getSlidesToPreload());
	preloadImages(getLiteratureToPreload());
	getVideosToPreload().forEach(preloadVideo);

	// Обработка кликов на кнопки слайдов
	document.querySelectorAll('.button').forEach(button => {
		button.addEventListener('click', () => {
			const slideNumber = parseInt(button.getAttribute('data-slide'), 10);
			showSlide(slideNumber - 1); // -1, потому что индексы в массиве начинаются с 0
		});
	});
});

// Переключение на следующий слайд
function nextSlide() {
	currentIndex = currentIndex + 1;
	showSlide(currentIndex);
}

// Переключение на предыдущий слайд
function prevSlide() {
	currentIndex = currentIndex - 1;
	showSlide(currentIndex);
}

// Переключение на следующий слайд
function nextSlide() {
	currentIndex = currentIndex + 1;
	showSlide(currentIndex);
}

// Обработчики свайпов
function handleSwipeStart(event) {
	isSwiping = true;
	startX = event.type === 'touchstart' ? event.touches[0].clientX : event.clientX;
}

function handleSwipeMove(event) {
	if (!isSwiping) return;

	const currentX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
	const diffX = startX - currentX;

	if (diffX > 50) {
		nextSlide();
		isSwiping = false;
	} else if (diffX < -50) {
		prevSlide();
		isSwiping = false;
	}
}

function handleSwipeEnd() {
	isSwiping = false;
}

// Добавьте обработчики для мыши и сенсорных экранов
sliderContainer.addEventListener('mousedown', handleSwipeStart);
sliderContainer.addEventListener('mousemove', handleSwipeMove);
sliderContainer.addEventListener('mouseup', handleSwipeEnd);

sliderContainer.addEventListener('touchstart', handleSwipeStart);
sliderContainer.addEventListener('touchmove', handleSwipeMove);
sliderContainer.addEventListener('touchend', handleSwipeEnd);

// Обработка сообщений для переключения слайдов
window.addEventListener('message', event => {
	const { action } = event.data;
	switch (action) {
		case 'nextSlide':
			nextSlide();
			break;
		case 'prevSlide':
			prevSlide();
			break;
		case 'goToFirstSlide':
			goToFirstSlide();
			break;
		case 'showSixSlide':
			showSixSlide();
			break;
		default:
			console.warn('Unknown action:', action);
	}
});
