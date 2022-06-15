import { Alert, Center } from '@mantine/core';
import { IoAlertCircleOutline } from "react-icons/io5";
import { BsSuitHeart } from "react-icons/bs";


const Logic = () => {
    return (
        <Center className='mt-5'>
            <Alert icon={<IoAlertCircleOutline size={16} />} title="Bummer!">
                Logic tab not completed yet! Please see later. <BsSuitHeart size={20} color='blue' />
            </Alert>
        </Center>
    )
}

export { Logic }