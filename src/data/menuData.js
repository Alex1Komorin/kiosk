export const menuData = {
  links: [
    {
      id: 1,
      title: 'Костромской государственный университет',
      url: 'https://kosgos.ru/',
      icon: 'fas fa-university'
    },
    {
      id: 2,
      title: 'Высшая IT школа',
      url: 'https://itschool.kosgos.ru/',
      icon: 'fas fa-laptop-code'
    },
    {
      id: 3,
      title: 'ЭИОС',
      url: 'https://eios.kosgos.ru/',
      icon: 'fas fa-graduation-cap'
    },
    {
      id: 4,
      title: 'Расписание',
      url: 'https://eios.kosgos.ru/WebApp/#/rasp',
      icon: 'fas fa-calendar-alt'
    },
    {
      id: 5,
      title: 'Учебные планы, ОП, РПД',
      url: 'https://kosgos.ru/external/op_info.php',
      icon: 'fas fa-book'
    },
    {
      id: 6,
      title: 'Время работы',
      url: 'https://kosgos.ru/svedeniya-ob-organizatsii/struktura-i-organy-upravleniya/instituty/institut-vysshaya-it-shkola/kafedry/kafedra-informatsionnykh-sistem-i-tekhnologij.html',
      icon: 'fas fa-clock'
    },
    {
      id: 7,
      title: 'Контактная информация',
      url: 'https://kosgos.ru/svedeniya-ob-organizatsii/struktura-i-organy-upravleniya/instituty/institut-vysshaya-it-shkola/kafedry/kafedra-prikladnoj-matematiki-i-informatsionnykh-tekhnologij.html',
      icon: 'fas fa-address-card'
    },
    {
      id: 8,
      title: 'ППС',
      url: 'https://kosgos.ru/svedeniya-ob-organizatsii/struktura-i-organy-upravleniya/instituty/institut-vysshaya-it-shkola/kafedry/kafedra-zashchity-informatsii.html',
      icon: 'fas fa-chalkboard-teacher'
    },
    {
      id: 9,
      title: 'Наука',
      url: 'https://kosgos.ru/svedeniya-ob-organizatsii/struktura-i-organy-upravleniya/instituty/institut-vysshaya-it-shkola/nauchnaya-deyatelnost.html',
      icon: 'fas fa-flask'
    },
    {
      id: 10,
      title: 'Воспитание',
      url: 'https://kosgos.ru/svedeniya-ob-organizatsii/struktura-i-organy-upravleniya/instituty/institut-vysshaya-it-shkola/vospitatel-naya-rabota.html',
      icon: 'fas fa-heart'
    },
    {
      id: 11,
      title: 'Дирекция',
      url: 'https://kosgos.ru/svedeniya-ob-organizatsii/struktura-i-organy-upravleniya/instituty/institut-vysshaya-it-shkola.html',
      icon: 'fas fa-building'
    },
    {
      id: 12,
      title: 'Антикорупция',
      url: 'https://kosgos.ru/svedeniya-ob-organizatsii/osnovnye-svedeniya/protivodejstvie-korruptsii.html',
      icon: 'fas fa-gavel'
    },
    {
      id: 13,
      title: 'Новости института',
      url: 'https://kosgos.ru/svedeniya-ob-organizatsii/struktura-i-organy-upravleniya/instituty/institut-vysshaya-it-shkola/novosti-itschool.html',
      icon: 'fas fa-newspaper'
    },
    {
      id: 14,
      title: 'Аудитории и их наполнение',
      url: 'https://docs.google.com/spreadsheets/d/1sN-2QYR2nOeZ91coKSBT8JHKyPhNHdBxx5q-xzQZcOc/edit?gid=0#gid=0',
      icon: 'fas fa-chalkboard'
    }
  ],
  
  documents: {
    type: 'folder',
    name: 'Документы',
    path: '/',
    children: [
      {
        type: 'folder',
        name: 'Учебные материалы',
        path: '/учебные-материалы',
        icon: 'fas fa-graduation-cap',
        children: [
          {
            type: 'folder', 
            name: '1 курс',
            path: '/учебные-материалы/1-курс',
            icon: 'fas fa-1',
            children: [
              {
                type: 'file',
                name: 'Математика - Лекции.pdf',
                path: '/учебные-материалы/1-курс/математика-лекции.pdf',
                size: '2.4 MB',
                icon: 'fas fa-file-pdf'
              },
              {
                type: 'file',
                name: 'Программирование - Практика.docx',
                path: '/учебные-материалы/1-курс/программирование-практика.docx',
                size: '1.8 MB',
                icon: 'fas fa-file-word'
              },
              {
                type: 'file',
                name: 'Физика - Конспект.pdf',
                path: '/учебные-материалы/1-курс/физика-конспект.pdf',
                size: '3.1 MB',
                icon: 'fas fa-file-pdf'
              }
            ]
          },
          {
            type: 'folder',
            name: '2 курс',
            path: '/учебные-материалы/2-курс',
            icon: 'fas fa-2',
            children: [
              {
                type: 'file',
                name: 'Базы данных - Курс лекций.pdf',
                path: '/учебные-материалы/2-курс/базы-данных.pdf',
                size: '4.2 MB',
                icon: 'fas fa-file-pdf'
              },
              {
                type: 'file',
                name: 'Веб-разработка - Практикум.docx',
                path: '/учебные-материалы/2-курс/веб-разработка.docx',
                size: '2.9 MB',
                icon: 'fas fa-file-word'
              }
            ]
          },
          {
            type: 'folder',
            name: '3 курс',
            path: '/учебные-материалы/3-курс',
            icon: 'fas fa-3',
            children: [
              {
                type: 'file',
                name: 'ИИ и машинное обучение.pdf',
                path: '/учебные-материалы/3-курс/ии-машинное-обучение.pdf',
                size: '5.7 MB',
                icon: 'fas fa-file-pdf'
              }
            ]
          }
        ]
      },
      {
        type: 'folder',
        name: 'Методические указания',
        path: '/методические-указания',
        icon: 'fas fa-book-open',
        children: [
          {
            type: 'file',
            name: 'Дипломная работа - Требования.pdf',
            path: '/методические-указания/дипломная-работа.pdf',
            size: '4.1 MB',
            icon: 'fas fa-file-pdf'
          },
          {
            type: 'file',
            name: 'Курсовая работа - Guidelines.docx',
            path: '/методические-указания/курсовая-работа.docx',
            size: '2.3 MB',
            icon: 'fas fa-file-word'
          }
        ]
      },
      {
        type: 'folder',
        name: 'Расписания',
        path: '/расписания',
        icon: 'fas fa-calendar',
        children: [
          {
            type: 'file',
            name: 'Расписание на весенний семестр.pdf',
            path: '/расписания/весенний-семестр.pdf',
            size: '1.5 MB',
            icon: 'fas fa-file-pdf'
          },
          {
            type: 'file',
            name: 'Экзаменационная сессия.xlsx',
            path: '/расписания/экзаменационная-сессия.xlsx',
            size: '0.9 MB',
            icon: 'fas fa-file-excel'
          }
        ]
      },
      {
        type: 'file',
        name: 'Общие правила и положения.pdf',
        path: '/общие-правила.pdf',
        size: '1.2 MB',
        icon: 'fas fa-file-pdf'
      },
      {
        type: 'file',
        name: 'Устав университета.docx',
        path: '/устав-университета.docx',
        size: '3.8 MB',
        icon: 'fas fa-file-word'
      }
    ]
  },
  
  other: [
    {
      id: 1,
      title: 'Настройки системы',
      description: 'Конфигурация параметров и предпочтений',
      icon: 'fas fa-cogs'
    },
    {
      id: 2,
      title: 'История действий',
      description: 'Лог всех выполненных операций',
      icon: 'fas fa-history'
    },
    {
      id: 3,
      title: 'Резервные копии',
      description: 'Управление и восстановление бэкапов',
      icon: 'fas fa-database'
    },
    {
      id: 4,
      title: 'Статистика использования',
      description: 'Аналитика и метрики работы системы',
      icon: 'fas fa-chart-line'
    },
    {
      id: 5,
      title: 'Внешние интеграции',
      description: 'Подключенные сервисы и API',
      icon: 'fas fa-plug'
    }
  ]
};