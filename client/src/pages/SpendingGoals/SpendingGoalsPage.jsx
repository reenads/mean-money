import { useNavigate } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import { useState, useEffect } from "react";
import { Alert } from '@mui/material/';
import { setSpendingGoals } from "../../services/users"
import { getMyUserDetails } from "../../services/users";
export function SpendingGoalsPage() {

    const [errorStatus, setErrorStatus] = useState(false);
    const [loading, setLoading] = useState(true);

    const [currentSavings, setCurrentSavings] = useState();
    const [disposableIncome, setDisposableIncome] = useState();
    const [foodAndDrinkGoal, setFoodAndDrinkGoal] = useState();
    const [socialOutingsGoal, setSocialOutingsGoal] = useState();
    const [entertainmentAndAppsGoal, setEntertainmentAndAppsGoal] = useState();
    const [holidayAndTravelGoal, setHolidayAndTravelGoal] = useState();
    const [healthAndBeautyGoal, setHealthAndBeautyGoal] = useState();
    const [miscGoal, setMiscGoal] = useState();

    const navigate = useNavigate();
    let errorHelp = false

    useEffect(() => {
        
        const token = localStorage.getItem("token");
        getMyUserDetails(token)
        .then(allData => allData.userData)
        .then(data => (
            setCurrentSavings(data.currentSavings.toFixed(2)),
            setDisposableIncome(data.disposableIncome.toFixed(2)),
            setFoodAndDrinkGoal(data.foodAndDrinkGoal.toFixed(2)),
            setSocialOutingsGoal(data.socialOutingsGoal.toFixed(2)),
            setEntertainmentAndAppsGoal(data.entertainmentAndAppsGoal.toFixed(2)),
            setHolidayAndTravelGoal(data.holidayAndTravelGoal.toFixed(2)),
            setHealthAndBeautyGoal(data.healthAndBeautyGoal.toFixed(2)),
            setMiscGoal(data.miscGoal.toFixed(2)),
            setLoading(false)))
            
        .catch(error => {
            console.error("Error fetching user details:", error);
            setLoading(false);
        });
    }, []);


    const handleSubmit = async (event) => {
        errorHelp = false;
        setErrorStatus(false);
        
        const token = localStorage.getItem("token");
        event.preventDefault();
        
        try {
            const inputList = [Number(currentSavings), Number(disposableIncome), Number(foodAndDrinkGoal), Number(socialOutingsGoal), Number(entertainmentAndAppsGoal), Number(holidayAndTravelGoal), Number(healthAndBeautyGoal), Number(miscGoal)]
            inputList.forEach((value) => {
            if (value.toFixed(2) != value || value<0) {
                errorHelp = true;
                setErrorStatus(true)
            }
        })
            if (!errorHelp){
                await setSpendingGoals(token, Number(currentSavings), Number(disposableIncome), Number(foodAndDrinkGoal), Number(socialOutingsGoal), Number(entertainmentAndAppsGoal), Number(holidayAndTravelGoal), Number(healthAndBeautyGoal), Number(miscGoal));
                navigate("/dashboard")
            }
        } catch (err) {
            console.error(err);

        }
    }

    const checkInputValid = (newValue, functionRunIfValid) => {
        // If box is empty or a number, let the value update:
        // causes issues, commented out:
        // if (newValue === "" || !isNaN(newValue) || newValue!=='-') {
            functionRunIfValid(newValue);
        // }
    }

    if(loading){
        return(
            <>
            <p>loading...</p></>
        )
    }
    return (
        <>
            <NavBar />
            <h1>Spending Goals</h1>
            <h3>Let's see what we're working with</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="currentSavings">Current savings</label>
                    <input
                        id="currentSavings"
                        type="text"
                        value={currentSavings}
                        onChange={(event) => checkInputValid(event.target.value, setCurrentSavings)}
                    />
                    <br></br>
                    <label htmlFor="disposableIncome">Monthly disposable income</label>
                    <input
                        id="disposableIncome"
                        type="text"
                        value={disposableIncome}
                        // onChange={(event) => setDisposableIncome(event.target.value)}
                        onChange={(event) => checkInputValid(event.target.value, setDisposableIncome)}

                    />

                    <h3>How much would you like to try and spend per month on the following categories?</h3>

                    <label htmlFor="foodAndDrinkGoal">Food & Drink</label>
                    <input
                        id="foodAndDrinkGoal"
                        type="currency"
                        value={foodAndDrinkGoal}
                        onChange={(event) => checkInputValid(event.target.value, setFoodAndDrinkGoal)}
                    />
                    <br></br>
                    <label htmlFor="socialOutingsGoal">Social Outings</label>
                    <input
                        id="socialOutingsGoal"
                        type="text"
                        value={socialOutingsGoal}
                        onChange={(event) => checkInputValid(event.target.value, setSocialOutingsGoal)}
                    />
                    <br></br>
                    <label htmlFor="entertainmentAndAppsGoal">Entertainment & Apps</label>
                    <input
                        id="entertainmentAndAppsGoal"
                        type="text"
                        value={entertainmentAndAppsGoal}
                        onChange={(event) => checkInputValid(event.target.value, setEntertainmentAndAppsGoal)}
                    />
                    <br></br>
                    <label htmlFor="holidayAndTravelGoal">Holiday & Travel</label>
                    <input
                        id="holidayAndTravelGoal"
                        type="text"
                        value={holidayAndTravelGoal}
                        onChange={(event) => checkInputValid(event.target.value, setHolidayAndTravelGoal)}
                    />
                    <br></br>
                    <label htmlFor="healthAndBeautyGoal">Health & Beauty</label>
                    <input
                        id="healthAndBeautyGoal"
                        type="text"
                        value={healthAndBeautyGoal}
                        onChange={(event) => checkInputValid(event.target.value, setHealthAndBeautyGoal)}
                    />
                    <br></br>
                    <label htmlFor="miscGoal">Miscellaneous</label>
                    <input
                        id="miscGoal"
                        type="text"
                        value={miscGoal}
                        onChange={(event) => checkInputValid(event.target.value, setMiscGoal)}
                    />
                    <br></br>
                    <input
                        role="submit-button"
                        id="submit"
                        type="submit"
                        value="Submit"
                    />
                </div>
            </form>
            {errorStatus &&
                <Alert severity="error" color="error" onClose={() => {setErrorStatus(false)}}>
                    Please ensure all spending goals are positive, numerical amounts of money.
                </Alert>
            }
        </>
    );
}
