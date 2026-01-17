import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import logo from '../images/logo.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { filetProducts, setCurrentUser, setProducts } from '../redux/AppSlice';
import { toast } from 'react-toastify';
import type { ProductType } from '../types/Types';
import ProductService from '../services/ProductService';
import { CiShoppingBasket } from "react-icons/ci";
import Badge from '@mui/material/Badge';



function Navbar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        localStorage.removeItem("currentUser");
        dispatch(setCurrentUser(null));
        navigate("/login");
        toast.success("The logout was completed.")
    }

    const handleFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (e.target.value) {
                dispatch(filetProducts(e.target.value));
            } else {
                const products: ProductType[] = await ProductService.getAllProducts();
                dispatch(setProducts(products));
            }
        } catch (error) {
            toast.error("An error occurred while filtering." + error);

        }
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: '#123524' }}>
            <Toolbar>
                <IconButton
                    onClick={() => navigate("/")}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <img src={logo} width={80} height={80} ></img>
                </IconButton>
                <Typography onClick={() => navigate("/")} variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
                    Finch's Selection
                </Typography>

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TextField
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilter(e)}
                        sx={{ marginRight: '20px' }}
                        id="searchInput"
                        placeholder='look for something'
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                    </InputAdornment>
                                ),
                                style: {
                                    color: '#fff',
                                    borderBottom: '1px solid lightgrey'
                                }
                            },
                        }}
                        variant="standard"
                    />

                    <Badge badgeContent={4} color="success" sx={{ margin: '0px 15px' }}>
                        <CiShoppingBasket style={{ fontSize: '25px', cursor: 'pointer' }} />
                    </Badge>

                    <Button onClick={logout} color="inherit">Logout</Button>
                </div>

            </Toolbar>
        </AppBar>)
}

export default Navbar