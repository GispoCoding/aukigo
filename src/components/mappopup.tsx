import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { createStyles, Theme } from '@material-ui/core';

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
      borderRadius: '50px',
      color: theme.palette.primary.dark,
      maxWidth: '80vw',
      maxHeight: '80vh',
      padding: '10px 20px',
    },
    title: {
      fontSize: '1.2em',
      fontWeight: 'bold',
    },
    subHeaderRow: {
      fontWeight: 'bold',
    },
    valueRow: {
    },
    website: {
      maxWidth: '50px',
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
    // let resultHTML = `<h1>
    //     ${title}
    // </h1>
    // <a href=${website}>${website}</a>
    // <table>`;
    // Object.keys(properties).forEach((key) => {
    //   resultHTML += `<tr>
    //     <td>${key}<td><td>${properties[key]}</td>
    //   <tr />`;
    // });
    // resultHTML += '</table>';
    // popupRef.current!.innerHTML = resultHTML;
  }, [properties]);
  return (
    <div className={classes.root} ref={popupRef}>
      <table>
        <tr>
          <td>icon</td>
          <td>
            <table>
              <tr><td className={classes.title}>{title}</td></tr>
              <tr><td>{openingHours}</td></tr>
              <tr><td>{c19openingHours}</td></tr>
            </table>
          </td>
        </tr>
        <tr className={classes.subHeaderRow}>
          <td>Osoite</td>
          <td>Email</td>
        </tr>
        <tr className={classes.valueRow}>
          <td>{address}</td>
          <td>{email}</td>
        </tr>
        <tr className={classes.subHeaderRow}>
          <td>Puhelin</td>
          <td>Lue lisää</td>
        </tr>
        <tr className={classes.valueRow}>
          <td>{phoneNr}</td>
          <td className={classes.website}><a href={website}>{website}</a></td>
        </tr>
      </table>
    </div>
  );
};

export default MapPopup;
