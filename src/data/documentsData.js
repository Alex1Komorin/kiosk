export const documentsData = {
  type: 'folder',
  name: 'Документы',
  path: '/',
  children: [
    {
      type: 'folder',
      name: 'Учебные группы',
      path: '/учебные-группы',
      icon: 'fas fa-users',
      children: [
        {
          type: 'folder',
          name: 'Бакалавриат',
          path: '/учебные-группы/бакалавриат',
          icon: 'fas fa-folder',
          children: [
            {
              type: 'folder',
              name: '1 курс',
              path: '/учебные-группы/бакалавриат/1-курс',
              icon: 'fas fa-folder',
              children: [
                {
                  type: 'file',
                  name: 'Список групп 1 курс.pdf',
                  path: '/documents/otchet.pdf',
                  size: '1.2 MB',
                  icon: 'fas fa-file-pdf'
                }
              ]
            },
            {
              type: 'folder',
              name: '2 курс',
              path: '/учебные-группы/бакалавриат/2-курс',
              icon: 'fas fa-folder',
              children: [
                {
                  type: 'file',
                  name: 'Список групп 2 курс.pdf',
                  path: '/documents/учебные-группы/бакалавриат/2-курс/список-групп.pdf',
                  size: '1.3 MB',
                  icon: 'fas fa-file-pdf'
                }
              ]
            },
            {
              type: 'folder',
              name: '3 курс',
              path: '/учебные-группы/бакалавриат/3-курс',
              icon: 'fas fa-folder',
              children: [
                {
                  type: 'file',
                  name: 'Список групп 3 курс.pdf',
                  path: '/documents/учебные-группы/бакалавриат/3-курс/список-групп.pdf',
                  size: '1.4 MB',
                  icon: 'fas fa-file-pdf'
                }
              ]
            },
            {
              type: 'folder',
              name: '4 курс',
              path: '/учебные-группы/бакалавриат/4-курс',
              icon: 'fas fa-folder',
              children: [
                {
                  type: 'file',
                  name: 'Список групп 4 курс.pdf',
                  path: '/documents/учебные-группы/бакалавриат/4-курс/список-групп.pdf',
                  size: '1.5 MB',
                  icon: 'fas fa-file-pdf'
                }
              ]
            }
          ]
        },
        {
          type: 'folder',
          name: 'Магистратура',
          path: '/учебные-группы/магистратура',
          icon: 'fas fa-folder',
          children: [
            {
              type: 'file',
              name: 'Список групп магистратура.pdf',
              path: '/documents/учебные-группы/магистратура/список-групп.pdf',
              size: '0.9 MB',
              icon: 'fas fa-file-pdf'
            }
          ]
        }
      ]
    },
    {
      type: 'folder',
      name: 'Перечень примерных тем курсовых и дипломных проектов',
      path: '/темы-проектов',
      icon: 'fas fa-tasks',
      children: [
        {
          type: 'folder',
          name: 'Бакалавриат',
          path: '/темы-проектов/бакалавриат',
          icon: 'fas fa-folder',
          children: [
            {
              type: 'folder',
              name: '1 курс',
              path: '/темы-проектов/бакалавриат/1-курс',
              icon: 'fas fa-folder',
              children: [
                {
                  type: 'file',
                  name: 'Темы курсовых 1 курс.pdf',
                  path: '/documents/темы-проектов/бакалавриат/1-курс/темы-курсовых.pdf',
                  size: '2.1 MB',
                  icon: 'fas fa-file-pdf'
                }
              ]
            },
            {
              type: 'folder',
              name: '2 курс',
              path: '/темы-проектов/бакалавриат/2-курс',
              icon: 'fas fa-folder',
              children: [
                {
                  type: 'file',
                  name: 'Темы курсовых 2 курс.pdf',
                  path: '/documents/темы-проектов/бакалавриат/2-курс/темы-курсовых.pdf',
                  size: '2.2 MB',
                  icon: 'fas fa-file-pdf'
                }
              ]
            },
            {
              type: 'folder',
              name: '3 курс',
              path: '/темы-проектов/бакалавриат/3-курс',
              icon: 'fas fa-folder',
              children: [
                {
                  type: 'file',
                  name: 'Темы курсовых 3 курс.pdf',
                  path: '/documents/темы-проектов/бакалавриат/3-курс/темы-курсовых.pdf',
                  size: '2.3 MB',
                  icon: 'fas fa-file-pdf'
                }
              ]
            },
            {
              type: 'folder',
              name: '4 курс',
              path: '/темы-проектов/бакалавриат/4-курс',
              icon: 'fas fa-folder',
              children: [
                {
                  type: 'file',
                  name: 'Темы дипломных проектов.pdf',
                  path: '/documents/темы-проектов/бакалавриат/4-курс/темы-дипломных.pdf',
                  size: '3.5 MB',
                  icon: 'fas fa-file-pdf'
                }
              ]
            }
          ]
        },
        {
          type: 'folder',
          name: 'Магистратура',
          path: '/темы-проектов/магистратура',
          icon: 'fas fa-folder',
          children: [
            {
              type: 'file',
              name: 'Темы магистерских диссертаций.pdf',
              path: '/documents/темы-проектов/магистратура/темы-магистерских.pdf',
              size: '2.8 MB',
              icon: 'fas fa-file-pdf'
            }
          ]
        }
      ]
    },
    {
      type: 'folder',
      name: 'Кураторы групп',
      path: '/кураторы',
      icon: 'fas fa-chalkboard-teacher',
      children: [
        {
          type: 'folder',
          name: 'Бакалавриат',
          path: '/кураторы/бакалавриат',
          icon: 'fas fa-folder',
          children: [
            {
              type: 'folder',
              name: '1 курс',
              path: '/кураторы/бакалавриат/1-курс',
              icon: 'fas fa-folder',
              children: [
                {
                  type: 'file',
                  name: 'Кураторы 1 курс.pdf',
                  path: '/documents/кураторы/бакалавриат/1-курс/кураторы.pdf',
                  size: '0.8 MB',
                  icon: 'fas fa-file-pdf'
                }
              ]
            },
            {
              type: 'folder',
              name: '2 курс',
              path: '/кураторы/бакалавриат/2-курс',
              icon: 'fas fa-folder',
              children: [
                {
                  type: 'file',
                  name: 'Кураторы 2 курс.pdf',
                  path: '/documents/кураторы/бакалавриат/2-курс/кураторы.pdf',
                  size: '0.9 MB',
                  icon: 'fas fa-file-pdf'
                }
              ]
            },
            {
              type: 'folder',
              name: '3 курс',
              path: '/кураторы/бакалавриат/3-курс',
              icon: 'fas fa-folder',
              children: [
                {
                  type: 'file',
                  name: 'Кураторы 3 курс.pdf',
                  path: '/documents/кураторы/бакалавриат/3-курс/кураторы.pdf',
                  size: '0.9 MB',
                  icon: 'fas fa-file-pdf'
                }
              ]
            },
            {
              type: 'folder',
              name: '4 курс',
              path: '/кураторы/бакалавриат/4-курс',
              icon: 'fas fa-folder',
              children: [
                {
                  type: 'file',
                  name: 'Кураторы 4 курс.pdf',
                  path: '/documents/кураторы/бакалавриат/4-курс/кураторы.pdf',
                  size: '1.0 MB',
                  icon: 'fas fa-file-pdf'
                }
              ]
            }
          ]
        },
        {
          type: 'folder',
          name: 'Магистратура',
          path: '/кураторы/магистратура',
          icon: 'fas fa-folder',
          children: [
            {
              type: 'file',
              name: 'Кураторы магистратура.pdf',
              path: '/documents/кураторы/магистратура/кураторы.pdf',
              size: '0.7 MB',
              icon: 'fas fa-file-pdf'
            }
          ]
        }
      ]
    }
  ]
};