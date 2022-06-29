import { useNavigate } from 'react-router-dom';

import './directory-item.styles.scss';

const DirectoryItem = ({ directory }) => {
    const { imageUrl, title, size, route } = directory;

    const navigate = useNavigate();

    const navigationHandler = () => navigate(route);

    return (
        <div className={`${size} directory-item-container`} onClick={navigationHandler}>
            <div className='background-image' style={{ backgroundImage: `url(${imageUrl})` }} />
            <div className="directory-item-body">
                <h2>{title}</h2>
                <p>SHOP NOW</p>
            </div>
        </div>
    );
}

export default DirectoryItem;