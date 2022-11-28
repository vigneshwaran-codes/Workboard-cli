import './App.css'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Project from './pages/Project'
import NotFound from './pages/NotFound'

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge (existing, incoming) {
            return incoming
          }
        },
        projects: {
          merge (existing, incoming) {
            return incoming
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache
})

function App () {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className='container'>
          <Switch>
            <Route exact path='/'><Home /></Route>
            <Route exact path='/projects/:id'><Project /></Route>
            <Route exact path='*'><NotFound /></Route>
          </Switch>
        </div>
      </ApolloProvider>

    </>
  )
}

export default App
