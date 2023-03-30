import { Provider } from 'react-redux'
import './App.css'
import Checkout from './JS/Checkout'
import store from './JS/store/store'

export function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <Checkout />
            </Provider>
        </div>
    )
}
