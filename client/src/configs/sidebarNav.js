
const sidebarNav = [
    // {
    //     link: '/',
    //     section: 'home',
    //     icon: <i className='bx bx-home-alt'></i>,
    //     text: 'INICIO'  
    // },
    {
        link: '/',
        section: 'patients',
        icon: <i className='bx bx-user' ></i>,
        text: 'PACIENTES'
    },
    // {
    //     link: '/patients',
    //     section: 'patients',
    //     icon: <i className='bx bx-user' ></i>,
    //     text: 'PACIENTES'
    // },
    {
        link: '/appointments',
        section: 'appointments',
        icon: <i className='bx bx-time-five'></i>,
        text: 'CITAS'
    },
    {
        link: '/drugs',
        section: 'drugs',
        icon: <i className='bx bxs-capsule'></i>,
        text: 'MEDICAMENTOS'
    },
    {
        link: '/inventory',
        section: 'inventory',
        icon: <i className='bx bx-cube'></i>,
        text: 'INVENTARIO'
    },


    {
        link: '/users',
        section: 'users',
        icon: <i className='bx bx-group'></i>,
        text: 'USUARIOS'
    },

    // {
    //     link: '/dash/settings',
    //     section: 'settings',
    //     icon: <i className='bx bx-cog'></i>,
    //     text: 'AJUSTES'
    // }
]
const sidebarNavEditor = [
    {
        link: '/',
        section: 'home',
        icon: <i className='bx bx-home-alt'></i>,
        text: 'INICIO'
    },
    {
        link: '/patients',
        section: 'patients',
        icon: <i className='bx bx-user' ></i>,
        text: 'PACIENTES'
    },

    {
        link: '/appointments',
        section: 'appointments',
        icon: <i className='bx bx-time-five'></i>,
        text: 'CITAS'
    },
    // {
    //     link: '/dash/settings',
    //     section: 'settings',
    //     icon: <i className='bx bx-cog'></i>,
    //     text: 'AJUSTES'
    // }
]


export {sidebarNav, sidebarNavEditor}