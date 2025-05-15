import { Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";

const InformPanel = (props) => {
const { data, user } = props;

    return (
        <TableContainer sx={{ maxWidth: 650 }}>
            <Table aria-label="personal information table">
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                width: '40%',
                                backgroundColor: '#f5f5f5',}}
                            >
                                <Typography variant="body1">{item.label}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1">{user[item.value]}</Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default InformPanel