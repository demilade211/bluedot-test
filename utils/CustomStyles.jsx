import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

export const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        sx={{
            padding: "20px"
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1), 
        fontSize: "4px",
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        '& .MuiMenu-list': {
            padding: '10px 0',
            '& li': {
                marginBottom: "10px",
                fontFamily: "'Poppins', sans-serif",
            }
        },
        '& .MuiMenuItem-root': { 
            '&:hover': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export const BlueTabs = styled((props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',

    },
    '& .MuiTabs-indicatorSpan': {
        width: '100%',
        backgroundColor: '#295BFF',
    },
});

export const BlueTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: 'none',
        fontWeight: "500",
        fontSize: "18px",
        fontFamily: ' Poppins',
        color: '#6B6C74',
        '&.Mui-selected': {
            color: '#295BFF',
        },
        '&.Mui-focusVisible': {
            backgroundColor: 'rgba(100, 95, 228, 0.32)',
        },
    }),
);


export const StyledTabs = styled((props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        width: '100%',
        backgroundColor: '#101113',
    },
});

export const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: 'none',
        fontWeight: "500",
        fontSize: "20px",
        fontFamily: ' Poppins',
        color: '#6B6C74',
        '&.Mui-selected': {
            color: '#101113',
        },
        '&.Mui-focusVisible': {
            backgroundColor: 'rgba(100, 95, 228, 0.32)',
        },
    }),
);

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#D88B07' : '#308fe8',
    },
}));

export const selectStyle = {
    control: (base) => ({
        ...base,
        height: "44px",
        borderRadius: "12px",
        border: "1px solid var(--grey-200, #B6B7BB)",
        background: "none",
        boxShadow: "none",
        '&:hover': {
            border: "1px solid #D0D3D8",
        },
        outline: "none",
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "14px",
        color: "#FFF",
    }),
    indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
    placeholder: (base) => ({
        ...base,
        color: "var(--grey-400, #6B6C74)",
        whiteSpace: "nowrap"
    }),
    input: (base) => ({
        ...base,
        color: "black",
    }),
    singleValue: (base) => ({
        ...base,
        color: "black",
    }),
};

export const selectStyle2 = {
    control: (base) => ({
        ...base,
        height: "47px",
        borderRadius: "12px",
        border: "1px solid var(--grey-200, #B6B7BB)",
        background: "none",
        boxShadow: "none",
        '&:hover': {
            border: "1px solid #D0D3D8",
        },
        outline: "none",
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "14px",
        color: "#FFF",
    }),
    indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
    placeholder: (base) => ({
        ...base,
        color: "var(--grey-400, #6B6C74)",
        whiteSpace: "nowrap"
    }),
    input: (base) => ({
        ...base,
        color: "black",
    }),
    singleValue: (base) => ({
        ...base,
        color: "black",
    }),
};