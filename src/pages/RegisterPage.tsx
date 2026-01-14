import "../css/RegisterPage.css"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { FaRegUserCircle } from "react-icons/fa";
import { LuLockKeyhole } from "react-icons/lu";
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { RegisterPageSchema } from '../schemas/RegisterPageSchema';
import RegisterPageService from '../services/RegisterPageService';
import type { UserType } from '../types/Types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function RegisterPage() {

    const navigate = useNavigate();

    const submit = async (values: any, actions: any) => {
        try {
            const payload: UserType = {
                id: String(Math.floor(Math.random() * 999999)),
                username: values.username,
                password: values.password,
                balance: 1000
            }

            const response = await RegisterPageService.register(payload)
            if (response) {
                toast.success("Registration successful.")
                navigate("/login");
            }
        } catch (error) {
            toast.error("An error occurred during the registration process." + error);
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
        <div className='register'>
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
                        <Button type='submit' variant="contained" color="primary" fullWidth>Register</Button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage