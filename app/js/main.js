const toggleDrawer = () => {
    const drawerClassList = event.target.classList
    const navClassList = document.querySelectorAll('.header-navbar')[0].classList

    drawerClassList.toggle('opened')
    navClassList.toggle('opened')
}

const toggleDropdown = () => {
    if(event.target.querySelector('.dropdown-list')){
        const dropDownClassList = event.target.querySelector('.dropdown-list').classList
        
        dropDownClassList.toggle('opened')
    }

}