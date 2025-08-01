import * as React from 'react';
import {useState} from 'react';
import {AppBar, Box, Button, Drawer, IconButton, Stack, Toolbar, Typography} from '@mui/material';
import {useLocation} from '@tanstack/react-router';
import {KmxArrowLeftFilled, KmxQuestionCircleStroked} from "@kmx/mui-icons";
import INSTRUCTIONS_CONFIG from "../../../config/instructions.ts";
import {InstructionListType, ProfileRoutes} from "../../../types/config.ts";
import FinishedExampleModal from "../FinishedExampleModal/FinishedExampleModal.tsx";
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
                  { instructionsConfig.topics?.map((topic, index) => (
                        <Box key={`${topic.name}-topic-${index}`}>
                            <Typography component='h3' variant='h6' color='secondary' data-testid='instructions-topic-heading'>
                                {topic.name}
                            </Typography>
                            <Typography component='p' variant='body2' color='secondary' data-testid='instructions-topic-body'>
                              {topic.listType === InstructionListType.Bulleted ? (
                                <ul>
                                  {topic.instructions?.map((instruction, index) => (
                                    <li key={`${instructionsConfig.heading}-instruction-${index}`}>{instruction}</li>
                                  ))}
                                </ul>
                              ) : (
                                <ol>
                                  {topic.instructions?.map((instruction, index) => (
                                    <li key={`${instructionsConfig.heading}-instruction-${index}`}>{instruction}</li>
                                  ))}
                                </ol>
                              )}
                            </Typography>
                        </Box>
                    )
                  )}
                    <Typography component='p' variant='body2' color='secondary' data-testid='instructions-body'>

                    </Typography>
                    {instructionsConfig.goalImgSrc && <FinishedExampleModal imgSrc={instructionsConfig.goalImgSrc} /> }
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
