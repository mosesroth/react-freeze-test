import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import FreezeTest from '../../components/FreezeTest';

export default function FreezeTestScreen() {
  return (
    <View style={styles.container}>
      <FreezeTest />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
