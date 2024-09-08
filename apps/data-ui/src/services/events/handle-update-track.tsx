import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { track } from '@prisma/client';
import axios from 'axios';
import { MutableRefObject } from 'react';

const baseURL = import.meta.env.VITE_DATA_API_URL;

const handleUpdateTrack = async (values: track, apiRef: MutableRefObject<GridApiCommunity>) => {
  try {
    const { track_id, album_id, name, unit_price, genre_id, media_type_id, composer, milliseconds, bytes } = values;

    const trackData = {
      track_id: track_id,
      album_id: album_id,
      name: name,
      unit_price: unit_price,
      genre_id: genre_id,
      media_type_id: media_type_id,
      composer: composer,
      milliseconds: milliseconds,
      bytes: bytes,
    };

    const resp = await axios.patch(
      `${baseURL}/tracks`,
      { trackData: trackData },
      { headers: { 'Content-Type': 'application/json' } },
    );

    console.log(resp.data);

    if (resp.data.updatedTracks) {
      const { track_id, album_id, name, unit_price, genre_id, media_type_id, composer, milliseconds, bytes } =
        resp.data.UpdatedTracks;

      apiRef.current.updateRows([
        {
          track_id: track_id,
          album_id: album_id,
          name: name,
          unit_price: unit_price,
          genre_id: genre_id,
          media_type_id: media_type_id,
          composer: composer,
          milliseconds: milliseconds,
          bytes: bytes,
        },
      ]);
    }
  } catch (error) {
    console.error(error);
  }
};

export default handleUpdateTrack;
