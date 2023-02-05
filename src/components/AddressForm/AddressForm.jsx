import { useState, useEffect, useCallback } from "react";
import {
  AddressAutofill,
  AddressMinimap,
  useConfirmAddress,
  config,
} from "@mapbox/search-js-react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
//Most of the functions are from the mapbox docs: https://docs.mapbox.com/mapbox-search-js/example/autofill-checkout-react/

function AddressForm({ liftAddress }) {
  const [showFormExpanded, setShowFormExpanded] = useState(false);
  const [showMinimap, setShowMinimap] = useState(false);
  const [feature, setFeature] = useState();
  const [showValidationText, setShowValidationText] = useState(false);
  const [token, setToken] = useState("");
  const [address, setAddress] = useState({
    address: "",
    coordinates: [],
  });
  const [error, setError] = useState();
  useEffect(() => {
    const accessToken =
      "pk.eyJ1IjoicmFuZGFsbGthIiwiYSI6ImNsYzEyYTA0ZTN6cnYzdnBsY2kxbnQxeHcifQ.UXuG6o9McGmzc24bhWF44A";
    setToken(accessToken);
    config.accessToken = accessToken;
  }, []);

  const { formRef, showConfirm } = useConfirmAddress({
    minimap: true,
    skipConfirmModal: (feature) => {
      ["exact", "high"].includes(feature.properties.match_code.confidence);
    },
  });

  const handleRetrieve = useCallback(
    (res) => {
      const feature = res.features[0];
      setFeature(feature);
      setShowMinimap(true);
      setShowFormExpanded(true);
    },
    [setFeature, setShowMinimap]
  );
  function handleSaveMarkerLocation(coordinate) {
    console.log(`Marker moved to ${JSON.stringify(coordinate)}.`);
  }

  function resetAddressForm() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
    setShowFormExpanded(false);
    setShowValidationText(false);
    setFeature(null);
  }

  function confirmAddress(e) {
    e.preventDefault();
    console.log("confirming");
    if (feature) {
      console.log(
        `${feature.properties.address_line1}, ${feature.properties.place} ${feature.properties.region_code} ${feature.properties.postcode}`
      );
      console.log(feature.geometry.coordinates);
      setAddress({
        address: `${feature.properties.address_line1}, ${feature.properties.place} ${feature.properties.region_code} ${feature.properties.postcode}`,
        coordinates: feature.geometry.coordinates,
      });
      console.log("lifting");
      liftAddress(address);
    } else {
      setError("Please find a valid address");
    }
  }
  return (
    <Segment.Group>
      <Segment stacked>
        <Form size="large" ref={formRef}>
          <div>
            <AddressAutofill accessToken={token} onRetrieve={handleRetrieve}>
              <Form.Input
                label="Address"
                placeholder="Start typing your address, e.g. 123 Main..."
                autoComplete="address-line1"
                id="mapbox-autofill"
              />
            </AddressAutofill>
            <br />
            {!showFormExpanded && (
              <div>
                <Button
                  className="btn"
                  size="small"
                  id="manual-entry"
                  onClick={() => setShowFormExpanded(true)}
                >
                  Enter an address manually
                </Button>
              </div>
            )}
            <div
              className="secondary-inputs"
              style={{ display: showFormExpanded ? "block" : "none" }}
            >
              <Form.Input
                label="Address Line 2"
                placeholder="Apartment, suite, unit, building, floor, etc."
                autoComplete="address-line2"
              />
              <Form.Input
                label="City"
                placeholder="City"
                autoComplete="address-level2"
              />
              <Form.Input
                label="State / Region"
                placeholder="State / Region"
                autoComplete="address-level1"
              />
              <Form.Input
                label="Zip / Postal Code"
                placeholder="ZIP / Postcode"
                autoComplete="postal-code"
              />
            </div>
          </div>
          {showFormExpanded && (
            <div>
              <br />
              <Button
                size="small"
                type="submit"
                className="btn"
                onClick={confirmAddress}
              >
                Confirm
              </Button>
              <Button
                className="btn"
                size="small"
                id="btn-reset"
                onClick={resetAddressForm}
              >
                Reset
              </Button>
            </div>
          )}
        </Form>
      </Segment>
      <Segment textAlign="center">
        {showValidationText && <div id="validation-msg">Address Confirmed</div>}
        <br />
        <div id="minimap-container" style={{ height: "240px", width: "360px", paddingLeft: '18px'}}>
          <AddressMinimap
            canAdjustMarker={true}
            satelliteToggle={true}
            feature={feature}
            show={showMinimap}
            onSaveMarkerLocation={handleSaveMarkerLocation}
            style={{justifySelf: 'center'}}
          />
          
        </div>
        <br />
          <br />
          <br />
        <Grid.Column style={{ maxWidth: 450 }}>
          {error ? <ErrorMessage error={error} /> : null}
        </Grid.Column>
      </Segment>
    </Segment.Group>
  );
}

export default AddressForm;
