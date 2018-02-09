import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
    Container, Content, List, ListItem, InputGroup,
    Input, Icon, Text, Picker, Button, Header, Right, Body,
    Title, Drawer
}
    from 'native-base';
import SideBar from './SideBar';
import addStudent from './../actions/addStudentAction';

const Item = Picker.Item;

class RegisterStudent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            phone: '',
            gender: 'Male',
            address: '',
            name: '',
            email: ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.openDrawer = this.openDrawer.bind(this);
    }

    onValueChange(value) {
        this.setState({
            gender: value,
        });
    }
    handleClick() {
        const { dispatch } = this.props;
        dispatch(addStudent(this.state));
        Actions.studentDetails();
    }
    closeDrawer = () => {
        this.drawer._root.close();
    };
    openDrawer = () => {
        console.log('open drawer');
        this.drawer._root.open();
    };
    render() {
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideBar 
                    onSelect={this.closeDrawer.bind(this)}
                    style={{ flex: 1, backgroundColor: 'red' }}
                />}
                onClose={() => this.closeDrawer()}
                side='right'
            >
                <Container>
                    <Header>
                        <Body>
                            <Title>Register New Student</Title>
                        </Body>
                        <Right>
                            <Button
                                transparent onPress={this.openDrawer}
                            >
                                <Icon name='md-menu' />
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                        <List>
                            <ListItem>
                                <InputGroup>
                                    <Input
                                        placeholder="Name"
                                        onChangeText={(name) => this.setState({ name })}
                                    />
                                </InputGroup>
                            </ListItem>

                            <ListItem>
                                <InputGroup>
                                    <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                                    <Input
                                        placeholder="EMAIL" onChangeText={
                                            (email) => this.setState({ email })
                                        }
                                    />
                                </InputGroup>
                            </ListItem>
                            <ListItem>
                                <InputGroup>
                                    <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
                                    <Input
                                        placeholder="PASSWORD" secureTextEntry
                                        onChangeText={(password) => this.setState({ password })}
                                    />
                                </InputGroup>
                            </ListItem>
                            <ListItem>
                                <InputGroup>
                                    <Icon name="ios-call" style={{ color: '#0A69FE' }} />
                                    <Input
                                        placeholder="PHONE" keyboardType="numeric"
                                        onChangeText={(phone) => this.setState({ phone })}
                                    />
                                </InputGroup>
                            </ListItem>

                            <ListItem iconLeft>
                                <Icon name="ios-transgender" style={{ color: '#0A69FE' }} />
                                <Text>GENDER</Text>
                                <Picker
                                    style={{ width: 300 }}
                                    iosHeader="Select one"
                                    mode="dropdown"
                                    selectedValue={this.state.gender}
                                    onValueChange={this.onValueChange}
                                >
                                    <Item label="Male" value="key0" />
                                    <Item label="Female" value="key1" />
                                    <Item label="Other" value="key2" />
                                </Picker>
                            </ListItem>

                            <ListItem>
                                <InputGroup >
                                    <Input
                                        multiline
                                        stackedLabel label="Permanent Address"
                                        placeholder="Address"
                                        onChangeText={(address) => this.setState({ address })}
                                    />
                                </InputGroup>
                            </ListItem>
                        </List>
                        <Button
                            style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}
                            onPress={this.handleClick}
                        >
                            <Text>Sign Up</Text>
                        </Button>
                    </Content>
                </Container>
            </Drawer>

        );
    }
}

export default connect()(RegisterStudent);
