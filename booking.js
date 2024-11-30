document.addEventListener('DOMContentLoaded', function() {
    // Получаем referrer из URL
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    
    // Если есть referrer, сохраняем его
    if (ref) {
        localStorage.setItem('referrer', ref);
    }
    
    // Устанавливаем referrer в скрытое поле формы
    const referrerInput = document.getElementById('referrer');
    referrerInput.value = localStorage.getItem('referrer') || '';
    
    // Валидация формы
    const bookingForm = document.getElementById('bookingForm');
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Базовая валидация
        const name = this.elements['name'].value;
        const phone = this.elements['phone'].value;
        const date = this.elements['date'].value;
        const time = this.elements['time'].value;
        
        if (!name || !phone || !date || !time) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        
        // Проверка даты (не раньше текущей)
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            alert('Пожалуйста, выберите дату не раньше текущей');
            return;
        }
        
        // Если все проверки пройдены, отправляем форму
        this.submit();
    });
});
