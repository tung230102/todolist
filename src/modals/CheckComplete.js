import { Button } from 'reactstrap';
import { useTodoContext } from './ToDoContext';

function CheckComplete() {
    const { isCompleteScreen, setIsCompleteScreen } = useTodoContext();
    return (
        <div style={{ margin: '16px 0' }}>
            <Button
                color={`${(isCompleteScreen === false && 'success') || 'secondary'}`}
                onClick={() => setIsCompleteScreen(false)}
            >
                Doing
            </Button>
            <Button
                color={`${(isCompleteScreen === true && 'success') || 'secondary'}`}
                onClick={() => setIsCompleteScreen(true)}
            >
                Done
            </Button>
        </div>
    );
}

export default CheckComplete;
