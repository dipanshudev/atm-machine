import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Text ,Button, Label, Input } from "theme-ui";
import { updateAtmCurrency } from "../redux/atmAction";

export default function WithdrawComponent(){
    
    const styles = {
        formBox: {
          backgroundColor: "#fff"
        }
    };
    const dispatch = useDispatch()

    const atmData = useSelector((state) => state.atm)

    const initialCurrencyCount = {
        currencyOf2000 : 0,
        currencyOf500 : 0,
        currencyOf200 : 0,
        currencyOf100 : 0
    }

    const [withdrawAmount, setwithdrawAmount] = useState(0)
    const [currencyCount, setcurrencyCount] = useState(initialCurrencyCount)
    const [currencyAvailable, setcurrencyAvailable] = useState(false)
    useEffect(() => {
        let amount = Number(withdrawAmount)
        if(amount >= 100 && amount%100  === 0) {
            let currencyOf2000 = 0;
            let currencyOf500 = 0;
            let currencyOf200 = 0;
            let currencyOf100 = 0;
            let notes = [2000, 500, 200, 100];
            let noteCounter = [0, 0, 0, 0];
        
            for (var i = 0; i < 4; i++) {
                if (amount >= notes[i]) {
                    let noteCount =  Math.floor(amount / notes[i]);
                    if(notes[i] === 2000) {
                        if(noteCount <= atmData.currencyOf2000) {
                            noteCounter[i] = noteCount
                        } else {
                            noteCounter[i] = atmData.currencyOf2000        
                        }
                    } else if(notes[i] === 500 ) {
                        if(noteCount <= atmData.currencyOf500) {
                            noteCounter[i] = noteCount
                        } else {
                            noteCounter[i] = atmData.currencyOf500        
                        }
                    } else if(notes[i] === 200) {
                        if(noteCount <= atmData.currencyOf200) {
                            noteCounter[i] = noteCount
                        } else {
                            noteCounter[i] = atmData.currencyOf200        
                        }
                    } else if(notes[i] === 100) {
                        if(noteCount <= atmData.currencyOf100) {
                            noteCounter[i] = noteCount
                        } else {
                            noteCounter[i] = atmData.currencyOf100    
                        }
                    }
                    amount = amount - noteCounter[i] * notes[i];
                    if(notes[i] === 100 && amount > 0) {
                        noteCounter = [0, 0, 0, 0]
                        setcurrencyAvailable(false)
                    } else {
                        setcurrencyAvailable(true)
                    }
                }
            }

            for (var j = 0; j < 4; j++) {
                if(notes[j] === 2000) {
                    currencyOf2000 = noteCounter[j]
                } else if(notes[j] === 500) {
                    currencyOf500 = noteCounter[j]
                } else if(notes[j] === 200) {
                    currencyOf200 = noteCounter[j]
                } else if(notes[j] === 100) {
                    currencyOf100 = noteCounter[j]
                }
                setcurrencyCount({
                    currencyOf2000 : currencyOf2000,
                    currencyOf500 : currencyOf500,
                    currencyOf200 : currencyOf200,
                    currencyOf100 : currencyOf100
                })
            }      
        } else {
            setcurrencyCount({
                currencyOf2000 : 0,
                currencyOf500 : 0,
                currencyOf200 : 0,
                currencyOf100 : 0
            })
        }
    }, [withdrawAmount])
    

    const handleFormSubmit = (e) => {
        e.preventDefault()
        let amount = Number(withdrawAmount)
        if(amount > atmData.totalAmount) { 
            alert("Insufficient Balance!")
        } else if(amount >= 100 && amount%100  === 0) {
            if(!currencyAvailable) {
               alert("Unable to despense cash.") 
            } else {
                let payload = {
                    currencyOf2000 : atmData.currencyOf2000 - currencyCount.currencyOf2000,
                    currencyOf500 : atmData.currencyOf500 - currencyCount.currencyOf500,
                    currencyOf200 : atmData.currencyOf200 - currencyCount.currencyOf200,
                    currencyOf100 : atmData.currencyOf100 - currencyCount.currencyOf100,
                    totalAmount : atmData.totalAmount - amount,
                }
                dispatch(updateAtmCurrency(payload))
                alert(`Money withdrawn successfully, Please collect your cash ${amount}`)
            }
        } else {
            alert("Enter valid amount!")
        }
    }

    
    
    return (
        <Box sx={styles.formBox} mx={4} mb={4} p={3}>
            <Text sx={{color:"#000"}}>Withdraw Money</Text>
            <Box id="form" as="form" onSubmit={(e) => handleFormSubmit(e)}>
                <Label htmlFor="amount">Enter Amount</Label>
                <Input type="number" onInput={(e) => setwithdrawAmount(e.target.value)} value={withdrawAmount} name="amount" mb={3} />

                <Text sx={{color:"#000"}} my={3}>2000 x {currencyCount.currencyOf2000} + 500 x {currencyCount.currencyOf500} + 200 x {currencyCount.currencyOf200} + 100 x {currencyCount.currencyOf100}</Text>
                <Box my={2}>
                    <Button sx ={{backgroundColor:"#191b81"}} >Submit</Button>
                </Box>
            </Box>
        </Box>
    )
}