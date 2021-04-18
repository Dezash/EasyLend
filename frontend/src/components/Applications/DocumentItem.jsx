import { 
    List, 
    Avatar, 
    Link, 
    ListItem, 
    ListItemAvatar, 
    ListItemText 
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import React from 'react';

const DocumentItem = (props) => {
    return (
        <Link target="_blank" href={props.file.url} color="inherit">
            <ListItem button>
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={props.file.name}
                />
            </ListItem>
        </Link>
    );
}

export default DocumentItem;