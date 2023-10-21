import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import TodoApp from './components/TodoApp';

// import TodoList from './modals/TodoList';

function App() {
    return (
        <div className="App">
            {/* <TodoList /> */}
            <TodoApp />
        </div>
    );
}

export default App;
