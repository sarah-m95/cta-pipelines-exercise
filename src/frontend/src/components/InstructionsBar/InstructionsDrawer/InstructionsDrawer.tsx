import * as React from 'react';
import {useState} from 'react';
import {AppBar, Box, Button, Drawer, IconButton, Stack, Toolbar, Typography} from '@mui/material';
import {useLocation} from '@tanstack/react-router';
import {KmxArrowLeftFilled, KmxQuestionCircleStroked} from "@kmx/mui-icons";
import INSTRUCTIONS_CONFIG from "../../../config/instructions.ts";
import {InstructionListType, ProfileRoutes} from "../../../types/config.ts";

export default function InstructionsDrawer() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const pathname = useLocation({
        select: (location) => location.pathname,
    });

    const instructionsConfig = INSTRUCTIONS_CONFIG[pathname as ProfileRoutes]
    if (!instructionsConfig)  {  
        return null; // No instructions available for this route
    }
    return (
        <Box data-testid='instructions-drawer'>
            <IconButton
                id='instructions-drawer-button'
                data-testid='instructions-drawer-button'
                onClick={() => setIsDrawerOpen(true)}
                edge='start' color='inherit'
                aria-label='open instructions drawer.'>
                <KmxQuestionCircleStroked />
            </IconButton>
            <Drawer
                anchor='right'
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                slotProps={{
                    backdrop: {
                        onClick: () => setIsDrawerOpen(false),
                    },
                    paper: {
                        sx: {
                            margin: 'xlarge large',
                            width: '33%',
                        },
                    },
                }}
            >
                <AppBar position='static' color='default'>
                    <Toolbar>
                        <IconButton edge='start' color='inherit' onClick={() => setIsDrawerOpen(false)} data-testid='instructions-drawer-close-button-top' aria-label='close.'>
                            <KmxArrowLeftFilled />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Stack spacing={3} sx={{ p: 3 }}>
                    <Typography component='h2' variant='h5' color='secondary' data-testid='instructions-heading'>
                        {instructionsConfig.heading}
                    </Typography>
                    <Typography component='p' variant='body2' color='secondary' data-testid='instructions-body'>
                        {instructionsConfig.listType === InstructionListType.Bulleted ? (
                            <ul>
                                {instructionsConfig.instructions?.map((instruction, index) => (
                                    <li key={`${instructionsConfig.heading}-instruction-${index}`}>{instruction}</li>
                                ))}
                            </ul>
                        ) : (
                            <ol>
                                {instructionsConfig.instructions?.map((instruction, index) => (
                                    <li key={`${instructionsConfig.heading}-instruction-${index}`}>{instruction}</li>
                                ))}
                            </ol>
                        )}
                    </Typography>
                    <Button
                        color='cta'
                        data-testid='payment-breakdown-close-button'
                        onClick={() => setIsDrawerOpen(false)}
                        type='button'
                    >
                        Close
                    </Button>
                </Stack>
            </Drawer>
        </Box>
    );
}
