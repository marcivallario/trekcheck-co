import Login from './components/Login';
import Signup from './components/Signup';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import './loginsignup.css'

function TabPanel(props) {
    const { children, value, index } = props;

    return (<div className="tab-panel">
            {value === index && (<div className="tab-content">{children}</div>)}
        </div>
    )
}

function LoginSignup({ setUser }) {
    const [ value, setValue ] = useState(0);
    function handleChange(e, val) {
        setValue(val);
    }

    return (
        <div className="col-12 col-lg-4" id="login-signup">
            <Tabs value={value} 
            onChange={handleChange}
            sx={{
                '& .MuiTabs-indicator': {
                    backgroundColor: '#FF7E3D',
                },
                '& .MuiButtonBase-root': {
                    color: '#FF7E3D',
                    fontFamily: 'Manrope',
                    fontWeight: '600'
                },
                '& .MuiTab-root': {
                    color: '#FF7E3D',
                    fontWeight: '600'
                },
                '& .Mui-selected': {
                    color: '#FF7E3D !important',
                }
            }}
            >
                <Tab label="Login" />
                <Tab label="Signup" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Login setUser={setUser} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Signup setUser={setUser} />
            </TabPanel>
        </div>
    ) 
};

export default LoginSignup;
