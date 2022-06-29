import DirectoryItem from '../directory-item/directory-item.component';

import './directory.styles.scss';

const Directory = ({ directories }) => {
    return (
        <div className="directory-container">

            {directories.map((directory) => (
                <DirectoryItem key={directory.id} directory={directory} />
            ))}

        </div>
    );
}

export default Directory;