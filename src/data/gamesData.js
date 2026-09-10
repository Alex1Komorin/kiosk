export const games = [
  {
    id: 'schedule',
    title: 'Расписание',
    url: 'https://eios.kosgos.ru/WebApp/#/Rasp/',
    background: '#ffffff',
    showInGames: false
  },
  {
    id: 'kosgos-site',
    title: 'Сайт КГУ',
    url: 'https://kosgos.ru/',
    background: '#ffffff',
    showInGames: false
  },
  {
    id: 'ivitsh-site',
    title: 'Сайт ИВИТШ',
    url: 'https://itschool.kosgos.ru/',
    background: '#ffffff',
    showInGames: false
  },
  {
    id: 'balloon',
    title: 'Воздушные шарики',
    image: '/images/gamesIcons/baloon.png',
    url: '/shariki.html',
    background: '#0b1020'
  },
  {
    id: 'novel',
    title: 'Визуальная новелла',
    image: '/images/gamesIcons/novel.png',
    url: 'https://ilyabarilo.github.io/vn-vertical-engine/index.html?topSpacing=500&bottomSpacing=800',
    background: '#000000'
  },
  {
    id: 'puzzle',
    title: 'Пазлы к 8 марта',
    image: '/images/gamesIcons/puzzle.png',
    url: 'https://barilo.ru/games/ai/puzzle/game.html?x=4&y=6&image=8march2026-robots&res=table',
    background: '#0b1020'
  },
  {
    id: 'korpusb-games',
    title: 'Корпус Б',
    image: '/images/gamesIcons/novel.png',
    url: 'https://novels.barilo.ru/korpusb-games',
    background: '#0b1020'
  },
  {
    id: 'virtual-tour',
    title: 'Виртуальная экскурсия по корпусу',
    image: '/images/gamesIcons/virtual-tour.svg',
    url: 'https://360.kosgos.ru',
    background: '#0b1020'
  },
  {
    id: 'freshman-adaptation',
    title: 'Адаптация первокурсников',
    image: '/mascot.png',
    url: 'https://ivitsh-portal.kosgos.ru',
    background: '#ffffff'
  }
];

export const getGame = (id) => games.find((game) => game.id === id);
