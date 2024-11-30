document.addEventListener('DOMContentLoaded', function() {
    // Получаем элемент header
    const header = document.querySelector('header');

    // Мобильное меню
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let menuOpen = false;

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        menuOpen = !menuOpen;
        
        // Блокируем скролл при открытом меню
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Закрытие меню при клике на ссылку
    const navLinksArray = document.querySelectorAll('.nav-links a');
    navLinksArray.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
            menuOpen = false;
        });
    });

    // Закрытие меню при ресайзе окна
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && menuOpen) {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
            menuOpen = false;
        }
    });

    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Обработка формы бронирования
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        // Добавляем валидацию телефона
        const phoneInput = bookingForm.querySelector('input[type="tel"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 0) {
                    value = '+7' + value.substring(value.length - 10);
                }
                e.target.value = value;
            });
        }

        // Ограничиваем выбор даты
        const dateInput = bookingForm.querySelector('input[type="date"]');
        if (dateInput) {
            const today = new Date();
            const maxDate = new Date();
            maxDate.setMonth(maxDate.getMonth() + 2);
            
            dateInput.min = today.toISOString().split('T')[0];
            dateInput.max = maxDate.toISOString().split('T')[0];
        }

        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Валидация формы
            const name = this.querySelector('input[type="text"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const service = this.querySelector('select').value;
            const date = this.querySelector('input[type="date"]').value;
            const time = this.querySelector('input[type="time"]').value;

            if (!name || name.length < 2) {
                alert('Пожалуйста, введите корректное имя');
                return;
            }

            if (!phone || phone.length < 12) {
                alert('Пожалуйста, введите корректный номер телефона');
                return;
            }

            if (!service) {
                alert('Пожалуйста, выберите услугу');
                return;
            }

            if (!date || !time) {
                alert('Пожалуйста, выберите дату и время');
                return;
            }

            const bookingData = {
                name,
                phone,
                service,
                date,
                time
            };

            // Создаем красивое уведомление
            const notification = document.createElement('div');
            notification.className = 'booking-notification';
            notification.innerHTML = `
                <div class="notification-content">
                    <h3>Спасибо за вашу заявку!</h3>
                    <p>Мы свяжемся с вами в ближайшее время для подтверждения записи.</p>
                    <button class="btn-primary">Закрыть</button>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            // Добавляем стили для уведомления
            const style = document.createElement('style');
            style.textContent = `
                .booking-notification {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    animation: fadeIn 0.3s ease;
                }
                .notification-content {
                    background: white;
                    padding: 2rem;
                    border-radius: 15px;
                    text-align: center;
                    max-width: 400px;
                    margin: 1rem;
                    animation: slideIn 0.3s ease;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideIn {
                    from { transform: translateY(-20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);

            // Закрытие уведомления
            notification.querySelector('button').addEventListener('click', () => {
                notification.remove();
                style.remove();
            });

            // Очищаем форму
            this.reset();
        });
    }

    // Анимация появления элементов при прокрутке
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Добавляем анимацию для карточек услуг
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Добавляем класс visible при появлении элемента
    document.querySelectorAll('.price-category').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });

    // Добавляем стили для видимых элементов
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Управление видимостью хедера при скролле
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY < 50) {
            header.classList.remove('header-hidden');
        } else if (currentScrollY > lastScrollY) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateHeader();
            });
            ticking = true;
        }
    });

    // Фиксированная навигация при прокрутке
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Прокрутка вниз
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Прокрутка вверх
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Инициализация карты
    function initMap() {
        // Координаты салона
        const salonLocation = [44.948237, 34.100318];

        // Создаем карту
        const map = new ymaps.Map('map', {
            center: salonLocation,
            zoom: 16,
            controls: ['zoomControl']
        });

        // Создаем метку
        const placemark = new ymaps.Placemark(salonLocation, {
            balloonContent: `
                <div class="map-balloon">
                    <h3>COCO BEAUTY</h3>
                    <p>ул. Лексина 56А</p>
                    <p>Тел: +7 (978) 123-45-67</p>
                </div>
            `
        }, {
            preset: 'islands#redBeautyIcon'
        });

        // Добавляем метку на карту
        map.geoObjects.add(placemark);

        // Отключаем скролл карты до клика
        map.behaviors.disable('scrollZoom');
    }

    // Загружаем API Яндекс Карт
    function loadYandexMaps() {
        const script = document.createElement('script');
        script.src = 'https://api-maps.yandex.ru/2.1/?apikey=ваш-api-key&lang=ru_RU';
        script.async = true;
        script.onload = () => ymaps.ready(initMap);
        document.head.appendChild(script);
    }

    // Загружаем карту только после полной загрузки страницы
    window.addEventListener('load', loadYandexMaps);
});
