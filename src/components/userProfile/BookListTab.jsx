import { Box, Typography } from "@mui/material";
import logo from "../../assets/assets.png";

{/*пока весь компонент не рабочий и просто есть*/}
const BookListTab = () => {
    const data = [];

    return (
        <>
            {data.map(([name, author], index) => (
                <Box
                    key={index}
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-start"
                    sx={{ width: '90%'}}>
                    <Box
                        component="img"
                        src={logo}
                        alt="Аватар"
                        sx={{ width: '20%', margin: '0 auto', display: 'block', height: 'auto',}}
                    />
                    <Box display="flex" flexDirection="column" sx={{ width: '80%'}}>
                        <Typography>{name}</Typography>
                        <Typography>{author}</Typography>
                    </Box>
                </Box>
            ))}
        </>
    )
}

export default BookListTab;