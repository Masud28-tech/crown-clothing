import './directory-item.styles.scss';

const DirectoryItem = ({ directory }) => {
    const { imageUrl, title, size } = directory;
    return (
        <div className={`${size} directory-item-container`}>
            <div className='background-image' style={{ backgroundImage: `url(${imageUrl})` }} />
            <div className="directory-item-body">
                <h2>{title}</h2>
                <p>SHOP NOW</p>
            </div>
        </div>
    );
}

export default DirectoryItem;