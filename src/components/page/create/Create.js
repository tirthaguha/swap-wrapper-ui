import { Box, Form, Page, PageContent, FormField,TextInput, Button, Select } from "grommet"
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
    }


    fetchAPI();
    return ()=>{
      // console.log("cLEANuP")
    }
  }, [state.token, navigate]);

  const [creator, setCreator] = useState("SELF");
  const [approver, setApprover] = useState("Morgan Stanley")
  const [swapId, setSwapId] = useState("");
  const [tenor, setTenor] = useState("1 year");
  const [swapType, setSwapType] = useState("Equity");
  const [creationTime, setCreationTime ] = useState("Today");
  const [approverParties, setApproverParties] = useState([])

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
            setSwapId("")
          }}
          onSubmit={({ value }) => {
            const payload = {
              data:value,
               token:state.token
            }
            console.log(payload)
            callAPI("/new-swap", payload)

          }}
        >


<Box direction="row">
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

     <FormField label="Swap ID" name="swapID">
            <TextInput
              name="swapID"
              value={swapId}
              onChange={(event) => setSwapId(event.target.value)}
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
          </Box>
      <Box direction="row" gap="medium">
        <Button type="submit" primary label="Submit" />
        <Button type="reset" label="Reset" />
      </Box>
    </Form>
        </Box>
      </PageContent>
    </Page>
  )
}

export default Home
