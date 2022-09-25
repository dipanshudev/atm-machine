import { Box, Container, Grid, Text } from "theme-ui";
import { useState } from "react";
import AtmViewController from "./components/AtmViewController"
import { useSelector } from "react-redux";
export default function App() {
  let [twoThousandNotes, setTwoThousandNotes] = useState(0);

  const atmData = useSelector((state) => state.atm)


  const styles = {
    mainContainer: {
      backgroundColor: "#9e9e9e",
      minHeight: "100vh",
    },
    headingBox: {
      textAlign: "center",
      display: "block"
    },
    mainHeading: {
      color: "#fff",
      fontSize: "40Px"
    },
    atmBox: {
      minHeight: "450px",
      backgroundColor: "#000"
    }

  };
  return (
    <Container>
      <Box sx={styles.mainContainer}>
        <Box sx={styles.headingBox}>
          <Text sx={styles.mainHeading}>ATM Simulator</Text>

        </Box>
        <p>Suppose this is the Ui for an an ATM Machine where you can deposit and withdraw money from , the ATM machine can accept INR currency RS. 2000, 500 , 200 , 100 , the machine maintains a balance of the number of currency notes present in it and whenver you want to deposit money you have to first input the amount and currency breakdown in a series of questions asked by the machine . When you want to deposit money , you enter the amount to deposit and the ATM will tell you all the possible combinations to withdraw that amount of money for eg. user enters RS 2600 to be withdrawn , the ATM will tell [ 100 X 26 || 200 X 13 || 500 X 4 + 100 X 1 || .......] but this combination is on the basis of the currency notes available in the machine , so if no 100 rs notes are availabel , no combination with 100 should be printed</p>
        <Text> # TODO</Text>
        <ul>
          <li>Make the ATM working for Deposit by swapping the views with screen</li>
          <li>Make the available currency count working</li>
          <li>Make the withdraw feature working</li>
          <li>Use theme ui installed in this to make the ATM responsive using theme provider</li>
        </ul>
        <Box>
          <Grid gap={2} columns={[1, '2fr 2fr']}>
            <Box sx={styles.atmBox}>
              <AtmViewController />
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <p>Total Balance is {atmData.totalAmount}</p>
              <p>2000 Rs notes  {atmData.currencyOf2000}</p>
              <p>500 Rs notes  {atmData.currencyOf500}</p>
              <p>200 Rs notes  {atmData.currencyOf200}</p>
              <p>100 Rs notes  {atmData.currencyOf100}</p></Box>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
