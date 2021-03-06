import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import FBSDK from 'react-native-fbsdk';
import axios from 'axios';

const { LoginButton, GraphRequest, GraphRequestManager } = FBSDK;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
    this.responseInfoCallback = this.responseInfoCallback.bind(this);
  }
  responseInfoCallback(error: ?Object, result: ?Object) {
    if (error) {
      console.log(error);
    } else {
      axios.get('https://graph.facebook.com/'+result.id+'/picture?type=large&redirect=false').then((response)=>{
        this.setState({ picture: response.data.data.url});
      }
      );
      this.setState({ user: result});
    }
  }
  componentDidMount() {
    const infoRequest = new GraphRequest('/me', null, this.responseInfoCallback);
    new GraphRequestManager().addRequest(infoRequest).start();
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        {this.state.user ? (
          <View style={{alignItems:'center'}}>
            <Image
              source={{uri:this.state.picture}}
              style={{ width: 150, height: 150,borderRadius:75}}
            />
            <Text>
              {this.state.user.name}
              {'\n\n'}
            </Text>
          </View>
        ) : null}
        <LoginButton
          publishPermissions={['publish_actions']}
          onLogoutFinished={() => Actions.join({ type: 'reset' })}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    marginBottom: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
