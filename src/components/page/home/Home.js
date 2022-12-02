import { Box, Form, Page, PageContent, FormField,TextInput, Button, Select, Table, TableHeader, TableRow, TableCell, TableBody, DropButton } from "grommet"
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
          <TableCell scope="col" background="brand">Swap Type</TableCell>
          <TableCell scope="col" background="brand">Status</TableCell>
          <TableCell scope="col" background="brand">Action</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
      {swapData.map(data=>{
      return <TableRow>
        <TableCell scope="row">{data.actionParty}</TableCell>
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
      const {org, orgData} = await callAPI("/org-list", {token:state.token}) 
      setCreator(org);
      setApproverParties(orgData);

      const response = await callAPI("/swap-data", {token:state.token})
      console.log(response);
      setSwapData(response);
    }
    

    fetchAPI();
    return ()=>{
      // console.log("cLEANuP")
    }
  }, [state.token, navigate]);
  
  const [creator, setCreator] = useState("SELF");
  const [approver, setApprover] = useState("Morgan Stanley")
  const [tenor, setTenor] = useState("default");
  const [swapType, setSwapType] = useState("Equity");
  const [creationTime, setCreationTime ] = useState("Today");
  const [approverParties, setApproverParties] = useState([])
  const [swapData, setSwapData] = useState([]);

  console.log("state", state);
  
  return (
    <Page >
      <PageContent background="light-3">
        <Box background="light-1" margin="small">
        <Form
          onChange={(value) => console.log('Change', value)}
          onReset={() => {
            setCreator("")
            setApprover("Morgan Stanley")
          }}
          onSubmit={({ value }) => {
            console.log(value);
          }}
        >
      

      <FormField label="Creator" name="creator">
            <TextInput
              name="creator"
              value={creator}
              onChange={(event) => setCreator(event.target.value)} disabled
            />
          </FormField>
      
      

      <FormField label="Action Party" name="actionParty">
            <Select
              name="actionParty"
              options={approverParties}
              value={approver}
              onChange={(event) => setApprover(event.option)}
            />
     </FormField>


     <FormField label="Tenor" name="tenor">
            <TextInput
              name="tenor"
              value={tenor}
              onChange={(event) => setTenor(event.target.value)} 
            />
          </FormField>


          <FormField label="Swap Type" name="swaptype">
            <TextInput
              name="swaptype"
              value={swapType}
              onChange={(event) => setSwapType(event.target.value)} disabled
            />
          </FormField>

          <FormField label="Creation Time" name="creationTime">
            <TextInput
              name="creationTime"
              value={creationTime}
              onChange={(event) => setCreationTime(event.target.value)} disabled
            />
          </FormField>

      <Box direction="row" gap="medium">
        <Button type="submit" primary label="Submit" />
        <Button type="reset" label="Reset" />
      </Box>
    </Form>
        </Box>
      </PageContent>

      <PageContent background="light-1" margin={{top:"medium"}}>

      <SwapTable swapData={swapData} creator={creator}/>
      </PageContent>
    </Page>
  )
}

export default Home