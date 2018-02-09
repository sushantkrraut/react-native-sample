import React from 'react';
import { Container, Content, Text, List, ListItem } from 'native-base';
import { Actions } from 'react-native-router-flux';

const routes = ['Home', 'Student Details', 'Google Maps', 'Camera', 'Bottom Navigator'];
export default class SideBar extends React.Component {

    // constructor(props) {
    //     super(props);,
     
    //     // this.handleClick = this.handleClick.bind(this);
    // }
    handleClick(action) {
        console.log(action);
        
        this.props.onSelect();

        switch (action) {
            case 'Home':
                Actions.registerStudent();
                break;
            case 'Student Details':
                Actions.studentDetails();
                break;
            case 'Google Maps':
                Actions.gMaps();
                break;
            case 'Camera':
                Actions.cam();
                break;
            case 'Bottom Navigator':
                Actions.addNavigator();
                break;
            default:
                Actions.registerStudent();
                break;
        }
    }
    render() {
        return (
            <Container style={{ backgroundColor: 'white' }} >
                <Content >
                    <List
                        dataArray={routes}
                        renderRow={data =>
                            (
                                <ListItem
                                    button
                                    onPress={this.handleClick.bind(this, data)}>
                                    <Text>{data}</Text>
                                </ListItem>
                            )
                        }
                    />
                </ Content>
            </Container>
        );
    }
}
