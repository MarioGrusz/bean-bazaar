import './index.scss';

const SidebarHeader = ({ toggleFilterNavbar }) => {

    return (
        <div className='sidebar-header'>
            <span className='sidebar-header__title'>Filter</span>
            <button onClick={toggleFilterNavbar} className='sidebar-header__btn-close'>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4.81885L4 12.8188M12 12.8188L4 4.81885" stroke="#292929" strokeMiterlimit={10} strokeLinecap="round"></path>
            </svg>
            </button>
        </div>
    )

}


export default SidebarHeader;

