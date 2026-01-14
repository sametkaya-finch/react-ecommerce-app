import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { FaRegUserCircle } from "react-icons/fa";
import { LuLockKeyhole } from "react-icons/lu";
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { RegisterPageSchema } from '../schemas/RegisterPageSchema';
import '../css/LoginPage.css'
import LoginPageServices from '../services/LoginPageServices';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setLoading } from '../redux/AppSlice';
import type { CheckUserType, UserType } from '../types/Types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const checkUser = (userList: UserType[], username: string, password: string): CheckUserType => {
        const response: CheckUserType = { result: false, currentUser: null }
        userList.forEach((user: UserType) => {
            if (user.username === username && user.password === password) {
                response.result = true;
                response.currentUser = user;
            }
        })
        return response;
    }

    const submit = async (values: any, actions: any) => {
        try {
            dispatch(setLoading(true))
            const response: UserType[] = await LoginPageServices.login();
            if (response) {
                const checkUserResponse: CheckUserType = checkUser(response, values.username, values.password);
                if (checkUserResponse.result && checkUserResponse.currentUser) {
                    dispatch(setCurrentUser(checkUserResponse.currentUser));
                    localStorage.setItem("currentUser", JSON.stringify(checkUserResponse.currentUser));
                    navigate("/");
                } else {
                    toast.error("Username or password is incorrect");
                }
            }
        } catch (error) {
            toast.error("An error occurred during the login process." + error);

        } finally {
            dispatch(setLoading(false));

        }
    }

    const { values, handleSubmit, handleChange, errors } = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: submit,
        validationSchema: RegisterPageSchema
    });

    return (
        <div className='login'>
            <div className='main'>
                <form onSubmit={handleSubmit}>
                    <div className='form'>
                        <TextField
                            id="username"
                            value={values.username}
                            onChange={handleChange}
                            fullWidth
                            placeholder='Username'
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FaRegUserCircle />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            variant="standard"
                            helperText={errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
                        />

                        <TextField
                            id="password"
                            value={values.password}
                            onChange={handleChange}
                            fullWidth
                            type='password'
                            placeholder='Password'
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LuLockKeyhole />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            variant="standard"
                            helperText={errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                        />
                        <Button type='submit' variant="contained" color="primary" fullWidth>Login</Button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage