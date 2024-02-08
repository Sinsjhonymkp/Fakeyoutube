## Описание

Больше не нужно тратить время и деньги на натяжку лэндинга HTML на CMS системы. Теперь можете просто закинуть папку с нашей системой в свой шаблон и управление текстами, изображениями, блоками, кнопками у вас уже под рукой с доступом по паролю. Это просто и удобно! 


## Внимание!

Не каждый сайт может поддаваться редактированию, так как некоторые сайты могут вообще не содержать html кода, а генерировать его динамически с помощью JavaScript. В таком случае, просто невозможно отредактировать текст или изображения программно.


## Возможности

1. Редактирование текста на странице. Практически любой текст редактируется. Все зависит от чистоты верстки и используемых JS библиотек

2. Изменение стилей для блоков, кнопок, изображений, текста
3. Редактирование блоков, кнопок, и даже некоторых типов полей ввода

4. Стили для разных разрешений экрана
Ширина < 576px - Телефон
Ширина ≥ 576px ≥ 768px - Планшет
Ширина ≥ 768px - Десктоп

5. Чтобы запустить изменение изображения, нужно кликнуть двойным кликом по изображению

6. Управление формами. Возможность настроить отправку данных из формы на почту, на почту через SMTP, в CRM Битрикс24 и в телеграм. Можно настроить отправку данных сразу во все направления. 
! Иногда формы шаблонов содержат событие onsubmit или onclick. Советую удалить события, так как это может блокировать работу формы через pagedot.
! Настраиваемая форма должна содержать стандартную кнопку отправки формы типа submit 

7. Копирование сайтов. Можете прямо в системе скопировать стрницу стороннего сайта и сразу же приступить к редактированию.
! Далеко ни каждый сайт поддается копированию. На это разные причины. Обычно это мешает защита от парсинга... 
! И прошу меня понять, я не собираюсь делать обход защиты и нарушать права обладателя копируемого сайта. 
! Так же не собираюсь делать поддержку копирования через сокеты - это тоже считается за обход ограничений.
! Копируйте те сайты, которые не запретили этого делать технически. А остальная морально-правовая отвественность остается за вами.


## Требования

>= PHP 7.3

1. Структура страницы должна содержать следующие теги
<doctype>
<html>
	<head>
		<title></title>
	</head>
	<body></body>
</html>


2. Поддерживаются файлы только с html, css, javascript кодом. Если в коде присутствует PHP код, я гарантий не даю за его работоспособность в будущем 

3. Текст редактируется, только если элемент с текстом не содержит внутри другой элемент


## Права доступа

Желательно в целях безопасности установить права на папку /admin/ - 0700


## Резервная копия

Лучше сохранить код шаблона, для того, чтобы в случае чего, восстановить код... 

Но! В админке уже предусмотрено резервное копирование. При каждом сохранении изменений, сохраняется копия файла в папку /admin/history/ Откуда можно вытащить более старую версию кода и обновить себе в файл. Понимаю, что это может сделать только разбирающийся пользователь, так что дальше в планах сделать управление историей через интерфейс.








