import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, createStyles, Theme } from '@material-ui/core';
import { Apartment } from '@material-ui/icons';

interface FeatureProperties {
  [key: string]: any,
}

interface PopupProperties {
  properties: FeatureProperties,
}

const useStyles = makeStyles((theme: Theme) => (
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.light,
      borderRadius: '30px 30px 30px 2px',
      color: theme.palette.primary.dark,
      padding: '10px 10px 10px 20px',
      margin: '5px',
      '&&& td': {
        paddingRight: '10px',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.8em',
        padding: '2px 4px',
        minWidth: '200px',
        position: 'absolute',
        left: '-100px',
        bottom: '-50px',
        '&&& td': {
          paddingRight: '2px',
        },
      },
    },
    iconTd: {
      width: '64px',
      height: '64px',
    },
    icon: {
      width: '100%',
      height: '100%',
      paddingRight: '20px',
    },
    title: {
      fontSize: '1.2em',
      fontWeight: 'bold',
      maxWidth: '150px',
    },
    openingHours: {
      maxWidth: '64px',
    },
    subHeaderRow: {
      fontWeight: 'bold',
      paddingTop: '10px',
    },
    valueRow: {
    },
    website: {
      display: 'block',
      maxWidth: '150px',
      overflowX: 'scroll',
      whiteSpace: 'nowrap',
    },
    infoContainer: {
      height: '200px',
      width: '100%',
      overflow: 'scroll',
    },
  })
));

const MapPopup = ({ properties }: PopupProperties) => {
  const classes = useStyles();
  const popupRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [phoneNr, setPhoneNr] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [openingHours, setOpeningHours] = useState<string>('');
  const [c19openingHours, setC19OpeningHours] = useState<string>('');
  const [info, setInfo] = useState<string>('');
  const [showInfo, setShowInfo] = useState<boolean>(false);
  // Set popup content
  useEffect(() => {
    if (properties.unInitialized === true || popupRef.current === null) { return; }
    const propTitle = properties.name_fi ? properties.name_fi : properties.name;
    setTitle(propTitle);
    const propWebsite = properties.website ? properties.website : '';
    setWebsite(propWebsite);
    const propPhoneNr = properties.phone ? properties.phone : '';
    setPhoneNr(propPhoneNr);
    const propEmail = properties.email ? properties.email : '';
    setEmail(propEmail);
    if (properties['addr:street']) {
      const streetNr = properties['addr:housenumber'] ? properties['addr:housenumber'] : '';
      let propAddr = `${properties['addr:street']} ${streetNr}`;
      if (properties['addr:postcode'] && properties['addr:city']) {
        const postCode = properties['addr:postcode'];
        const city = properties['addr:city'];
        propAddr += `,\n${postCode} ${city}`;
      }
      setAddress(propAddr);
    } else { setAddress(''); }
    if (properties.opening_hours) {
      setOpeningHours(properties.opening_hours);
      if (properties['opening_hours:covid19']) {
        setC19OpeningHours(properties['opening_hours:covid19']);
      }
    } else {
      setOpeningHours('-');
      setC19OpeningHours('-');
    }
    let infoHtml = '<table><tbody>';
    Object.keys(properties).forEach((key) => {
      infoHtml += `<tr>
        <td>${key}<td>
        <td>${properties[key]}</td>
      </tr>`;
    });
    infoHtml += '</tbody></table>';
    setInfo(infoHtml);
  }, [properties]);
  return (
    <div className={classes.root} ref={popupRef}>
      <table>
        <tbody>
          <tr>
            <td className={classes.iconTd}>
              <Apartment className={classes.icon} />
            </td>
            <td>
              <table>
                <tbody>
                  <tr><td className={classes.title}>{title}</td></tr>
                  <tr><td className={classes.subHeaderRow}>Aukioloajat</td></tr>
                  <tr><td className={classes.openingHours}>{openingHours}</td></tr>
                  <tr><td className={classes.openingHours}>{c19openingHours}</td></tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr className={classes.subHeaderRow}>
            {address && <td>Osoite</td>}
            {email && <td>Sähköposti</td>}
          </tr>
          <tr className={classes.valueRow}>
            {address && <td>{address}</td>}
            {email && <td>{email}</td>}
          </tr>
          <tr className={classes.subHeaderRow}>
            {phoneNr && <td>Puhelin</td>}
            {website && <td>Lue lisää</td>}
          </tr>
          <tr className={classes.valueRow}>
            {phoneNr && <td>{phoneNr}</td>}
            {website && <td className={classes.website}><a href={website}>{website}</a></td>}
          </tr>
        </tbody>
      </table>
      {showInfo && (
        <>
          <Button
            onClick={() => { setShowInfo(!showInfo); }}
          >
            Piilota lisätiedot
          </Button>
          <div className={classes.infoContainer}>
            <div dangerouslySetInnerHTML={{ __html: info }} />
          </div>
        </>
      )}
      {!showInfo && (
        <Button
          onClick={() => { setShowInfo(!showInfo); }}
        >
          Näytä lisätiedot
        </Button>
      )}
    </div>
  );
};

export default MapPopup;
