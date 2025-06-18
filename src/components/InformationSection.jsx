import {Box, Typography} from "@mui/material";

const InformationSection = ({
                         title,
                         content,
                         variant = "h5",
                         marginTop,
                         icon
                     }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mt: marginTop }}>
            {icon && (
                <Box sx={{
                    color: '#040404',
                    mt: variant === 'h5' ? 0.5 : 0.3
                }}>
                    {icon}
                </Box>
            )}
            <Box>
                <Typography variant={variant} gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {content ? content.trim() : "Нет информации"}
                </Typography>
            </Box>
        </Box>
    );
};

export default InformationSection;