import { Button } from 'reactstrap';

function CheckComplete({ isCompleteScreen, setIsCompleteScreen }) {
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
