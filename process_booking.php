<?php
// Настройки базы данных
$host = 'localhost';
$dbname = 'beauty_salon';
$username = 'root';
$password = '';

try {
    // Подключение к базе данных
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Получаем данные из формы
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'] ?? '';
    $service = $_POST['service'];
    $date = $_POST['date'];
    $time = $_POST['time'];
    $comments = $_POST['comments'] ?? '';
    $referrer = $_POST['referrer'] ?? '';
    
    // Подготавливаем и выполняем запрос
    $stmt = $pdo->prepare("INSERT INTO bookings (name, phone, email, service, booking_date, booking_time, comments, referrer, created_at) 
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())");
    
    $stmt->execute([$name, $phone, $email, $service, $date, $time, $comments, $referrer]);
    
    // Отправляем уведомление администратору
    $to = "admin@example.com"; // Замените на реальный email
    $subject = "Новая запись на услугу";
    $message = "
    Новая запись:
    Имя: $name
    Телефон: $phone
    Email: $email
    Услуга: $service
    Дата: $date
    Время: $time
    Комментарии: $comments
    Источник клиента: $referrer
    ";
    
    mail($to, $subject, $message);
    
    // Пример URL для записи: https://your-site.com/booking.html?ref=leracoco
    
    // Перенаправляем на страницу успешной записи
    header("Location: booking-success.html");
    exit();
    
} catch(PDOException $e) {
    // В случае ошибки записываем её в лог и показываем пользователю общее сообщение
    error_log("Ошибка базы данных: " . $e->getMessage());
    header("Location: booking-error.html");
    exit();
}
