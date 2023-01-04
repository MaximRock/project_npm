### Установка и применение Artifactory Ubuntu.
---
Artifactory - инструмент для хранения артефактов (пакетов, разработанных вами или другими разработчиками)
### Подготовка системы
---
1. Установка обновлений:
  > sudo apt apdate

   Если система чистая, стоит обновить установленные пакеты.
  > sudo apt upgrade

2. Открываем порты 8081 и 8082:
  > iptables -I INPUT -p tcp --dport 8081 -j ACCEPT

  > iptables -I INPUT -p tcp --dport 8082 -j ACCEPT


3. Сохраняем правила:
  > sudo apt install iptables-persistent

  > sudo netfilter-persistent save

4. Установка пакетов для работы artifactory:
  > sudo install jq

  > sudo install net-tools

  > sudo install libllvm9

  > sudo install socat

  * jq - утилита для обработки JSON в командной строке.
  * net-tools - набор утилит для работы с сетью.
  * libllmv9 - набор библиотек и инструментов, упрощающих создание компиляторов.
  * socat - инструмент для переадресации запросов к сокетам с хостовой машины на клиенскую.

### Установка Artifactory
---
1. Установка триальной версии. Скачиваем архив со скриптами установки:
  > wget -O jfrog-deb-installer.tar.gz "https://releases.jfrog.io/artifactory/jfrog-prox/org/artifactory/  pro/deb/jfrog-platform-trial-prox/[RELEASE]/jfrog-platform-trial-prox-[RELEASE]-deb.tar.gz"

2. Распакуем архив:
  > sudo tar -xvzf jfrog-deb-installer.tar.gz

3. Переходим в каталог:
  > cd jfrog-platform-trial-pro\*

4. Запускаем скрипт установки:
  > ./install.sh

5. Запускаем сервисы:
  > systemctl enable artifactory --now
  > systemctl enable xray --now

6. Открываем браузер:
  > http://\<\IP-server\>\:8082/ui/
---
  
  ![](https://www.dmosk.ru/img/miniinstruktions/artifactory-ubuntu/01.jpg)

  Пока ничего не делаем. Переходим по адресу: https://jfrog.com/start-free/#hosted.
  Вводим свои данные для регистрации:
  
 ---
![Снимок экрана от 2023-01-03 17-27-00](https://user-images.githubusercontent.com/95434302/210376867-8b229227-b950-415a-a9f1-1a785dc72fac.png)

  Активируем систему:
 
 ---
  ![](https://www.dmosk.ru/img/miniinstruktions/artifactory-ubuntu/03.jpg)

### Настройка проксирования пакетов Python через Artifactory.
---
1. Настройка сервера.
---

  ![](https://www.dmosk.ru/img/miniinstruktions/artifactory-ubuntu/04.jpg)

2. Создаем три репозитория - локальный, удаленный, виртуальный.
---

  ![](https://www.dmosk.ru/img/miniinstruktions/artifactory-ubuntu/05.jpg)
  
3. Выбираем Pypi, задаем имя репозитория:
---

  ![](https://www.dmosk.ru/img/miniinstruktions/artifactory-ubuntu/06.jpg)
  
---

  ![](https://www.dmosk.ru/img/miniinstruktions/artifactory-ubuntu/07.jpg)

4. По аналогии, создаем удаленный:
---

  ![](https://www.dmosk.ru/img/miniinstruktions/artifactory-ubuntu/08.jpg)

5. Виртуальный:
---

  ![](https://www.dmosk.ru/img/miniinstruktions/artifactory-ubuntu/09.jpg)

  При настройке виртуального репозитория добавим локальный и удаленный:
  
---

  ![](https://www.dmosk.ru/img/miniinstruktions/artifactory-ubuntu/10.jpg)

### Настройка клиента
---
1. Остаемся в веб-интерфейсе Artifactory. В правом верхнем углу кликаем по Welcome, admin и выбираем Set Me Up:
---

  ![](https://www.dmosk.ru/img/miniinstruktions/artifactory-ubuntu/11.jpg)

2. В открывшемся окне выбираем «Package Type» Pypi и наш виртуальный репозиторий pypi. Вводим пароль для пользователя, под которым мы вошли в веб-интерфейс:
---

  ![Снимок экрана](https://user-images.githubusercontent.com/95434302/210580439-c932ae36-33cb-4e11-b34b-7a80f5d642e3.png)

3. Переходим на вкладку Install — мы должны увидеть текст для настройки клиента.

4. Теперь переходим на компьютер, где будем настраивать клиент. Открываем конфигурационный файл для pip:
  > vim /etc/pip.conf
  
    > Если нужно настроить pip только для конкретного пользователя, вводим:
      mkdir ~/.pip
      vi ~/.pip/pip.conf

5. Добавляем текст с вкладки Install (п. 3):

  > [global] 
 
    index-url = http://admin:<password>@192.168.101.100:8081/artifactory/api/pypi/pipy/simple
  
    trusted-host = 192.168.101.100
    
  * index-url - указывает на хранилище пакетов Python, откуда pip должен выполнять установку.
  * 192.168.101.100 - IP-адрес нашего сервера Artifactory.
  * trusted-host - позволяет перечислить серверы, которым будет доверять наш клиент. Чтобы не указывать данную настройку, наш сервер должен отвечать по https.

6. Пробуем установить пакет с помощью pip, например:
  > pip install favicon

  Мы должны увидеть, что установка выполняется с нашего сервера Artifactory.
