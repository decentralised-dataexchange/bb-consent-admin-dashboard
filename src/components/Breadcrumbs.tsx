import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Typography } from '@mui/material';

interface BreadCrumbProps {
    Link: string,
}

export default function BreadCrumb(props: BreadCrumbProps) {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary" >
          Home
        </Typography>
        <Typography color='inherit'>
          {props.Link}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}