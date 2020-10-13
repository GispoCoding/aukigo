import React from 'react';
import {
  Apartment, DirectionsBus, LocalHospital, PhotoCamera, Restaurant, ShoppingCart,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { createStyles } from '@material-ui/core';

interface PopupIconProperties {
  layerName: string
}

const useStyles = makeStyles(() => (
  createStyles({
    iconTd: {
      width: '64px',
      height: '64px',
    },
    icon: {
      width: '100%',
      height: '100%',
      paddingRight: '20px',
    },
  })
));

const MapPopupIcon = ({ layerName }: PopupIconProperties) => {
  const classes = useStyles();
  if (layerName === 'Accommodation') {
    return (
      <td className={classes.iconTd}>
        <Apartment className={classes.icon} />
      </td>
    );
  } if (layerName === 'Shops') {
    return (
      <td className={classes.iconTd}>
        <ShoppingCart className={classes.icon} />
      </td>
    );
  } if (layerName === 'Restaurant') {
    return (
      <td className={classes.iconTd}>
        <Restaurant className={classes.icon} />
      </td>
    );
  } if (layerName === 'Transportation') {
    return (
      <td className={classes.iconTd}>
        <DirectionsBus className={classes.icon} />
      </td>
    );
  } if (layerName === 'Healthcare') {
    return (
      <td className={classes.iconTd}>
        <LocalHospital className={classes.icon} />
      </td>
    );
  } if (layerName === 'Entertainment') {
    return (
      <td className={classes.iconTd}>
        <PhotoCamera className={classes.icon} />
      </td>
    );
  } return (<td />);
};

export default MapPopupIcon;
