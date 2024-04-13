import {
  Command,
  CommandInput,
  CommandInputIcon,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Label } from "@/components/ui/label";
import { useMapsLibrary } from "@vis.gl/react-google-maps"
import { BadgeInfo } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface AddressInputProps {
  onPlace: (place: google.maps.Place | undefined) => void;
  label: string;
  inputIcon: CommandInputIcon;
}

export default function AddressInput({ onPlace, label, inputIcon }: AddressInputProps) {
  const places = useMapsLibrary('places');
  const [place, setPlace] = useState<google.maps.Place>();
  const [fetchingPredictions, setFetchingPredictions] = useState<boolean>(false);

  const setPlaceState = useCallback(
    (place: google.maps.Place | undefined) => {
      setPlace(place);
      onPlace(place);
    }, [onPlace]
  );

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteSessionToken
  const [sessionToken, setSessionToken] =
    useState<google.maps.places.AutocompleteSessionToken>();

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service
  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);

  const [predictionResults, setPredictionResults] =
    useState<Array<google.maps.places.AutocompletePrediction>>([]);

  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (!places) return;
    setAutocompleteService(new places.AutocompleteService());
    setSessionToken(new places.AutocompleteSessionToken());

    return () => setAutocompleteService(null);
  }, [places]);

  const fetchPredictions = useCallback(
    async (inputValue: string) => {
      if (!autocompleteService || !inputValue) {
        setPredictionResults([]);
        setFetchingPredictions(false);
        return;
      }
      setFetchingPredictions(true);

      const request = { input: inputValue, sessionToken };
      const response = await autocompleteService.getPlacePredictions(request);

      setPredictionResults(response.predictions);
      setFetchingPredictions(false);
    },
    [autocompleteService, sessionToken]
  );

  const onValueChange = useCallback(
    (search: string) => {
      setInputValue(search);
      fetchPredictions(search);
      setPlaceState(undefined);
    },
    [fetchPredictions, setPlaceState]
  );

  const onSelect = useCallback(
    (description: string, placeId: string) => {
      if (!places) return;

      setPredictionResults([]);
      setInputValue(description);
      setSessionToken(new places.AutocompleteSessionToken());
      setPlaceState({ placeId } as google.maps.Place);
    }, [places, setPlaceState]
  );

  return (
    <div className="flex flex-col space-y-2">
      <Label>{label}</Label>
      <Command
        className="rounded-lg border shadow-md"
        shouldFilter={false}
        defaultValue={predictionResults.length > 0 ? predictionResults[0].place_id : ""}
      >
        <CommandInput
          value={inputValue}
          onValueChange={(search: string) => onValueChange(search)}
          placeholder="Start typing an address to search..."
          loading={fetchingPredictions}
          icon={inputIcon}
        />

        <CommandList>
          {predictionResults.length > 0 && predictionResults.map((prediction) => {
            return (
              <CommandItem
                className="pointer"
                key={prediction.place_id}
                value={prediction.place_id}
                onSelect={() => onSelect(prediction.description, prediction.place_id)}
              >
                {prediction.description}
              </CommandItem>
            );
          })
          }

          {!fetchingPredictions && !place && predictionResults.length === 0 && inputValue.length > 0 && (
            <CommandItem className="!bg-transparent">
              <BadgeInfo className="h-4 w-4 mr-2" />
              No results found.
            </CommandItem>
          )}
        </CommandList>
      </Command>
    </div>
  )
}