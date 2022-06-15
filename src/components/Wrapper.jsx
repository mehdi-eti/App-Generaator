import { Center } from "@mantine/core";
import styled from "@emotion/styled"

const Container = styled.div`
    width: 98% !important;
`

const Wrapper = (props) => {
    return (
        <Center>
            <Container className="my-5">
                {props.children}
            </Container>
        </Center>
    )
}

export default Wrapper