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
import httpClient from '../../client/httpClient';

const DocumentItem = (props) => {
    return (
        <ListItem button onClick={() => httpClient.download(props.file.url)}>
            <ListItemAvatar>
                <Avatar>
                    <FolderIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={props.file.name}
            />
        </ListItem>
    );
}

export default DocumentItem;