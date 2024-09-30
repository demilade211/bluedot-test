import validator from 'validator';

const validateInput = (input, setSnackInfo, setButtonDisabled, setLoading) => {

    const { email, password, confirmPassword } = input;

    let validEmail = validator.isEmail(email);

    if (!validEmail) {
        setSnackInfo(prev => ({ ...prev, openSnack: true, type: "warning", message: "Invalid email" }))
        setButtonDisabled(false);
        setLoading(false);
        return false
    }

    if (confirmPassword) {
        if (password !== confirmPassword) {
            setSnackInfo(prev => ({ ...prev, openSnack: true, type: "warning", message: "Passwords do not match" }))
            setButtonDisabled(false);
            setLoading(false);
            return false
        }
    }

    if (password.length < 6) {
        setSnackInfo(prev => ({ ...prev, openSnack: true, type: "warning", message: "Password cannot be less than 6 characters" }))
        setButtonDisabled(false);
        setLoading(false);
        return false
    }

    return true;
};

export default validateInput;