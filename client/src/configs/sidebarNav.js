
const sidebarNav = [
    // {
    //     link: '/dash',
    //     section: 'home',
    //     icon: <i className='bx bx-home-alt'></i>,
    //     text: 'INICIO'
    // },
    {
        link: '/dash/patients',
        section: 'patients',
        icon: <i className='bx bx-user' ></i>,
        text: 'PACIENTES'
    },
    {
        link: '/dash/appointments',
        section: 'appointments',
        icon: <i className='bx bx-time-five'></i>,
        text: 'CITAS'
    },
    {
        link: '/dash/drugs',
        section: 'drugs',
        icon: <i className='bx bxs-capsule'></i>,
        text: 'MEDICAMENTOS'
    },
    {
        link: '/dash/inventory',
        section: 'inventory',
        icon: <i className='bx bx-cube'></i>,
        text: 'INVENTARIO'
    },


    // {
    //     link: '/dash/users',
    //     section: 'users',
    //     icon: <i className='bx bx-group'></i>,
    //     text: 'USUARIOS'
    // },

    // {
    //     link: '/dash/settings',
    //     section: 'settings',
    //     icon: <i className='bx bx-cog'></i>,
    //     text: 'AJUSTES'
    // }
]
const sidebarNavEditor = [
    {
        link: '/dash',
        section: 'home',
        icon: <i className='bx bx-home-alt'></i>,
        text: 'INICIO'
    },
    {
        link: '/dash/patients',
        section: 'patients',
        icon: <i className='bx bx-user' ></i>,
        text: 'PACIENTES'
    },

    {
        link: '/dash/appointments',
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