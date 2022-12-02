import { Box, Button, Heading, Text } from "grommet";

const LogOutButton = ()=><Button>LogOut</Button>


const HeaderBar = ({state}) => {
  const {username} = state;
  return (
    <Box
      tag='header'
      direction='row'
      align='center'
      justify='between'
      background='brand'
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation='medium'
      style={{ zIndex: '1' }}
      
    >
      <Box><Text color="black" size="xxlarge">OSTTRA</Text></Box>
      <Box direction="row" gap="medium">
        {username?<Heading level="4">Hello {username}</Heading>:<Heading level="4">{"Please Login"}</Heading>}
        {username && <LogOutButton />}
        </Box>
      </Box>
  )};

  export default HeaderBar;