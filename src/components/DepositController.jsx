import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { Box, Grid, Text ,Button, Label, Input } from "theme-ui";
import { updateAtmCurrency } from "../redux/atmAction";

export default function DepositComponent(){
    const styles = {
        formBox: {
          backgroundColor: "#fff"
        }
    };
    const dispatch = useDispatch()
    const atmData = useSelector((state) => state.atm)

    const initialFormValue = {
        currencyOf2000 : 0,
        currencyOf500 : 0,
        currencyOf200 : 0,
        currencyOf100 : 0
    }
    const [totalAmount, settotalAmount] = useState(0)
    const [formValue, setformValue] = useState(initialFormValue)
    // handle change for form values
    const handleOnChange = (e) => {
        setformValue(formValue => {
            return {...formValue, [e.target.name] : Number(e.target.value)}
        })
    }
    // update total amount
    useEffect(() => {
      let totalAmount = formValue.currencyOf2000*2000 + formValue.currencyOf500*500 + formValue.currencyOf200*200 + formValue.currencyOf100*100  
      settotalAmount(totalAmount);
    }, [formValue])

    // handle submit
    const handleFormSubmit = (e) => {
        e.preventDefault()
        if(totalAmount < 100) {
            alert("Minimum depsit amound should be 100.")
        } else {
            let payload = {
                currencyOf2000 : atmData.currencyOf2000 + formValue.currencyOf2000,
                currencyOf500 : atmData.currencyOf500 + formValue.currencyOf500,
                currencyOf200 : atmData.currencyOf200 + formValue.currencyOf200,
                currencyOf100 : atmData.currencyOf100 + formValue.currencyOf100,
                totalAmount : atmData.totalAmount + totalAmount,
            }
            dispatch(updateAtmCurrency(payload))
            document.getElementById("form").reset();
            setformValue({
                currencyOf2000 : 0,
                currencyOf500 : 0,
                currencyOf200 : 0,
                currencyOf100 : 0
            })
            settotalAmount(0)
        }
    }

    return (
        <Box sx={styles.formBox} mx={4} mb={4} p={3}>
            <Text sx={{color:"#000"}}>Deposit Money</Text>
            <Box id="form" as="form" onSubmit={(e) => handleFormSubmit(e)}>
                <Label htmlFor="currencyOf2000">Number Of 2000 Notes</Label>
                <Input type="number" onInput={(e) => handleOnChange(e)} name="currencyOf2000" mb={3} />

                <Label htmlFor="currencyOf500">Number Of 500 Notes</Label>
                <Input type="number" onInput={(e) => handleOnChange(e)} name="currencyOf500" mb={3} />

                <Label htmlFor="currencyOf200">Number Of 200 Notes</Label>
                <Input type="number" onInput={(e) => handleOnChange(e)} name="currencyOf200" mb={3} />

                <Label htmlFor="currencyOf100">Number Of 100 Notes</Label>
                <Input type="number" onInput={(e) => handleOnChange(e)} name="currencyOf100" mb={3} />

                <Text sx={{color:"#000"}} my={3}>Total Amount : {totalAmount}</Text>
                <Box my={2}>
                    <Button sx ={{backgroundColor:"#191b81"}} >Submit</Button>
                </Box>
            </Box>
        </Box>
    )
}