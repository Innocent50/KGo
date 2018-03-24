import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import FBSDK from 'react-native-fbsdk';
import { styles } from '../styles';

const { LoginButton } = FBSDK;

class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <View style={styles.logo}>
          <LoginButton
            publishPermissions={['publish_actions']}
            onLoginFinished={(error, result) => {
              if (error) {
                alert('Login failed with error: ' + result.error);
              } else if (result.isCancelled) {
                alert('Login was cancelled');
              } else {
                alert('Login was successful with permissions: ' + result.grantedPermissions);
              }
            }}
            onLogoutFinished={() => Actions.join({ type: 'reset' })}
          />
        </View>
        <View style={{ position: 'absolute', bottom: 30 }}>
          <Text style={{ fontSize: 10, color: 'rgba(18, 41, 72, 0.8)' }}>KGo</Text>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
