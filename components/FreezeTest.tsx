import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Freeze } from 'react-freeze';

/**
 * A component that demonstrates the react-freeze functionality
 * by conditionally freezing an expensive component
 */
const ExpensiveComponent = () => {
  // This simulates an expensive component that updates frequently
  const [counter, setCounter] = useState(0);
  
  useEffect(() => {
    // Update counter every second to simulate expensive re-renders
    const interval = setInterval(() => {
      setCounter(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Simulate expensive calculation
  const expensiveCalculation = () => {
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return result.toFixed(2);
  };
  
  const calculatedValue = expensiveCalculation();
  
  return (
    <View style={styles.expensiveComponent}>
      <Text style={styles.counterText}>Counter: {counter}</Text>
      <Text style={styles.calculationText}>Expensive calculation: {calculatedValue}</Text>
    </View>
  );
};

/**
 * Main component that demonstrates freezing and unfreezing
 */
const FreezeTest = () => {
  const [isFrozen, setIsFrozen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Freeze Test for Fire OS</Text>
      
      <View style={styles.controls}>
        <Button 
          title={isFrozen ? "Unfreeze Component" : "Freeze Component"} 
          onPress={() => setIsFrozen(!isFrozen)} 
        />
        <Button 
          title={isVisible ? "Hide Component" : "Show Component"} 
          onPress={() => setIsVisible(!isVisible)} 
        />
      </View>
      
      <View style={styles.componentContainer}>
        <Text style={styles.statusText}>
          Component status: {isFrozen ? "FROZEN" : "ACTIVE"}
        </Text>
        
        {isVisible && (
          <Freeze freeze={isFrozen}>
            <ExpensiveComponent />
          </Freeze>
        )}
      </View>
      
      <Text style={styles.explanation}>
        When frozen, the component's render tree is preserved but not re-rendered.
        This can significantly improve performance for offscreen or inactive components.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  componentContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  expensiveComponent: {
    backgroundColor: '#e0f7fa',
    padding: 15,
    borderRadius: 8,
  },
  counterText: {
    fontSize: 18,
    marginBottom: 10,
  },
  calculationText: {
    fontSize: 14,
    color: '#555',
  },
  explanation: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default FreezeTest;
