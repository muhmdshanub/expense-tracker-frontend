import React from 'react';
import ExpenseApp from './features/expenses/ExpenseApp';
import ErrorBoundary from './components/atoms/ErrorBoundary'; // Let's make an ErrorBoundary as well

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <ExpenseApp />
      </ErrorBoundary>
    </div>
  );
}

export default App;