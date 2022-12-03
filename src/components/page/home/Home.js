import { Box, Page, PageContent, Card, CardHeader, Paragraph, CardBody } from "grommet"
import { useEffect } from "react";
import {useNavigate, Link} from "react-router-dom";

// const callAPI = async (url = '',data)=>{
//   const response = await fetch(url, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data) // body data type must match "Content-Type" header
//   });
//   return response.json(); // parses JSON response into native JavaScript objects
// }

const Home = ({state, dispatch})=>{

  const navigate = useNavigate();
  //check if logged in


  useEffect(() => {

    if(state.token===""){
      navigate("/");
    }

    // async function fetchAPI(){
    //   const {org, orgData} = await callAPI("/org-list", {token:state.token})
    //   setCreator(org);
    //   setApproverParties(orgData);

    //   const response = await callAPI("/swap-data", {token:state.token})
    //   console.log(response);
    //   setSwapData(response);
    // }


    // fetchAPI();
    // return ()=>{
    //   // console.log("cLEANuP")
    // }
  }, [state.token, navigate]);

  // const [creator, setCreator] = useState("SELF");
  // const [approver, setApprover] = useState("Morgan Stanley")
  // const [tenor, setTenor] = useState("default");
  // const [swapType, setSwapType] = useState("Equity");
  // const [creationTime, setCreationTime ] = useState("Today");
  // const [approverParties, setApproverParties] = useState([])
  // const [swapData, setSwapData] = useState([]);

  // console.log("state", state);

  return (
    <Page >
      <PageContent background="light-3">
        <Box background="light-1" margin="small" direction="row" gap="large">

          <Link to="/create">
        <Card border width="medium" height="medium" style={{textDecoration:'none'}}>
          <CardHeader background="brand" pad={{vertical:'small', horizontal:'medium'}}>
            Create
          </CardHeader>
          <CardBody pad={{vertical:'small', horizontal:'medium'}}>
            <Paragraph>
              Create new swap wrapper
            </Paragraph>
          </CardBody>
        </Card>
        </Link>
        <Link to="/blotter">
        <Card border width="medium" height="medium">
          <CardHeader background="brand" pad={{vertical:'small', horizontal:'medium'}}>
            View
          </CardHeader>
          <CardBody pad={{vertical:'small', horizontal:'medium'}}>
            <Paragraph>
              View Swaps
            </Paragraph>
          </CardBody>
        </Card>
        </Link>
        </Box>
      </PageContent>
    </Page>
  )
}

export default Home
