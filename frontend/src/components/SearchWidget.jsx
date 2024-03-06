import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAddress } from "../redux/sliceMapData";

const initializeAutocomplete = (setLatLon, dispatch) => {
  const ac = new visicomAutoComplete({
    selector: "#visicom-autocomplete",
    apiKey: "c73cbb2c85ee55c8c751b7d3b3b3b0cc",
    placeholder: "Enter your address...",
    minChars: 3,
    delay: 150,
    width: "400px",
    height: "35px",
    suggestsLimit: 5,
    includeCategories: [],
    excludeCategories: [],
    maxCharsInSuggest: 55,
    lang: "local",

    onSuggestSelected: (suggest) => {
      const [lng, lat] = suggest.feature.geo_centroid.coordinates;
      dispatch(setAddress(suggest.feature.properties));
      setLatLon({ lat, lng });
    },

    customFeatures: [],
  });
};

const SearchWidget = ({ setLatLon }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://api.visicom.ua/apps/visicom-autocomplete.min.js";
    script.async = true;
    script.onload = () => {
      initializeAutocomplete(setLatLon, dispatch);
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <div id="visicom-autocomplete">
        <a href="https://api.visicom.ua/" target="_blank"></a>
      </div>
    </div>
  );
};

export default SearchWidget;
const SearchWidget2 = ()=>{
  setAddress
}
 
