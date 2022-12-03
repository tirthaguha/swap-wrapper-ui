import { Box, Page, PageContent, Button,  Table, TableHeader, TableRow, TableCell, TableBody, DropButton } from "grommet"
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

const callAPI = async (url = '',data)=>{
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const DropContent = ({ onClose }) => (
   <Box pad="small" gap="small">
     <Button primary style={{borderRadius:"2px", fontSize:"15px"}}>Accept</Button>
     <Button secondary style={{borderRadius:"2px", fontSize:"15px", borderWidth:"1px"}}>Reject</Button>
    </Box>
  );

const SimpleDropButton = () => {
    const [open, setOpen] = useState(false);
    const onOpen = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };

    return (
        <DropButton
          label="Action"
          open={open}
          onOpen={onOpen}
          onClose={onClose}
          dropContent={<DropContent onClose={onClose} />}
        />
    );
  };



const SwapTable = ({swapData, creator})=>{
  return(
    <Box>
    <Table>
      <TableHeader >
        <TableRow >
          <TableCell scope="col" background="brand">Action Party</TableCell>
          <TableCell scope="col" background="brand">Swap ID</TableCell>
          <TableCell scope="col" background="brand">Swap Type</TableCell>
          <TableCell scope="col" background="brand">Status</TableCell>
          <TableCell scope="col" background="brand">Action</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
      {swapData.map(data=>{
      return <TableRow>
        <TableCell scope="row">{data.actionParty}</TableCell>
        <TableCell scope="row">{data.swapId}</TableCell>
        <TableCell scope="row">{data.swaptype}</TableCell>
        <TableCell scope="row">{data.status}</TableCell>
        <TableCell scope="row">{data.actionParty===creator && data.status!=="accepted" ? <SimpleDropButton >Accept</SimpleDropButton>:<Button style={{padding:"4px 22px"}} primary>View</Button>}</TableCell>
      </TableRow>
      })}
    </TableBody>
  </Table>
  </Box>
  )
}

const Home = ({state, dispatch})=>{

  const navigate = useNavigate();
  //check if logged in
  useEffect(() => {

    if(state.token===""){
      navigate("/");
    }

    async function fetchAPI(){
      const {org} = await callAPI("/org-list", {token:state.token})
      setCreator(org);
      const response = await callAPI("/swap-data", {token:state.token})
      setSwapData(response);
    }


    fetchAPI();
    return ()=>{
      // console.log("cLEANuP")
    }
  }, [state.token, navigate]);

  const [creator, setCreator] = useState("SELF");
  const [swapData, setSwapData] = useState([]);

  console.log("state", state);

  return (
    <Page >
      <PageContent background="light-1" margin={{top:"medium"}}>
      <SwapTable swapData={swapData} creator={creator}/>
      </PageContent>
    </Page>
  )
}

export default Home
