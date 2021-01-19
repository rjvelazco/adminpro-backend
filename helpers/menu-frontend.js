

const getMenuFrontEnd = (role = 'USER_ROLE') =>{
    const menu = [
        {
          titulo: 'Dashboard',
          url: '/',
          icon: 'mdi mdi-gauge',
          submenu: [
            {titulo: 'Pagina Principal', url: '/'},
          ]
        },
        {
          titulo: 'Mantenimiento',
          url: 'usuarios',
          icon: 'mdi mdi-folder-lock-open',
          submenu: [
            // {titulo: 'Usuarios', url: 'usuarios'},
            {titulo: 'Hospitales', url: 'hospitales'},
            {titulo: 'Medicos', url: 'medicos'},
          ]
        }
    ]

    if(role === 'ADMIN_ROLE'){
        menu[1].submenu.unshift({titulo: 'Usuarios', url: 'usuarios'})
    }

    return menu;
}

module.exports = {
    getMenuFrontEnd
}