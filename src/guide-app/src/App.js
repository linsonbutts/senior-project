import React from 'react'
import Building from './components/Building'
import Layout from './components/Layout'
//import Navbar from './components/Navbar'

function App() {
  return (
    <React.Fragment>
    <Layout>
      <Building></Building>
    </Layout>
    </React.Fragment>
  );
}

export default App;