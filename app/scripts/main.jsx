import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import RaisedButton from 'material-ui/lib/raised-button';
import Image from './image';

export default class Main extends React.Component {
    render() {
        return (
          <div>
            <AppBar
              title="Title"
              iconClassNameRight="muidocs-icon-navigation-expand-more" />
            <h1>This is the main thing</h1>
            <RaisedButton label="Default" />
          </div>
        )
    }
}
